
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  CreditCard, 
  BarChart2, 
  Settings, 
  Users,
  Building2,
  Bell, 
  LogIn,
  FileText,
  CreditCard as WalletIcon,
  BadgeDollarSign
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in (in a real app, use a proper auth system)
    // For admin, would need additional check for admin role
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isAdmin = localStorage.getItem("isAdmin");
    
    if (!isLoggedIn || !isAdmin) {
      // In real app, redirect to admin login
      // For now, just go to main login
      navigate("/partner-login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    navigate("/partner-login");
  };

  const navItems = [
    { name: "Overview", icon: Home, path: "/admin" },
    { name: "Businesses", icon: Building2, path: "/admin/businesses" },
    { name: "Cards", icon: CreditCard, path: "/admin/cards" },
    { name: "Analytics", icon: BarChart2, path: "/admin/analytics" },
    { name: "Subscriptions", icon: BadgeDollarSign, path: "/admin/subscriptions" },
    { name: "Templates", icon: FileText, path: "/admin/templates" },
    { name: "Wallet Pass", icon: WalletIcon, path: "/admin/wallet-pass" },
    { name: "Notifications", icon: Bell, path: "/admin/notifications" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    if (path !== "/admin" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-gray-900 text-white">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 mr-3">
            <span className="absolute w-6 h-6 rounded-full bg-white top-1 left-2"></span>
            <span className="absolute w-2 h-2 rounded-full bg-green-500 top-4 left-5"></span>
          </div>
          <div>
            <span className="text-xl font-bold">CardWallet</span>
            <span className="block text-xs text-gray-400">Admin Panel</span>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive(item.path) 
                    ? "bg-gray-800 text-white" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-purple-700 text-white flex items-center justify-center mr-2">
                A
              </div>
              <div className="text-sm">
                <p className="font-medium text-white">Admin User</p>
                <p className="text-gray-400">System Administrator</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
              onClick={handleLogout}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 mr-2">
              <span className="absolute w-4 h-4 rounded-full bg-white top-1 left-1.5"></span>
              <span className="absolute w-1.5 h-1.5 rounded-full bg-green-500 top-3 left-3.5"></span>
            </div>
            <div>
              <span className="text-lg font-bold text-white">CardWallet</span>
              <span className="block text-xs text-gray-400">Admin</span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-gray-900 border-b border-gray-700">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                    isActive(item.path) 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-800 hover:text-white"
              >
                <LogIn className="h-5 w-5 mr-3" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-14">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
