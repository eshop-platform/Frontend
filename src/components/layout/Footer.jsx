import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Share2, Globe, AtSign } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-800 pb-16">
          {/* Brand */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="text-2xl font-black tracking-tight text-white">PRIME</span>
              <span className="text-2xl font-light tracking-tight text-gray-500">COMMERCE</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md text-gray-500">
              Curating the finest modern essentials for intentional living. Quality materials, ethical production, timeless design.
            </p>
            <div className="flex gap-3">
              {[
                { icon: AtSign, href: '#', label: 'Instagram' },
                { icon: Globe, href: '#', label: 'Facebook' },
                { icon: Share2, href: '#', label: 'Twitter' }
              ].map(({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-950 transition-all"
                >
                  <SocialIcon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Shop</h4>
            <ul className="space-y-3 text-sm">
              {[
                ['All Products', '/products'],
                ['New Arrivals', '/products?cat=new'],
                ['Sale', '/products?cat=sale'],
                ['Best Sellers', '/products?cat=best-sellers']
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Support</h4>
            <ul className="space-y-3 text-sm">
              {[
                ['FAQ', '/faq'],
                ['Returns', '/returns'],
                ['Privacy Policy', '/privacy-policy'],
                ['About Us', '/about']
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bole Road, Friendship Building<br />Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+251911234567" className="hover:text-white transition-colors">+251 911 234 567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:support@primecommerce.com" className="hover:text-white transition-colors">support@primecommerce.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} PrimeCommerce. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/returns" className="hover:text-white transition-colors">Terms</Link>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
