
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="py-4 border-b border-gray-100">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue">
              <span className="absolute w-6 h-6 rounded-full bg-white top-1 left-2"></span>
              <span className="absolute w-2 h-2 rounded-full bg-brand-green top-4 left-5"></span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">CardWallet</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-brand-blue transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-brand-blue transition-colors">How It Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-brand-blue transition-colors">Pricing</a>
          <Link to="/partner-login" className="text-gray-600 hover:text-brand-blue transition-colors">Partner Login</Link>
          <Button variant="outline" className="ml-2">Log In</Button>
          <Button>Sign Up</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md absolute top-16 inset-x-0 z-50">
          <div className="flex flex-col space-y-4 py-2">
            <a href="#features" className="px-4 py-2 text-gray-600 hover:text-brand-blue transition-colors">Features</a>
            <a href="#how-it-works" className="px-4 py-2 text-gray-600 hover:text-brand-blue transition-colors">How It Works</a>
            <a href="#pricing" className="px-4 py-2 text-gray-600 hover:text-brand-blue transition-colors">Pricing</a>
            <Link to="/partner-login" className="px-4 py-2 text-gray-600 hover:text-brand-blue transition-colors">Partner Login</Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
