
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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
