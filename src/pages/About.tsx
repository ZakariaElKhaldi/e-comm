import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: 'https://placehold.co/400x400/252f3f/ffffff?text=JS',
    description: 'Motorcycle enthusiast with 15+ years of industry experience.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Product',
    image: 'https://placehold.co/400x400/252f3f/ffffff?text=SJ',
    description: 'Expert in motorcycle gear and safety equipment.'
  },
  {
    name: 'Mike Chen',
    role: 'Customer Experience',
    image: 'https://placehold.co/400x400/252f3f/ffffff?text=MC',
    description: 'Dedicated to providing exceptional customer service.'
  },
  {
    name: 'Lisa Brown',
    role: 'Operations Manager',
    image: 'https://placehold.co/400x400/252f3f/ffffff?text=LB',
    description: 'Ensures smooth operations and timely deliveries.'
  }
];

const values = [
  {
    title: 'Quality',
    icon: '⭐',
    description: 'We source only the highest quality motorcycle gear and accessories.'
  },
  {
    title: 'Safety',
    icon: '🛡️',
    description: 'Your safety is our top priority. All our products meet strict safety standards.'
  },
  {
    title: 'Service',
    icon: '🤝',
    description: 'We provide exceptional customer service and expert guidance.'
  },
  {
    title: 'Community',
    icon: '🏍️',
    description: 'We\'re proud to serve and support the motorcycle community.'
  }
];

const About = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about providing riders with the best motorcycle gear
            and accessories. Our commitment to quality, safety, and customer service
            sets us apart.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, we started with a simple mission: to make high-quality
              motorcycle gear accessible to all riders. Our founder, a passionate
              motorcyclist, recognized the need for a reliable source of premium
              riding equipment.
            </p>
            <p className="text-gray-600 mb-6">
              Today, we're proud to serve thousands of riders worldwide, offering
              a carefully curated selection of the best motorcycle gear and
              accessories from renowned brands.
            </p>
            <Link
              to="/categories"
              className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition"
            >
              Explore Our Products
            </Link>
          </div>
          <div className="relative aspect-video">
            <img
              src="https://placehold.co/800x450/252f3f/ffffff?text=Our+Story"
              alt="Our story"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 