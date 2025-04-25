
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, Copy, Share2, QrCode, Download } from "lucide-react";

const Dashboard = () => {
  const [businessName, setBusinessName] = useState("");
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const stats = {
    cardsIssued: 328,
    scansThisWeek: 125,
    totalRedemptions: 47
  };
  
  const cards = [
    {
      id: 1,
      name: "Coffee Loyalty Card",
      status: "Active",
      created: "2025-03-15",
      scans: 145,
      redemptions: 32,
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Weekend Special",
      status: "Inactive",
      created: "2025-04-01",
      scans: 87,
      redemptions: 15,
      thumbnail: "/placeholder.svg"
    }
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
  }, [navigate]);

  const handleCreateCard = () => {
    navigate("/dashboard/create-card");
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
          </div>
        </div>
        
        {/* Cards Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Cards</h2>
            <Button onClick={handleCreateCard}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Card
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
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
                    <Button variant="outline" size="sm">
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
    </DashboardLayout>
  );
};

export default Dashboard;
