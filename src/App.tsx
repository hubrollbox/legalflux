
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "sonner";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
