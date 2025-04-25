import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Bring Your Loyalty Program to Customers' Wallets
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Create digital loyalty cards your customers will love. Boost retention and increase customer lifetime value.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                See Demo
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-float">
            <div className="relative mx-auto w-full max-w-md">
              {/* Phone mockup */}
              <div className="relative mx-auto h-[600px] w-[300px] rounded-[40px] border-8 border-gray-900 bg-gray-800 shadow-xl">
                {/* Phone screen */}
                <div className="absolute inset-0 overflow-hidden rounded-[32px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/90 to-brand-green/90">
                    {/* Wallet content */}
                    <div className="absolute inset-0 p-5 flex flex-col">
                      <div className="mt-12 mb-4">
                        <h2 className="text-white text-2xl font-semibold">Your Wallet</h2>
                        <p className="text-white/80 text-sm">Digital cards, always with you</p>
                      </div>
                      
                      {/* Loyalty card */}
                      <div className="bg-white rounded-2xl shadow-lg p-4 mb-3 transform rotate-3 -translate-y-1">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-brand-green rounded-full"></div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-800 font-semibold">Green Coffee</p>
                            <p className="text-gray-500 text-xs">LOYALTY CARD</p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-1">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                i < 7 ? 'bg-brand-green text-white' : 'border border-gray-300'
                              }`}
                            >
                              {i < 7 && '✓'}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                          7/10 stamps - 3 more for a free coffee!
                        </div>
                      </div>
                      
                      {/* Other cards */}
                      <div className="bg-amber-50 rounded-2xl shadow-lg p-4 mb-3 transform -rotate-2 -translate-y-1">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-amber-500 rounded-full"></div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-800 font-semibold">Tasty Bakery</p>
                            <p className="text-gray-500 text-xs">LOYALTY CARD</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-2xl shadow-lg p-4 transform rotate-1 -translate-y-1 opacity-90">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-800 font-semibold">Fresh Juice</p>
                            <p className="text-gray-500 text-xs">LOYALTY CARD</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phone notch */}
                <div className="absolute top-0 inset-x-0">
                  <div className="mx-auto h-6 w-40 rounded-b-3xl bg-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
