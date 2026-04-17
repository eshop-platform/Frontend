import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-[85vh] w-full flex items-end justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero5.png" 
          alt="Luxury Fashion Banner" 
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 " />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 text-center pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-yellow-300 text-lg md:text-xl font-light tracking-wide drop-shadow-md">

          </p>
          
      <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFC300] hover:to-[#FF8C00] rounded-full px-10 py-6 text-sm uppercase font-bold tracking-widest transition-transform hover:scale-105 shadow-lg">
            Shop Now
          </Button>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
