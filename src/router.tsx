
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Routes configuration
const router = createBrowserRouter([], {
  future: {
    v7_normalizeFormMethod: true,
    v7_relativeSplatPath: true,
    v7_startTransition: true
  }
});

// Layouts
import AuthLayout from "./components/auth/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

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
import Processes from "./pages/Processes";
import Clients from "./pages/Clients";
import Documents from "./pages/Documents";
import Calendar from "./pages/Calendar";
import Financial from "./pages/Financial";
import UserManagement from "./pages/client-portal/UserManagement";
import NotFound from "./pages/NotFound";

// Páginas Portal do Cliente
import ClientPortal from "./pages/client-portal/ClientPortal";
import ProcessesPage from "./pages/client-portal/ProcessesPage";
import DocumentsPage from "./pages/client-portal/DocumentsPage";
import BillingPage from "./pages/client-portal/BillingPage";
import CommunicationsPage from "./pages/client-portal/CommunicationsPage";
import ProfilePage from "./pages/client-portal/ProfilePage";

// Páginas de Central de Ajuda
import Support from "./pages/Central de Ajuda/Support";
import Screenshots from "./pages/Central de Ajuda/Screenshots";

// Páginas Landing
import LandingPage from "./pages/landing/LandingPage";

// ProtectedRoute
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { UserRole } from "./types/permissions";

// Routes configuration
const routes = [
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
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/processos",
    element: <ProtectedRoute><Processes /></ProtectedRoute>,
  },
  {
    path: "/clientes",
    element: <ProtectedRoute><Clients /></ProtectedRoute>,
  },
  {
    path: "/documentos",
    element: <ProtectedRoute><Documents /></ProtectedRoute>,
  },
  {
    path: "/calendario",
    element: <ProtectedRoute><Calendar /></ProtectedRoute>,
  },
  {
    path: "/financeiro",
    element: <ProtectedRoute><Financial /></ProtectedRoute>,
  },
  {
    path: "/analytics",
    element: <ProtectedRoute><Analytics /></ProtectedRoute>,
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
    element: <ProtectedRoute><Integrations /></ProtectedRoute>,
  },
  {
    path: "/gestao-utilizadores",
    element: <ProtectedRoute><UserManagement /></ProtectedRoute>,
  },
  {
    path: "/central-de-ajuda/support",
    element: <Support />,
  },
  {
    path: "/central-de-ajuda/screenshots",
    element: <Screenshots />,
  },
  {
    path: "/central-de-ajuda/docs",
    element: <Support />,
  },
  {
    path: "/central-de-ajuda/faqs",
    element: <Support />,
  },
  {
    path: "/central-de-ajuda/tutorials",
    element: <Support />,
  },
  {
    path: "/about",
    element: <LandingPage />,
  },
  {
    path: "/contact",
    element: <LandingPage />,
  },
  {
    path: "/terms",
    element: <LandingPage />,
  },
  {
    path: "/privacy",
    element: <LandingPage />,
  },
  {
    path: "/client-portal",
    element: <ProtectedRoute><ClientPortal /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/client-portal/processes" replace /> },
      { path: "processes", element: <ProcessesPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "billing", element: <BillingPage /> },
      { path: "communications", element: <CommunicationsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ]
  },
  // Redirecionar caminhos antigos
  {
    path: "/portal-cliente/*",
    element: <Navigate to="/client-portal" replace />
  },
  // Página inicial é a Landing Page
  {
    path: "/",
    element: <LandingPage />
  },
  // Rota para 404
  {
    path: "*",
    element: <NotFound />,
  },
]); // Add missing comma after routes array

export default router;
