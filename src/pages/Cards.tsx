
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search
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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import QrCode from "@/components/QrCode";

const Cards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Mock data for cards
  const mockCards = [
    {
      id: 1,
      name: "Coffee Loyalty Card",
      status: "Active",
      created: "2025-03-15",
      scans: 145,
      redemptions: 32,
      thumbnail: "/placeholder.svg",
      tags: ["High Performing"],
      type: "Stamp Card",
      stamps: 10,
      reward: "Free Coffee"
    },
    {
      id: 2,
      name: "Weekend Special",
      status: "Active",
      created: "2025-04-01",
      scans: 87,
      redemptions: 15,
      thumbnail: "/placeholder.svg",
      tags: ["New"],
      type: "Points Card",
      points: 100,
      reward: "10% Discount"
    },
    {
      id: 3,
      name: "Sandwich Stamp Card",
      status: "Inactive",
      created: "2025-02-10",
      scans: 54,
      redemptions: 8,
      thumbnail: "/placeholder.svg",
      tags: ["Low Redemption"],
      type: "Stamp Card",
      stamps: 8,
      reward: "Free Sandwich"
    },
    {
      id: 4,
      name: "Breakfast Loyalty",
      status: "Active",
      created: "2025-01-20",
      scans: 210,
      redemptions: 43,
      thumbnail: "/placeholder.svg",
      tags: ["High Performing"],
      type: "Stamp Card",
      stamps: 6,
      reward: "Free Breakfast Combo"
    },
    {
      id: 5,
      name: "Holiday Gift Card",
      status: "Inactive",
      created: "2024-12-01",
      scans: 120,
      redemptions: 35,
      thumbnail: "/placeholder.svg",
      tags: ["Seasonal"],
      type: "Gift Card",
      value: "$20",
      reward: "Store Credit"
    }
  ];
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (!isLoggedIn) {
      navigate("/partner-login");
      return;
    }
    
    // Set mock cards data
    setCards(mockCards);
  }, [navigate]);
  
  useEffect(() => {
    // Apply filters and search
    let filtered = [...cards];
    
    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(card => card.status === statusFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(card => 
        card.name.toLowerCase().includes(term) || 
        card.type.toLowerCase().includes(term) ||
        (card.tags && card.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // Apply sorting
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
  }, [cards, statusFilter, sortBy, searchTerm]);
  
  const handleCreateCard = () => {
    navigate("/dashboard/create-card");
  };
  
  const handleEditCard = (card) => {
    // In a real application, navigate to edit page with card ID
    toast.info(`Editing card: ${card.name}`);
  };
  
  const handleDuplicateCard = (card) => {
    const newCard = {
      ...card,
      id: Date.now(), // Use timestamp as ID in mock data
      name: `${card.name} (Copy)`,
      created: new Date().toISOString().split('T')[0],
      scans: 0,
      redemptions: 0
    };
    
    setCards(prev => [...prev, newCard]);
    toast.success(`Duplicated card: ${card.name}`);
  };
  
  const handleShowQrCode = (card) => {
    setSelectedCard(card);
    setShowQrDialog(true);
  };
  
  const handleConfirmDelete = () => {
    if (!selectedCard) return;
    
    // In a real app, this would call an API
    setCards(prev => prev.filter(card => card.id !== selectedCard.id));
    setShowDeleteConfirm(false);
    toast.success(`Deleted card: ${selectedCard.name}`);
    setSelectedCard(null);
  };
  
  const promptDeleteCard = (card) => {
    setSelectedCard(card);
    setShowDeleteConfirm(true);
  };
  
  const handleShareCard = (card) => {
    // In a real application, this would generate a share link
    navigator.clipboard.writeText(`https://example.com/card/${card.id}`);
    toast.success("Share link copied to clipboard!");
  };
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Cards</h1>
            <p className="text-gray-600">Manage and monitor your loyalty cards</p>
          </div>
          <Button onClick={handleCreateCard}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Card
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Input
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
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
          
          <div className="flex items-center justify-end space-x-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </Button>
            
            <Button 
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
        
        {filteredCards.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">No cards found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? "Try adjusting your search or filters."
                : "Create your first card to get started."}
            </p>
            <Button onClick={handleCreateCard}>Create New Card</Button>
          </div>
        ) : viewMode === "grid" ? (
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
                              : tag === "Seasonal"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{card.name}</h3>
                  <div className="text-sm text-gray-600 mb-3">{card.type}</div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="text-gray-600">Created:</div>
                    <div>{card.created}</div>
                    <div className="text-gray-600">Scans:</div>
                    <div>{card.scans}</div>
                    <div className="text-gray-600">Redemptions:</div>
                    <div>{card.redemptions}</div>
                    <div className="text-gray-600">Reward:</div>
                    <div>{card.reward}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditCard(card)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDuplicateCard(card)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => promptDeleteCard(card)}
                    >
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShareCard(card)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Card</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>Redemptions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded bg-gray-200 mr-3 overflow-hidden">
                          <img 
                            src={card.thumbnail} 
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{card.name}</div>
                          <div className="text-xs text-gray-500">
                            {card.tags && card.tags.map((tag, idx) => (
                              <span key={idx} className="mr-2">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{card.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          card.status === "Active" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        {card.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{card.created}</TableCell>
                    <TableCell>{card.scans}</TableCell>
                    <TableCell>{card.redemptions}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditCard(card)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleShowQrCode(card)}>
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">...</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleDuplicateCard(card)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareCard(card)}>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => promptDeleteCard(card)}
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
        )}
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
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Card</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete <strong>{selectedCard?.name}</strong>? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

// Import missing component
const CreditCard = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  );
};

export default Cards;
