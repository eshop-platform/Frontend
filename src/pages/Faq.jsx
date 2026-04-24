import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Contact support to initiate a return.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days. Express options are available at checkout. Free shipping on all orders over $150.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide. International orders typically arrive within 10–14 business days depending on your location.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can use it to monitor your delivery in real time.' },
  { q: 'Are your products ethically sourced?', a: 'Absolutely. We vet every supplier for fair labor practices and environmental responsibility before adding them to our supply chain.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, the order enters fulfillment and cannot be changed.' }
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((c) => !c)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-gray-900 text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="text-gray-500 text-sm leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
};

const Faq = () => {
  return (
    <div className="pt-[104px] pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="pt-12 mb-12 text-center">
          <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-3">Help Center</p>
          <h1 className="text-4xl font-bold text-gray-950 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-gray-500 mt-4 text-sm">Can't find what you're looking for? <a href="mailto:support@primecommerce.com" className="text-gray-950 font-semibold hover:underline">Contact us</a>.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 px-6">
          {faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
        </div>
      </div>
    </div>
  );
};

export default Faq;
