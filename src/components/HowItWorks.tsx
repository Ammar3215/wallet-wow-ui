
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Restaurant creates a loyalty card",
      description: "Design digital loyalty cards with your branding and custom rewards structure in minutes.",
      icon: (
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="16" height="14" rx="3" stroke="#3B82F6" strokeWidth="2" />
            <circle cx="12" cy="10" r="2" stroke="#3B82F6" strokeWidth="2" />
            <path d="M8 17C8 15.3431 9.34315 14 11 14H13C14.6569 14 16 15.3431 16 17" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )
    },
    {
      number: 2,
      title: "Customer scans a QR code",
      description: "Display QR codes in-store or share them digitally. One scan is all it takes.",
      icon: (
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="5" height="5" rx="1" stroke="#10B981" strokeWidth="2" />
            <rect x="14" y="5" width="5" height="5" rx="1" stroke="#10B981" strokeWidth="2" />
            <rect x="5" y="14" width="5" height="5" rx="1" stroke="#10B981" strokeWidth="2" />
            <path d="M18 14H15V17" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 14H19V21H14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 19V21" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    },
    {
      number: 3,
      title: "Card added to Wallet",
      description: "Customers add your loyalty card to Apple or Google Wallet in one tap.",
      icon: (
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="13" rx="2" stroke="#8B5CF6" strokeWidth="2" />
            <path d="M4 10H20" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 15H10" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 15H17" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">
            Our platform makes digital loyalty cards simple for businesses and delightful for customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="flex justify-between items-start mb-6">
                {step.icon}
                <span className="text-gray-200 font-bold text-6xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="text-brand-blue" size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-6">Ready to modernize your loyalty program?</p>
          <button className="bg-brand-blue text-white px-8 py-3 rounded-md font-medium hover:bg-brand-blue-dark transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
