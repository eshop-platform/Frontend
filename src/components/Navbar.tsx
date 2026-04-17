import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-shop flex items-center justify-between h-14">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          ÉLAN
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-muted-foreground transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-muted-foreground transition-colors">Shop</Link>
          <Link to="/product/main" className="hover:text-muted-foreground transition-colors">Featured</Link>
        </div>

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="flex items-center gap-2 animate-fade-in">
              <input
                autoFocus
                type="text"
                placeholder="Search…"
                className="bg-secondary rounded-full px-4 py-1.5 text-sm outline-none w-40 focus:w-56 transition-all"
              />
              <button onClick={() => setSearchOpen(false)}>
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-1.5 hover:bg-secondary rounded-full transition-colors">
              <Search size={18} />
            </button>
          )}
          <Link to="/cart" className="p-1.5 hover:bg-secondary rounded-full transition-colors relative" aria-label="Cart">
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] font-medium min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-shop py-4 flex flex-col gap-4 text-sm font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/product/main" onClick={() => setMenuOpen(false)}>Featured</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
