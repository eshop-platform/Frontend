import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border mt-20">
    <div className="container-shop py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <h3 className="font-semibold mb-3">ÉLAN</h3>
        <p className="text-muted-foreground leading-relaxed">Modern essentials crafted with intention. Timeless design meets everyday utility.</p>
      </div>
      <div>
        <h4 className="font-medium mb-3">Shop</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
          <li><Link to="/shop" className="hover:text-foreground transition-colors">Men</Link></li>
          <li><Link to="/shop" className="hover:text-foreground transition-colors">Women</Link></li>
          <li><Link to="/shop" className="hover:text-foreground transition-colors">Accessories</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-medium mb-3">Company</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><span className="hover:text-foreground transition-colors cursor-pointer">About</span></li>
          <li><span className="hover:text-foreground transition-colors cursor-pointer">Sustainability</span></li>
          <li><span className="hover:text-foreground transition-colors cursor-pointer">Careers</span></li>
        </ul>
      </div>
      <div>
        <h4 className="font-medium mb-3">Support</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li><span className="hover:text-foreground transition-colors cursor-pointer">Contact</span></li>
          <li><span className="hover:text-foreground transition-colors cursor-pointer">Shipping & Returns</span></li>
          <li><span className="hover:text-foreground transition-colors cursor-pointer">FAQ</span></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container-shop py-6 text-center text-xs text-muted-foreground">
        © 2026 ÉLAN. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
