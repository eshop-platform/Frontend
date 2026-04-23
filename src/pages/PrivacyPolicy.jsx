const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly — such as your name, email address, and payment details when you make a purchase. We also collect usage data automatically, including your IP address, browser type, and pages visited.'
  },
  {
    title: 'How We Use Your Information',
    body: 'We use your information to process orders, send transactional emails, improve our services, and communicate with you about products and promotions. We never sell your personal data to third parties.'
  },
  {
    title: 'Cookies',
    body: 'We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser at any time.'
  },
  {
    title: 'Data Security',
    body: 'We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology and processed through secure third-party providers.'
  },
  {
    title: 'Third-Party Services',
    body: 'We use trusted third-party services for payment processing (Chapa), analytics, and email delivery. These providers have their own privacy policies and are contractually obligated to protect your data.'
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at support@primecommerce.com and we will respond within 30 days.'
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our website. Continued use of our services constitutes acceptance of the updated policy.'
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="pt-[104px] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="pt-12 mb-12">
          <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-gray-950 tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8">
          <p className="text-gray-500 text-sm leading-relaxed">
            At PrimeCommerce, your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>
          {sections.map(({ title, body }) => (
            <div key={title} className="border-t border-gray-100 pt-8">
              <h2 className="font-bold text-gray-950 mb-3">{title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Questions about this policy? <a href="mailto:support@primecommerce.com" className="font-semibold text-gray-950 hover:underline">Contact us</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
