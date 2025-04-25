
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small cafes and new businesses",
      features: [
        "1 digital loyalty card",
        "Up to 250 customer scans/month",
        "Basic card customization",
        "Email support",
        "Basic analytics"
      ],
      isPopular: false
    },
    {
      name: "Business",
      price: "$79",
      description: "For growing businesses with multiple locations",
      features: [
        "Up to 3 digital loyalty cards",
        "Unlimited customer scans",
        "Advanced card customization",
        "Priority support",
        "Detailed analytics",
        "Customer insights dashboard"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For chains and large restaurant groups",
      features: [
        "Unlimited digital loyalty cards",
        "Unlimited customer scans",
        "Fully customizable cards",
        "Dedicated account manager",
        "Advanced analytics & reporting",
        "Custom integrations",
        "Location management"
      ],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">
            Choose the plan that's right for your business. All plans include core features with no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
                plan.isPopular 
                  ? 'border-brand-blue scale-105 shadow-md' 
                  : 'border-gray-100'
              }`}
            >
              {plan.isPopular && (
                <div className="bg-brand-blue text-white py-1 px-4 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500 ml-1">/month</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <Button 
                  className={`w-full mb-6 ${plan.isPopular ? 'bg-brand-blue hover:bg-brand-blue-dark' : ''}`}
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  Get Started
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-brand-green mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
