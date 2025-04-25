
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Calendar, Clock, BarChart2, Edit, Trash2, Filter } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    targetCard: "",
    startDate: "",
    endDate: "",
    description: "",
    tags: []
  });
  const [isEditing, setIsEditing] = useState(false);
  
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
      tags: ["Seasonal", "High Value"],
      description: "Special summer promotion with double stamps."
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
      tags: ["Happy Hour", "Afternoon"],
      description: "Afternoon special offer for increased traffic."
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
      tags: ["Holiday", "Seasonal"],
      description: "Winter holiday special offers and decorations."
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
    setFormData({
      id: null,
      name: "",
      targetCard: "",
      startDate: "",
      endDate: "",
      description: "",
      tags: []
    });
    setIsEditing(false);
    setShowCampaignForm(true);
  };
  
  const handleEditCampaign = (campaign) => {
    setFormData({
      id: campaign.id,
      name: campaign.name,
      targetCard: campaign.targetCard,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      description: campaign.description || "",
      tags: campaign.tags || []
    });
    setIsEditing(true);
    setShowCampaignForm(true);
  };
  
  const handleDeleteCampaign = (id) => {
    // In a real app, this would call an API to delete the campaign
    const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
    setCampaigns(updatedCampaigns);
    toast.success("Campaign deleted successfully");
  };
  
  const handleSubmitCampaign = () => {
    if (!formData.name || !formData.targetCard || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isEditing) {
      // Update existing campaign
      const updatedCampaigns = campaigns.map(campaign => 
        campaign.id === formData.id ? { 
          ...campaign, 
          name: formData.name,
          targetCard: formData.targetCard,
          startDate: formData.startDate,
          endDate: formData.endDate,
          description: formData.description,
          tags: formData.tags
        } : campaign
      );
      setCampaigns(updatedCampaigns);
      toast.success("Campaign updated successfully");
    } else {
      // Create new campaign
      const newCampaign = {
        id: Date.now(), // Use timestamp as ID in mock data
        name: formData.name,
        targetCard: formData.targetCard,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        status: "Scheduled",
        conversions: "0%",
        scans: 0,
        tags: formData.tags.length > 0 ? formData.tags : ["New"]
      };
      setCampaigns([...campaigns, newCampaign]);
      toast.success("Campaign created successfully");
    }
    
    setShowCampaignForm(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };
  
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
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
  
  const filteredCampaigns = statusFilter === "All" 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status === statusFilter);
  
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
                  .reduce((acc, campaign) => {
                    const conversionValue = parseFloat(campaign.conversions);
                    return isNaN(conversionValue) ? acc : acc + conversionValue;
                  }, 0).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6 flex flex-wrap items-center gap-4">
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
                <DropdownMenuItem onClick={() => setStatusFilter("Live")}>Live</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Scheduled")}>Scheduled</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Ended")}>Ended</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
              {filteredCampaigns.map((campaign) => (
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
                      <Button variant="outline" size="sm" onClick={() => handleEditCampaign(campaign)}>
                        <Edit className="h-4 w-4 mr-1" />
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
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
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
      
      {/* Campaign Creation/Edit Dialog */}
      <Dialog open={showCampaignForm} onOpenChange={setShowCampaignForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Campaign" : "Create New Campaign"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Campaign Name</label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name} 
                  onChange={handleInputChange}
                  placeholder="Summer Special Offer"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="targetCard" className="text-sm font-medium">Target Card</label>
                <Input 
                  id="targetCard" 
                  name="targetCard"
                  value={formData.targetCard} 
                  onChange={handleInputChange}
                  placeholder="Select the card this campaign applies to"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                  <Input 
                    id="startDate" 
                    name="startDate"
                    type="date" 
                    value={formData.startDate} 
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                  <Input 
                    id="endDate" 
                    name="endDate"
                    type="date" 
                    value={formData.endDate} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Campaign Description</label>
                <Input 
                  id="description" 
                  name="description"
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="Describe your campaign"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="tags" className="text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                      {tag}
                      <button 
                        type="button" 
                        className="ml-1 text-blue-600 hover:text-blue-800"
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <Input 
                  id="tagInput" 
                  placeholder="Add tags and press Enter (e.g. 'Seasonal', 'Happy Hour')" 
                  onKeyDown={handleTagInput}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitCampaign}>
              {isEditing ? "Update Campaign" : "Create Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Campaigns;
