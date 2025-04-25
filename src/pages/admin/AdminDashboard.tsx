
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, CreditCard, ShoppingBag, Users, QrCode, Award, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const stats = {
    totalBusinesses: 124,
    businessGrowth: 12,
    totalCards: 856,
    cardGrowth: 28,
    totalWalletSaves: 4328,
    walletSaveGrowth: 18,
    totalQrScans: 11250,
    qrScanGrowth: -5,
    totalRedemptions: 2145,
    redemptionGrowth: 32
  };
  
  // Mock data for recent activity
  const recentActivity = [
    { id: 1, business: "Coffee Corner", action: "created a new card", time: "2 hours ago" },
    { id: 2, business: "Burger Joint", action: "subscribed to Premium plan", time: "5 hours ago" },
    { id: 3, business: "Smoothie Bar", action: "had 50 new wallet saves", time: "1 day ago" },
    { id: 4, business: "Pizza Place", action: "launched a new campaign", time: "1 day ago" },
    { id: 5, business: "Taco Tuesday", action: "registered on the platform", time: "2 days ago" }
  ];
  
  // Mock data for top performing cards
  const topCards = [
    { id: 1, name: "Coffee Loyalty", business: "Coffee Corner", scans: 1245, redemptions: 312, conversionRate: 25 },
    { id: 2, name: "Weekend Special", business: "Burger Joint", scans: 850, redemptions: 187, conversionRate: 22 },
    { id: 3, name: "Smoothie Pass", business: "Smoothie Bar", scans: 620, redemptions: 104, conversionRate: 17 },
    { id: 4, name: "Pizza Points", business: "Pizza Place", scans: 580, redemptions: 143, conversionRate: 25 },
    { id: 5, name: "Taco Card", business: "Taco Tuesday", scans: 320, redemptions: 67, conversionRate: 21 }
  ];
  
  // Mock data for chart
  const chartData = [
    { name: 'Jan', cards: 65, scans: 400, redemptions: 120 },
    { name: 'Feb', cards: 72, scans: 460, redemptions: 150 },
    { name: 'Mar', cards: 85, scans: 550, redemptions: 180 },
    { name: 'Apr', cards: 75, scans: 510, redemptions: 160 },
    { name: 'May', cards: 92, scans: 590, redemptions: 190 },
    { name: 'Jun', cards: 105, scans: 670, redemptions: 210 },
    { name: 'Jul', cards: 120, scans: 790, redemptions: 250 }
  ];
  
  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isAdmin = localStorage.getItem("isAdmin");
    
    if (!isLoggedIn || !isAdmin) {
      // For now, we'll set a mock admin session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "true");
    }
  }, [navigate]);
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Platform Overview</h1>
          <p className="text-gray-600">Monitor the health and performance of your loyalty card platform</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <Badge variant="outline" className={`${stats.businessGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stats.businessGrowth >= 0 ? '+' : ''}{stats.businessGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">{stats.totalBusinesses}</div>
              <p className="text-sm text-gray-600">Registered Businesses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <Badge variant="outline" className={`${stats.cardGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stats.cardGrowth >= 0 ? '+' : ''}{stats.cardGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">{stats.totalCards}</div>
              <p className="text-sm text-gray-600">Total Cards Created</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                </div>
                <Badge variant="outline" className={`${stats.walletSaveGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stats.walletSaveGrowth >= 0 ? '+' : ''}{stats.walletSaveGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">{stats.totalWalletSaves.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Wallet Saves</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <QrCode className="h-5 w-5 text-yellow-600" />
                </div>
                <Badge variant="outline" className={`${stats.qrScanGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stats.qrScanGrowth >= 0 ? '+' : ''}{stats.qrScanGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">{stats.totalQrScans.toLocaleString()}</div>
              <p className="text-sm text-gray-600">QR Scans</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Award className="h-5 w-5 text-red-600" />
                </div>
                <Badge variant="outline" className={`${stats.redemptionGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stats.redemptionGrowth >= 0 ? '+' : ''}{stats.redemptionGrowth}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">{stats.totalRedemptions.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Total Redemptions</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="scans" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="redemptions" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>New Cards Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cards" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Performing Cards and Recent Activity */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Top Performing Cards */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCards.map((card) => (
                    <div key={card.id} className="flex items-center">
                      <div className="h-10 w-10 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {card.name.charAt(0)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium">{card.name}</div>
                        <div className="text-sm text-gray-500">{card.business}</div>
                      </div>
                      <div>
                        <div className="font-medium text-right">{card.scans} scans</div>
                        <div className={`text-sm ${card.conversionRate >= 20 ? 'text-green-600' : 'text-gray-600'}`}>
                          {card.conversionRate}% conversion
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Cards</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="font-medium">
                        {item.business}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.action}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View All Activity</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
