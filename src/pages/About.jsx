const About = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Elevating Everyday Essentials</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-12">
          Founded in 2024, PrimeCommerce was built on the principle that quality design should be accessible to everyone. We source the best materials and work with ethical manufacturers to bring you products that last.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-blue-50 rounded-3xl">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">100%</h3>
            <p className="font-semibold">Sustainable Cotton</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="font-semibold">Customer Support</p>
          </div>
          <div className="p-8 bg-indigo-50 rounded-3xl">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">Free</h3>
            <p className="font-semibold">Worldwide Shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

