
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  CreditCard, 
  BarChart2, 
  Settings, 
  Bell, 
  User, 
  QrCode, 
  Calendar, 
  LogIn 
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in (in a real app, use a proper auth system)
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedBusinessName = localStorage.getItem("businessName");
    
    if (!isLoggedIn) {
      navigate("/partner-login");
      return;
    }
    
    setBusinessName(storedBusinessName || "Partner");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("businessName");
    navigate("/partner-login");
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Cards", icon: CreditCard, path: "/dashboard/cards" },
    { name: "Campaigns", icon: Calendar, path: "/dashboard/campaigns" },
    { name: "Customers", icon: User, path: "/dashboard/customers" },
    { name: "QR Codes", icon: QrCode, path: "/dashboard/qr-codes" },
    { name: "Analytics", icon: BarChart2, path: "/dashboard/analytics" },
    { name: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6 border-b flex items-center">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue mr-3">
            <span className="absolute w-6 h-6 rounded-full bg-white top-1 left-2"></span>
            <span className="absolute w-2 h-2 rounded-full bg-brand-green top-4 left-5"></span>
          </div>
          <span className="text-xl font-bold">CardWallet</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive(item.path) 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-brand-blue text-white flex items-center justify-center mr-2">
                {businessName.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-700">{businessName}</p>
                <p className="text-gray-500">Business Account</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue mr-2">
              <span className="absolute w-4 h-4 rounded-full bg-white top-1 left-1.5"></span>
              <span className="absolute w-1.5 h-1.5 rounded-full bg-brand-green top-3 left-3.5"></span>
            </div>
            <span className="text-lg font-bold">CardWallet</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
          <div className="bg-white border-b border-gray-200">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                    isActive(item.path) 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100"
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

export default DashboardLayout;
