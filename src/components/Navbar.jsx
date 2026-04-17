import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '@/components/ui/button';
import { ShoppingBag, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const { isLoggedIn, logout, cart, user } = useStore();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/60 backdrop-blur-lg px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-tighter uppercase italic text-white">
        Nova<span className="font-light">Fashion</span>
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition">Home</Link>
        <Link to="/products" className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition">Shop All</Link>
        
       <div 
  onClick={() => navigate('/cart')}
  className="relative cursor-pointer group"
>
  <ShoppingBag className="text-white w-5 h-5 group-hover:scale-110 transition" />

  {cart.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black px-1.5 rounded-full ring-2 ring-black">
      {cart.reduce((total, item) => total + item.quantity, 0)}
    </span>
  )}
</div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4 pl-4 border-l border-white/20">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{user?.name}</span>
            <button onClick={logout} className="text-white/60 hover:text-white transition">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 uppercase text-[10px] tracking-[0.2em]">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-white text-black hover:bg-gray-200 uppercase text-[10px] tracking-[0.2em] font-bold">Join Now</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}