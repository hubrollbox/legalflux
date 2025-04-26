import { useState } from 'react';
import { Input } from "../components/Input"; // Assuming you are using a baseUrl or path alias for '@' pointing to 'src'
import { validateEmail } from "../utils/validation";

// Main Register component
const Register = () => {
  const [formData] = useState<{ username?: string; email?: string; password?: string; fullName?: string }>({});

  return (
    <>
      <Input
        id="username"
        value={formData.username || ""}
        disabled
        className="bg-gray-100"
      />
      {/* Add more form fields and a submit button */}
    </>
  );
};

export default Register;

// tsconfig.json
{
  "compilerOptions": {
    // Other options
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
