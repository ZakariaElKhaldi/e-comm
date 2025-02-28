import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const slides = [
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

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] mt-[72px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4">
            <div className="flex flex-col justify-center h-full max-w-2xl">
              <h2 className="text-5xl font-bold text-white mb-2">
                {slide.title}
                <span className="block text-primary mt-2">{slide.subtitle}</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {slide.description}
              </p>
              <div className="flex gap-4">
                <Link
                  to={slide.cta.primary.link}
                  className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300"
                >
                  {slide.cta.primary.text}
                </Link>
                <Link
                  to={slide.cta.secondary.link}
                  className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300"
                >
                  {slide.cta.secondary.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-primary'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Features */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="group cursor-pointer">
              <span className="block text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                Free Shipping
              </span>
              <span className="text-sm text-gray-600">On orders over $100</span>
            </div>
            <div className="group cursor-pointer">
              <span className="block text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                Secure Payment
              </span>
              <span className="text-sm text-gray-600">100% secure payment</span>
            </div>
            <div className="group cursor-pointer">
              <span className="block text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                24/7 Support
              </span>
              <span className="text-sm text-gray-600">Dedicated support</span>
            </div>
            <div className="group cursor-pointer">
              <span className="block text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                Easy Returns
              </span>
              <span className="text-sm text-gray-600">30 day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 