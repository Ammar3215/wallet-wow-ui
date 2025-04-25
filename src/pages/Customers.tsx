
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock customer data
  const mockCustomers = [
    {
      id: "C001",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      cardsAdded: ["Coffee Loyalty Card", "Weekend Special"],
      scans: 12,
      lastVisit: "2025-04-22",
      rewardProgress: "8/10"
    },
    {
      id: "C002",
      name: "Michael Chen",
      email: "m.chen@example.com",
      cardsAdded: ["Coffee Loyalty Card"],
      scans: 5,
      lastVisit: "2025-04-20",
      rewardProgress: "5/10"
    },
    {
      id: "C003",
      name: "Tanya Rodriguez",
      email: "t.rod@example.com",
      cardsAdded: ["Weekend Special", "Sandwich Stamp Card"],
      scans: 18,
      lastVisit: "2025-04-23",
      rewardProgress: "9/10"
    },
    {
      id: "C004",
      name: "James Wilson",
      email: "j.wilson@example.com",
      cardsAdded: ["Coffee Loyalty Card"],
      scans: 3,
      lastVisit: "2025-04-15",
      rewardProgress: "3/10"
    },
    {
      id: "C005",
      name: "Aisha Patel",
      email: "a.patel@example.com",
      cardsAdded: ["Weekend Special"],
      scans: 7,
      lastVisit: "2025-04-21",
      rewardProgress: "7/10"
    }
  ];
  
  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/partner-login");
      return;
    }
    
    // Set mock customers data
    setCustomers(mockCustomers);
  }, [navigate]);
  
  const handleExportCSV = () => {
    // In a real app, generate and download a CSV file
    console.log("Export CSV clicked");
    
    // Display success message using toast (would be implemented in a real app)
    console.log("Customer data exported successfully");
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate customer segments
  const highFrequencyUsers = customers.filter(c => c.scans >= 10).length;
  const activeUsers = customers.filter(c => c.scans >= 5 && c.scans < 10).length;
  const inactiveUsers = customers.filter(c => c.scans < 5).length;
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <Button onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">Total Customers</div>
              <div className="text-3xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">High Frequency</div>
              <div className="text-3xl font-bold text-green-600">{highFrequencyUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">Active Users</div>
              <div className="text-3xl font-bold text-blue-600">{activeUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500">Inactive Users</div>
              <div className="text-3xl font-bold text-orange-600">{inactiveUsers}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="ml-3">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cards Added</TableHead>
                <TableHead>Scans</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Reward Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {customer.cardsAdded.map((card, idx) => (
                        <span key={idx} className="text-sm">{card}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{customer.scans}</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: parseInt(customer.rewardProgress.split('/')[0]) / parseInt(customer.rewardProgress.split('/')[1]) * 100 + '%' }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{customer.rewardProgress}</div>
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

export default Customers;
