
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Importe suas páginas
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Analytics from "@/pages/Analytics";

// Importe componentes da Central de Ajuda
import Support from "@/pages/Central de Ajuda/Support";
import Screenshots from "@/pages/Central de Ajuda/Screenshots";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/central-de-ajuda/support",
    element: <Support />,
  },
  {
    path: "/central-de-ajuda/screenshots",
    element: <Screenshots />,
  },
  // Redirecionamento para login como página padrão (temporário)
  {
    path: "/",
    element: <Login />,
  }
]);

export default router;
