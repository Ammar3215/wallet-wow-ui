
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    logo: "/placeholder.svg"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true
  });
  
  const [integrations, setIntegrations] = useState({
    walletPassApiKey: "pk_test_123456789",
    walletPassSecret: "••••••••••••••••",
    googleWalletEnabled: true,
    appleWalletEnabled: true
  });
  
  const [teamMembers] = useState([
    { name: "John Smith", email: "john@example.com", role: "Admin", lastLogin: "2025-04-23" },
    { name: "Sarah Johnson", email: "sarah@example.com", role: "Editor", lastLogin: "2025-04-22" }
  ]);
  
  const [subscription] = useState({
    plan: "Pro",
    billingCycle: "Monthly",
    nextBillingDate: "2025-05-15",
    amount: "$39.00",
    status: "Active"
  });
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedBusinessName = localStorage.getItem("businessName");
    
    if (!isLoggedIn) {
      navigate("/partner-login");
      return;
    }
    
    // Set mock business info
    setBusinessInfo(prev => ({
      ...prev,
      name: storedBusinessName || "Partner Business"
    }));
    
  }, [navigate]);
  
  const handleBusinessInfoChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (field) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const handleIntegrationsChange = (e) => {
    const { name, value } = e.target;
    setIntegrations(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBusinessInfoSave = () => {
    // In a real app, this would call an API
    localStorage.setItem("businessName", businessInfo.name);
    toast.success("Business information saved successfully");
  };
  
  const handleNotificationSettingsSave = () => {
    // In a real app, this would call an API
    toast.success("Notification preferences saved");
  };
  
  const handleIntegrationsSave = () => {
    // In a real app, this would call an API
    toast.success("Integration settings saved");
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setBusinessInfo(prev => ({ ...prev, logo: imageUrl }));
    }
  };
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
        
        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="mb-2">
            <TabsTrigger value="business">Business Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Business Profile Tab */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your business details and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="text-sm font-medium mb-2">Business Logo</div>
                    <div className="w-32 h-32 relative">
                      <img 
                        src={businessInfo.logo || "/placeholder.svg"} 
                        alt="Business Logo" 
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <label htmlFor="logo-upload" className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 cursor-pointer">
                        Change Logo
                      </label>
                      <input 
                        id="logo-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">Business Name</label>
                      <Input 
                        id="name" 
                        name="name"
                        value={businessInfo.name} 
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">Business Email</label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={businessInfo.email} 
                        onChange={handleBusinessInfoChange}
                        placeholder="contact@yourbusiness.com"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">Business Phone</label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={businessInfo.phone} 
                        onChange={handleBusinessInfoChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="website" className="text-sm font-medium">Website</label>
                  <Input 
                    id="website" 
                    name="website"
                    value={businessInfo.website} 
                    onChange={handleBusinessInfoChange}
                    placeholder="https://your-business.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="address" className="text-sm font-medium">Business Address</label>
                  <Textarea 
                    id="address" 
                    name="address"
                    value={businessInfo.address} 
                    onChange={handleBusinessInfoChange}
                    placeholder="123 Main St, City, State, ZIP"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleBusinessInfoSave}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Current Plan</h3>
                      <p className="text-sm text-gray-500">Your current subscription status and details</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {subscription.status}
                    </Badge>
                  </div>
                  
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold text-blue-800">{subscription.plan}</h4>
                        <div className="text-2xl font-bold">{subscription.amount}</div>
                      </div>
                      <p className="text-blue-700 mb-2">Billed {subscription.billingCycle.toLowerCase()}</p>
                      <p className="text-sm text-blue-600">Next billing date: {subscription.nextBillingDate}</p>
                      <div className="mt-4">
                        <ul className="space-y-2">
                          <li className="flex items-center text-blue-900">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Unlimited Card Creation
                          </li>
                          <li className="flex items-center text-blue-900">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Campaign Management
                          </li>
                          <li className="flex items-center text-blue-900">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Advanced Analytics
                          </li>
                          <li className="flex items-center text-blue-900">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Customer Segmentation
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex gap-4 mt-6">
                    <Button className="flex-1">
                      Upgrade Plan
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Manage Payment Methods
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                  <div className="bg-white rounded-lg border">
                    <div className="p-4 flex justify-between items-center border-b">
                      <div>
                        <div className="font-medium">April 2025</div>
                        <div className="text-sm text-gray-500">Pro Plan - Monthly</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$39.00</div>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center border-b">
                      <div>
                        <div className="font-medium">March 2025</div>
                        <div className="text-sm text-gray-500">Pro Plan - Monthly</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$39.00</div>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">February 2025</div>
                        <div className="text-sm text-gray-500">Pro Plan - Monthly</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$39.00</div>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Pass Integrations</CardTitle>
                <CardDescription>
                  Configure your digital wallet integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="walletPassApiKey" className="text-sm font-medium">Wallet Pass API Key</label>
                    <Input 
                      id="walletPassApiKey" 
                      name="walletPassApiKey"
                      value={integrations.walletPassApiKey} 
                      onChange={handleIntegrationsChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="walletPassSecret" className="text-sm font-medium">Wallet Pass Secret</label>
                    <Input 
                      id="walletPassSecret" 
                      name="walletPassSecret"
                      type="password"
                      value={integrations.walletPassSecret} 
                      onChange={handleIntegrationsChange}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Enable Google Wallet Integration</div>
                    <Switch 
                      checked={integrations.googleWalletEnabled}
                      onCheckedChange={() => {
                        setIntegrations(prev => ({
                          ...prev, 
                          googleWalletEnabled: !prev.googleWalletEnabled
                        }));
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Enable Apple Wallet Integration</div>
                    <Switch 
                      checked={integrations.appleWalletEnabled}
                      onCheckedChange={() => {
                        setIntegrations(prev => ({
                          ...prev, 
                          appleWalletEnabled: !prev.appleWalletEnabled
                        }));
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleIntegrationsSave}>
                    Save Integration Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Template Defaults</CardTitle>
                <CardDescription>
                  Set default values for new loyalty cards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="defaultCardColor" className="text-sm font-medium">Default Card Color</label>
                    <div className="flex gap-4 items-center">
                      <input 
                        type="color" 
                        id="defaultCardColor" 
                        value="#3B82F6" 
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <Input type="text" value="#3B82F6" className="w-32 uppercase" />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="defaultCardType" className="text-sm font-medium">Default Card Type</label>
                    <select id="defaultCardType" className="border rounded-lg px-3 py-2">
                      <option value="stamp">Stamp Card</option>
                      <option value="points">Points System</option>
                      <option value="visits">Visit Counter</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="defaultExpiration" className="text-sm font-medium">Default Expiration (days)</label>
                    <Input id="defaultExpiration" type="number" min="0" value="90" />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Template Defaults</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Team Members Tab */}
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage who has access to your business account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Current Team ({teamMembers.length})</h3>
                    <Button>
                      Invite Team Member
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {teamMembers.map((member, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                  {member.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                  <div className="text-sm text-gray-500">{member.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge variant={member.role === "Admin" ? "default" : "outline"} className="font-normal">
                                {member.role}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member.lastLogin}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                              <Button variant="outline" size="sm" className="mr-2">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                    <p>Team members can help you manage your loyalty cards, campaigns, and customer data. Different roles have different permissions:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li><span className="font-medium">Admin:</span> Full access to all features and settings</li>
                      <li><span className="font-medium">Editor:</span> Can create and edit cards and campaigns, but cannot modify billing or team settings</li>
                      <li><span className="font-medium">Viewer:</span> Read-only access to cards, campaigns and analytics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Card Activity Summaries</div>
                        <div className="text-sm text-gray-500">Receive daily/weekly summaries of card activity</div>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleToggleChange('emailNotifications')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-gray-500">Receive tips, best practices and feature updates</div>
                      </div>
                      <Switch 
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={() => handleToggleChange('marketingEmails')}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Push Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Real-time Card Scans</div>
                        <div className="text-sm text-gray-500">Get notified when a customer scans your card</div>
                      </div>
                      <Switch 
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => handleToggleChange('pushNotifications')}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleNotificationSettingsSave}>
                      Save Notification Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
