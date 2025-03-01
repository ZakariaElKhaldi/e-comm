import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon, TruckIcon, PhoneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Discover Your Perfect',
    subtitle: 'Riding Gear',
    description: 'Premium motorcycle equipment and accessories for every rider. Quality meets style in our exclusive collection.',
    image: 'https://placehold.co/1920x1080/252f3f/ffffff?text=Premium+Motorcycle+Gear',
    cta: {
      primary: { text: 'Shop Now', link: '/shop' },
      secondary: { text: 'Browse Categories', link: '/categories' }
    }
  },
  {
    id: 2,
    title: 'New Season',
    subtitle: 'New Arrivals',
    description: 'Explore our latest collection of motorcycle gear. Stay safe and stylish on every ride.',
    image: 'https://placehold.co/1920x1080/252f3f/ffffff?text=New+Season+Collection',
    cta: {
      primary: { text: 'View Collection', link: '/new-arrivals' },
      secondary: { text: 'Learn More', link: '/about' }
    }
  },
  {
    id: 3,
    title: 'Special Offer',
    subtitle: 'Up to 40% Off',
    description: 'Limited time offer on selected premium motorcycle gear and accessories.',
    image: 'https://placehold.co/1920x1080/252f3f/ffffff?text=Special+Offers',
    cta: {
      primary: { text: 'Shop Deals', link: '/deals' },
      secondary: { text: 'View Details', link: '/promotions' }
    }
  }
];

const features: Feature[] = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'On orders over $100',
    icon: TruckIcon
  },
  {
    id: 2,
    title: 'Secure Payment',
    description: '100% secure payment',
    icon: ShieldCheckIcon
  },
  {
    id: 3,
    title: '24/7 Support',
    description: 'Dedicated support',
    icon: PhoneIcon
  },
  {
    id: 4,
    title: 'Easy Returns',
    description: '30 day return policy',
    icon: ArrowPathIcon
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Memoize navigation functions to prevent unnecessary re-renders
  const goToSlide = useCallback((index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [autoplayEnabled, nextSlide]);

  // Pause autoplay on hover or focus
  const pauseAutoplay = () => setAutoplayEnabled(false);
  const resumeAutoplay = () => setAutoplayEnabled(true);

  return (
    <section 
      className="relative h-screen max-h-[600px] mt-[72px] overflow-hidden bg-gray-900"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocus={pauseAutoplay}
      onBlur={resumeAutoplay}
      aria-roledescription="carousel"
      aria-label="Featured Products"
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0 z-10' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full z-0' 
                  : 'opacity-0 translate-x-full z-0'
            }`}
            aria-hidden={index !== currentSlide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title} ${slide.subtitle}`}
          >
            {/* Background Image with Preloading */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-6">
              <div className="flex flex-col justify-center h-full max-w-2xl">
                <div className="transform transition-transform duration-700 delay-100 translate-y-0">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {slide.title}
                    <span className="block text-primary mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {slide.subtitle}
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={slide.cta.primary.link}
                      className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {slide.cta.primary.text}
                    </Link>
                    <Link
                      to={slide.cta.secondary.link}
                      className="px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
                    >
                      {slide.cta.secondary.text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute z-20 inset-0 flex items-center justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="ml-4 p-3 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="mr-4 p-3 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div 
        className="absolute bottom-28 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2"
        role="tablist"
        aria-label="Slides"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-900 ${
              index === currentSlide
                ? 'w-10 bg-gradient-to-r from-blue-400 to-purple-500'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
            aria-controls={`slide-${index}`}
          />
        ))}
      </div>

      {/* Features */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {features.map((feature) => (
              <div key={feature.id} className="group cursor-pointer p-2 transition-all duration-300 hover:bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center">
                  <feature.icon className="w-6 h-6 text-primary mb-2" />
                  <span className="block text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {feature.title}
                  </span>
                  <span className="text-sm text-gray-600">
                    {feature.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;