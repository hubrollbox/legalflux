// ... existing code ...

// In the RegisterForm component
const RegisterForm = () => {
  // ... existing state variables ...
  
  // Remove accountType from step 3 form state if it exists there
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      if (!validateStep1()) return;
    } else if (currentStep === 2) {
      // Validate step 2 fields
      if (!validateStep2()) return;
    } else if (currentStep === 3) {
      // Validate step 3 fields - don't check account type here since it was already selected
      if (!validateStep3()) return;
    }
    
    // If validation passes, move to next step
    setCurrentStep(currentStep + 1);
  };
  
  const validateStep3 = () => {
    // Remove account type validation from this function
    // Only validate other fields that should be in step 3
    
    // Example validation for other step 3 fields
    const requiredFields = ['companyName', 'industry', 'size'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    return true;
  };
  
  // In the render section for step 3
  const renderStep3 = () => {
    return (
      <div className="space-y-4">
        {/* Remove the account type selection here */}
        
        {/* Keep other step 3 fields */}
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
        
        {/* Other step 3 fields... */}
        
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
  
  // ... rest of the component ...
}

// ... existing code ...