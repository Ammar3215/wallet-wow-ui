
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const Notifications = () => {
  const navigate = useNavigate();
  
  const notificationTypes = [
    {
      id: 1,
      name: "First Scan Welcome",
      description: "Send welcome message after customer's first scan",
      email: true,
      push: true,
      sms: false,
      message: "Welcome to our loyalty program! Scan again on your next visit to earn rewards."
    },
    {
      id: 2,
      name: "Reward Unlocked",
      description: "Alert when customer earns a reward",
      email: true,
      push: true,
      sms: true,
      message: "Congratulations! You've earned a free [REWARD]. Show this message on your next visit."
    },
    {
      id: 3,
      name: "Halfway Reminder",
      description: "Encourage customers who are halfway to a reward",
      email: true,
      push: false,
      sms: false,
      message: "You're halfway to your next reward! Visit again to keep earning."
    },
    {
      id: 4,
      name: "Inactivity Reminder",
      description: "Re-engage customers who haven't visited in 14+ days",
      email: true,
      push: true,
      sms: false,
      message: "We miss you! Come back and continue earning rewards."
    },
    {
      id: 5,
      name: "Card Expiry Warning",
      description: "Notify customers of cards about to expire",
      email: true,
      push: true,
      sms: true,
      message: "Your loyalty card expires in 7 days. Visit soon to use your remaining rewards!"
    }
  ];
  
  const [notifications, setNotifications] = useState(notificationTypes);
  
  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/partner-login");
      return;
    }
  }, [navigate]);
  
  const handleToggleChannel = (id, channel) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, [channel]: !notification[channel] }
        : notification
    ));
  };
  
  const handleUpdateMessage = (id, message) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, message }
        : notification
    ));
  };
  
  const handleTestNotification = (notification) => {
    // In a real app, send a test notification
    console.log(`Testing notification: ${notification.name}`);
  };
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <Button variant="outline">
            Test All Notifications
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">SMS Notifications</h3>
                <p className="text-sm text-gray-500">Available with upgrade</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Notification Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[120px] text-center">Email</TableHead>
                <TableHead className="w-[120px] text-center">Push</TableHead>
                <TableHead className="w-[120px] text-center">SMS</TableHead>
                <TableHead className="w-[120px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.name}</TableCell>
                  <TableCell>{notification.description}</TableCell>
                  <TableCell className="text-center">
                    <Switch 
                      checked={notification.email} 
                      onCheckedChange={() => handleToggleChannel(notification.id, 'email')}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch 
                      checked={notification.push} 
                      onCheckedChange={() => handleToggleChannel(notification.id, 'push')}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch 
                      checked={notification.sms} 
                      onCheckedChange={() => handleToggleChannel(notification.id, 'sms')}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTestNotification(notification)}
                    >
                      Test
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Notification Templates</h2>
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="font-medium mb-2">{notification.name}</h3>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Message Template</label>
                <Input
                  value={notification.message}
                  onChange={(e) => handleUpdateMessage(notification.id, e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-gray-500">
                Available variables: [NAME], [BUSINESS_NAME], [REWARD], [PROGRESS], [EXPIRY_DATE]
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
