import { RotateCcw, Package, CheckCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="pt-[104px] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="pt-12 mb-12 text-center">
          <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-3">Policy</p>
          <h1 className="text-4xl font-bold text-gray-950 tracking-tight">Returns & Exchanges</h1>
          <p className="text-gray-500 mt-4 text-sm max-w-md mx-auto">We want you to love what you ordered. If something isn't right, we'll make it right.</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: RotateCcw, step: '01', title: 'Initiate Return', desc: 'Email us within 30 days of delivery with your order number.' },
            { icon: Package, step: '02', title: 'Ship It Back', desc: 'We\'ll send a prepaid label. Pack items in original packaging.' },
            { icon: CheckCircle, step: '03', title: 'Get Refunded', desc: 'Refund processed within 5–7 business days of receipt.' }
          ].map(({ icon: StepIcon, step, title, desc }) => (
            <div key={step} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4">
                <StepIcon className="w-4 h-4 text-gray-600" />
              </div>
              <p className="text-[10px] text-gray-400 font-semibold tracking-widest mb-2">STEP {step}</p>
              <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Policy details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
          {[
            { title: 'Eligibility', body: 'Items must be returned within 30 days of delivery, unused, unwashed, and in original packaging with all tags attached.' },
            { title: 'Non-Returnable Items', body: 'Final sale items, gift cards, and items marked as non-returnable at the time of purchase cannot be returned.' },
            { title: 'Exchanges', body: 'We offer free exchanges for a different size or color. Simply initiate a return and place a new order for the item you want.' },
            { title: 'Refund Timeline', body: 'Once we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method.' }
          ].map(({ title, body }) => (
            <div key={title} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Questions? <a href="mailto:support@primecommerce.com" className="font-semibold text-gray-950 hover:underline">support@primecommerce.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Returns;
