
import { Check } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      title: "Branded Digital Cards",
      description: "Customize cards with your logo, colors, and brand elements that represent your business.",
      image: "/placeholder.svg"
    },
    {
      title: "Wallet Integration",
      description: "Cards work seamlessly with Apple Wallet and Google Wallet for maximum customer convenience.",
      image: "/placeholder.svg"
    },
    {
      title: "QR Code Generation",
      description: "Create and share QR codes that customers can scan to add your card to their wallet.",
      image: "/placeholder.svg"
    },
    {
      title: "Flexible Rewards",
      description: "Configure stamps, points, or visit-based rewards that match your loyalty program.",
      image: "/placeholder.svg"
    },
    {
      title: "Customer Insights",
      description: "Access analytics on card usage, customer visits, and redemption patterns.",
      image: "/placeholder.svg"
    },
    {
      title: "No App Required",
      description: "Customers don't need to download any additional apps to use your loyalty card.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Features You'll Love</h2>
          <p className="text-lg text-gray-600">
            Everything you need to create and manage digital loyalty cards for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="h-12 w-12 rounded-full bg-brand-blue/10 flex items-center justify-center mb-5">
                <Check className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
