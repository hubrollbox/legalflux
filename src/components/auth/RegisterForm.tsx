import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// In the RegisterForm component
const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string>('');
  
  // Fix the form state initialization to properly handle all steps
  const [formData, setFormData] = useState({
    // Step 1 fields
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2 fields
    firstName: '',
    lastName: '',
    phone: '',
    
    // Step 3 fields - accountType is set in step 1 or 2, not here
    companyName: '',
    industry: '',
    size: '',
    
    // Step 4 fields
    terms: false,
    privacy: false,
  });
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      if (!validateStep1()) return;
    } else if (currentStep === 2) {
      // Validate step 2 fields
      if (!validateStep2()) return;
    } else if (currentStep === 3) {
      // Validate step 3 fields - don't check account type here
      if (!validateStep3()) return;
    }
    
    // If validation passes, move to next step
    setCurrentStep(currentStep + 1);
  };
  
  const validateStep1 = () => {
    // Add proper validation for step 1
    const { email, password, confirmPassword } = formData;
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    // Clear any previous errors
    setError('');
    return true;
  };
  
  const validateStep2 = () => {
    // Add proper validation for step 2
    const { firstName, lastName, phone } = formData;
    
    if (!firstName || !lastName || !phone) {
      setError('Please fill in all required fields');
      return false;
    }
    
    // Clear any previous errors
    setError('');
    return true;
  };
  
  const validateStep3 = () => {
    // Validate step 3 fields - don't check account type
    const { companyName, industry, size } = formData;
    
    if (!companyName || !industry || !size) {
      setError('Please fill in all required fields');
      return false;
    }
    
    // Clear any previous errors
    setError('');
    return true;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // In the render section for step 3
  const renderStep3 = () => {
    return (
      <div className="space-y-4">
        {/* Company information fields */}
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select 
            onValueChange={(value) => setFormData({...formData, industry: value})}
            value={formData.industry}
          >
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="size">Company Size</Label>
          <Select 
            onValueChange={(value) => setFormData({...formData, size: value})}
            value={formData.size}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="500+">500+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={handlePreviousStep}>
            Back
          </Button>
          <Button type="button" onClick={handleNextStep}>
            Next
          </Button>
        </div>
      </div>
    );
  };
  
  // Add the main render function
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
      
      {currentStep === 1 && (
        <div className="space-y-4">
          {/* Step 1 fields */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <Button type="button" onClick={handleNextStep} className="w-full">
            Next
          </Button>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="space-y-4">
          {/* Step 2 fields */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </div>
      )}
      
      {currentStep === 3 && renderStep3()}
      
      {currentStep === 4 && (
        <div className="space-y-4">
          {/* Step 4 fields */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className="rounded border-gray-300"
              />
              <Label htmlFor="terms">I agree to the Terms of Service</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={formData.privacy}
                onChange={handleInputChange}
                className="rounded border-gray-300"
              />
              <Label htmlFor="privacy">I agree to the Privacy Policy</Label>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button type="button" variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button type="button" onClick={() => console.log('Form submitted', formData)}>
              Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;