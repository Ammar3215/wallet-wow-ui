
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Clock, BarChart2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  
  // Mock campaign data
  const mockCampaigns = [
    {
      id: 1,
      name: "Summer Special",
      targetCard: "Coffee Loyalty Card",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      status: "Live",
      conversions: "12.5%",
      scans: 87,
      tags: ["Seasonal", "High Value"]
    },
    {
      id: 2,
      name: "Happy Hour Promo",
      targetCard: "Weekend Special",
      startDate: "2025-04-15",
      endDate: "2025-05-30",
      status: "Scheduled",
      conversions: "0%",
      scans: 0,
      tags: ["Happy Hour", "Afternoon"]
    },
    {
      id: 3,
      name: "Winter Holiday",
      targetCard: "Coffee Loyalty Card",
      startDate: "2024-12-01",
      endDate: "2025-01-15",
      status: "Ended",
      conversions: "18.2%",
      scans: 145,
      tags: ["Holiday", "Seasonal"]
    }
  ];
  
  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/partner-login");
      return;
    }
    
    // Set mock campaigns data
    setCampaigns(mockCampaigns);
  }, [navigate]);
  
  const handleCreateCampaign = () => {
    // Navigate to campaign creation page (to be implemented)
    // navigate("/dashboard/create-campaign");
    console.log("Create campaign clicked");
  };
  
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case "Live":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Ended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Campaigns</h1>
          <Button onClick={handleCreateCampaign}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
              <div className="text-3xl font-bold text-blue-600">
                {campaigns.filter(c => c.status === "Live").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Upcoming Campaigns</h3>
              <div className="text-3xl font-bold text-purple-600">
                {campaigns.filter(c => c.status === "Scheduled").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Total Conversions</h3>
              <div className="text-3xl font-bold text-green-600">
                {campaigns.filter(c => c.status === "Live" || c.status === "Ended")
                  .reduce((acc, campaign) => acc + parseInt(campaign.conversions), 0)}%
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Target Card</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.targetCard}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {campaign.startDate} - {campaign.endDate}
                  </TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {campaign.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">...</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <BarChart2 className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Extend Duration
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
