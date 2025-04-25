
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const CreateCard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    logo: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    cardType: "stamp",
    rewardType: "free_item",
    rewardDescription: "",
    stampCount: 10,
    expirationDays: 90,
    customMessage: "",
  });
  
  const navigate = useNavigate();
  
  const totalSteps = 6;
  
  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // In a real app, you would submit the form data to your backend
    toast.success("Card created successfully!");
    navigate("/dashboard");
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Upload Logo & Business Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Logo</label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-gray-400">Logo</span>
                    )}
                  </div>
                  <Button type="button" variant="outline">
                    Upload Logo
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended: 512x512px PNG or SVG
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium mb-1">Business Name</label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                    placeholder="Coffee Corner"
                  />
                </div>
                
                <div>
                  <label htmlFor="businessEmail" className="block text-sm font-medium mb-1">Business Email</label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => updateField("businessEmail", e.target.value)}
                    placeholder="contact@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="businessPhone" className="block text-sm font-medium mb-1">Business Phone (optional)</label>
                  <Input
                    id="businessPhone"
                    value={formData.businessPhone}
                    onChange={(e) => updateField("businessPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Customize Card Design</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium mb-1">Primary Color</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="color"
                    id="primaryColor"
                    value={formData.primaryColor}
                    onChange={(e) => updateField("primaryColor", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => updateField("primaryColor", e.target.value)}
                    className="uppercase"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium mb-1">Secondary Color</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={(e) => updateField("secondaryColor", e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <Input
                    value={formData.secondaryColor}
                    onChange={(e) => updateField("secondaryColor", e.target.value)}
                    className="uppercase"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Layout Style</label>
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer border-2 ${
                      formData.cardType === "stamp" ? "border-brand-blue" : "border-gray-200"
                    }`}
                    onClick={() => updateField("cardType", "stamp")}
                  >
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center mb-2">
                        <div className="grid grid-cols-5 gap-1">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-full bg-gray-300"></div>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm font-medium">Stamp Grid</span>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border-2 ${
                      formData.cardType === "points" ? "border-brand-blue" : "border-gray-200"
                    }`}
                    onClick={() => updateField("cardType", "points")}
                  >
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center mb-2">
                        <div className="w-full px-2">
                          <div className="h-4 bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium">Points Bar</span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Set Loyalty Logic</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Reward Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer border-2 ${
                      formData.rewardType === "free_item" ? "border-brand-blue" : "border-gray-200"
                    }`}
                    onClick={() => updateField("rewardType", "free_item")}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium">Free Item</h3>
                      <p className="text-sm text-gray-500">Reward customers with a free product</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border-2 ${
                      formData.rewardType === "discount" ? "border-brand-blue" : "border-gray-200"
                    }`}
                    onClick={() => updateField("rewardType", "discount")}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium">Discount</h3>
                      <p className="text-sm text-gray-500">Offer a percentage or fixed discount</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {formData.cardType === "stamp" && (
                <div>
                  <label htmlFor="stampCount" className="block text-sm font-medium mb-1">
                    Number of stamps needed for reward
                  </label>
                  <Input
                    id="stampCount"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.stampCount}
                    onChange={(e) => updateField("stampCount", parseInt(e.target.value))}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="rewardDescription" className="block text-sm font-medium mb-1">
                  Reward Description
                </label>
                <Input
                  id="rewardDescription"
                  placeholder="e.g., One free coffee of your choice"
                  value={formData.rewardDescription}
                  onChange={(e) => updateField("rewardDescription", e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="expirationDays" className="block text-sm font-medium mb-1">
                  Card Expiration (days)
                </label>
                <Input
                  id="expirationDays"
                  type="number"
                  min="0"
                  placeholder="Leave empty for no expiration"
                  value={formData.expirationDays}
                  onChange={(e) => updateField("expirationDays", parseInt(e.target.value))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Set to 0 for no expiration
                </p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Personalization Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="customMessage" className="block text-sm font-medium mb-1">
                  Custom Message to Customer
                </label>
                <Input
                  id="customMessage"
                  placeholder="e.g., Thanks for your loyalty!"
                  value={formData.customMessage}
                  onChange={(e) => updateField("customMessage", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This message will be displayed on the digital card
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="captureCustomerName"
                  className="h-4 w-4 text-brand-blue rounded border-gray-300"
                />
                <label htmlFor="captureCustomerName" className="ml-2 block text-sm">
                  Capture customer's name (will be displayed on card)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="captureCustomerEmail"
                  className="h-4 w-4 text-brand-blue rounded border-gray-300"
                />
                <label htmlFor="captureCustomerEmail" className="ml-2 block text-sm">
                  Capture customer's email (for notifications)
                </label>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Preview Card</h2>
            <div className="flex justify-center">
              <div className="w-72 h-[434px] rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
                <div 
                  className="h-12 flex items-center justify-between px-4"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  <div className="h-8 w-8 rounded-full bg-white"></div>
                  <div className="text-white font-semibold">
                    {formData.businessName || "Coffee Corner"}
                  </div>
                  <div className="h-8 w-8"></div>
                </div>
                
                <div className="p-4">
                  <div className="mb-6 text-center">
                    <h3 className="font-semibold text-lg">Loyalty Card</h3>
                    <p className="text-sm text-gray-600">
                      {formData.rewardDescription || "Collect stamps for a free reward"}
                    </p>
                  </div>
                  
                  {formData.cardType === "stamp" ? (
                    <div className="grid grid-cols-5 gap-3 mb-6">
                      {Array.from({ length: formData.stampCount }).map((_, i) => (
                        <div 
                          key={i} 
                          className="aspect-square rounded-full flex items-center justify-center border-2"
                          style={{ borderColor: formData.secondaryColor }}
                        >
                          {i < 3 && (
                            <div 
                              className="w-3/4 h-3/4 rounded-full"
                              style={{ backgroundColor: formData.secondaryColor }}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="h-4 w-full rounded-full bg-gray-200 mb-1">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: "30%", 
                            backgroundColor: formData.secondaryColor
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>0 points</span>
                        <span>100 points</span>
                      </div>
                    </div>
                  )}
                  
                  {formData.customMessage && (
                    <div className="text-center text-sm mb-6">
                      {formData.customMessage}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 text-center">
                    {formData.expirationDays > 0 ? (
                      <p>Valid for {formData.expirationDays} days from activation</p>
                    ) : (
                      <p>No expiration date</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Generate QR Code</h2>
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-36 h-36 bg-gray-300 rounded">
                  <div className="h-full w-full flex items-center justify-center">
                    <QrCode />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <p>Customers can scan this QR code to add your loyalty card to their digital wallet.</p>
            </div>
            
            <div className="border-t border-b py-6 space-y-4">
              <h3 className="font-medium">Share QR Code</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <Download className="h-5 w-5 mb-1" />
                  <span className="text-xs">Download PNG</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <Download className="h-5 w-5 mb-1" />
                  <span className="text-xs">Download SVG</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <Share2 className="h-5 w-5 mb-1" />
                  <span className="text-xs">Share Link</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <QrCode className="h-5 w-5 mb-1" />
                  <span className="text-xs">Embed Code</span>
                </Button>
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSubmit} className="w-full">
                Save & Publish Card
              </Button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                You can edit or deactivate your card at any time
              </p>
            </div>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Create New Loyalty Card</h1>
          <div className="flex items-center">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i + 1 === step
                      ? "bg-brand-blue text-white"
                      : i + 1 < step
                      ? "bg-brand-green text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`w-12 h-1 ${
                      i + 1 < step ? "bg-brand-green" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {step < totalSteps ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Save & Publish
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateCard;
