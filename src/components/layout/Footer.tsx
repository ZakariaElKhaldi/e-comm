import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
          <p className="text-gray-400 mb-6">
            Subscribe to get special offers, free giveaways, and updates on new products.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-gray-400 mb-4">
              Your trusted source for premium motorcycle gear and accessories.
              Quality and safety are our top priorities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                Twitter
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-primary">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-primary">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-primary">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-primary">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Bike Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@yourbrand.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Your Brand. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 