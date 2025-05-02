
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Páginas de Autenticação
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Páginas da Aplicação
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Integrations from "./pages/Integrations";

// Páginas de Central de Ajuda
import Support from "./pages/Central de Ajuda/Support";
import Screenshots from "./pages/Central de Ajuda/Screenshots";

// Páginas Landing
import LandingPage from "./pages/landing/LandingPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/integrations",
    element: <Integrations />,
  },
  {
    path: "/central-de-ajuda/support",
    element: <Support />,
  },
  {
    path: "/central-de-ajuda/screenshots",
    element: <Screenshots />,
  },
  // Página inicial é a Landing Page
  {
    path: "/",
    element: <LandingPage />,
  }
]);

export default router;
