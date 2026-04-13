export default function AuthLayout({ children, title }) {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg9.png')" }}
    >
      {/* 1. Dark Overlay: Makes the image slightly darker so white text pops */}
      <div className="absolute inset-0 bg-black/0"></div>

      {/* 2. Glass Container: The blurred box for your form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/0. backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}