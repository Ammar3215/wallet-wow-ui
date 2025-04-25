
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Copy, 
  Share2, 
  QrCode, 
  Download, 
  Filter,
  BarChart2,
  Calendar,
  User,
  Bell 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const Dashboard = () => {
  const [businessName, setBusinessName] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const stats = {
    cardsIssued: 328,
    scansThisWeek: 125,
    totalRedemptions: 47,
    activeCampaigns: 3
  };
  
  const mockCards = [
    {
      id: 1,
      name: "Coffee Loyalty Card",
      status: "Active",
      created: "2025-03-15",
      scans: 145,
      redemptions: 32,
      thumbnail: "/placeholder.svg",
      tags: ["High Performing"]
    },
    {
      id: 2,
      name: "Weekend Special",
      status: "Active",
      created: "2025-04-01",
      scans: 87,
      redemptions: 15,
      thumbnail: "/placeholder.svg",
      tags: ["New"]
    },
    {
      id: 3,
      name: "Sandwich Stamp Card",
      status: "Inactive",
      created: "2025-02-10",
      scans: 54,
      redemptions: 8,
      thumbnail: "/placeholder.svg",
      tags: ["Low Redemption"]
    }
  ];

  const recentActivity = [
    "Card 'Weekend Special' scanned 5 times today",
    "New reward redemption from Coffee Loyalty Card",
    "Sandwich Stamp Card has 2 new wallet adds"
  ];
  
  useEffect(() => {
    // Check if user is logged in (in a real app, use a proper auth system)
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedBusinessName = localStorage.getItem("businessName");
    
    if (!isLoggedIn) {
      navigate("/partner-login");
      return;
    }
    
    setBusinessName(storedBusinessName || "Partner");
    setCards(mockCards);
    setFilteredCards(mockCards);

    // Check if this is the user's first login
    const isFirstLogin = !localStorage.getItem("hasLoggedInBefore");
    if (isFirstLogin) {
      setShowOnboarding(true);
      localStorage.setItem("hasLoggedInBefore", "true");
    } else {
      setShowOnboarding(false);
    }
  }, [navigate]);

  useEffect(() => {
    // Apply filters
    let filtered = [...cards];
    
    if (statusFilter !== "All") {
      filtered = filtered.filter(card => card.status === statusFilter);
    }
    
    switch (sortBy) {
      case "Most Scanned":
        filtered.sort((a, b) => b.scans - a.scans);
        break;
      case "Most Redeemed":
        filtered.sort((a, b) => b.redemptions - a.redemptions);
        break;
      case "Newest":
      default:
        filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
    }
    
    setFilteredCards(filtered);
  }, [statusFilter, sortBy, cards]);

  const handleCreateCard = () => {
    navigate("/dashboard/create-card");
  };

  const handleShowQrCode = (card) => {
    setSelectedCard(card);
    setShowQrDialog(true);
  };
  
  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasLoggedInBefore", "true");
  };

  const handleNavigate = (path) => {
    navigate(`/dashboard/${path}`);
  };
  
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {businessName}!</h1>
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{stats.cardsIssued}</span>
              <span className="text-gray-600">cards issued</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{stats.scansThisWeek}</span>
              <span className="text-gray-600">scans this week</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{stats.totalRedemptions}</span>
              <span className="text-gray-600">total redemptions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{stats.activeCampaigns}</span>
              <span className="text-gray-600">active campaigns</span>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button onClick={handleCreateCard}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Card
            </Button>
            <Button variant="outline" onClick={() => handleNavigate('analytics')}>
              <BarChart2 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
          
          {/* Recent Activity Feed */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <div className="bg-gray-50 rounded-md p-3">
              <ul className="space-y-2">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="text-sm text-gray-600">{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Onboarding Assistant */}
        {showOnboarding && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8 relative">
            <button 
              onClick={handleDismissOnboarding}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-blue-800">Let's build your first loyalty card</h3>
            <p className="text-blue-600 mt-2">It only takes 3 minutes to create your first card and start engaging with customers!</p>
            <div className="mt-4 flex gap-3">
              <Button onClick={handleCreateCard} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button variant="outline" onClick={handleDismissOnboarding}>
                Skip for Now
              </Button>
            </div>
          </div>
        )}
        
        {/* Cards Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">Your Cards</h2>
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Status:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="inline-flex items-center">
                      {statusFilter} <Filter className="ml-2 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Sort By Filter */}
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort By:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="inline-flex items-center">
                      {sortBy} <Filter className="ml-2 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("Newest")}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Most Scanned")}>Most Scanned</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Most Redeemed")}>Most Redeemed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button onClick={handleCreateCard}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Card
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={card.thumbnail} 
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      card.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {card.status}
                  </div>
                  {card.tags && card.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {card.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tag === "High Performing" 
                              ? "bg-blue-100 text-blue-800" 
                              : tag === "Low Redemption"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="text-gray-600">Created:</div>
                    <div>{card.created}</div>
                    <div className="text-gray-600">Scans:</div>
                    <div>{card.scans}</div>
                    <div className="text-gray-600">Redemptions:</div>
                    <div>{card.redemptions}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShowQrCode(card)}
                    >
                      <QrCode className="h-4 w-4 mr-1" />
                      QR Code
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code: {selectedCard?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 bg-white p-4 rounded-lg">
              {selectedCard && <QrCode />}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download PNG
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Dashboard;
