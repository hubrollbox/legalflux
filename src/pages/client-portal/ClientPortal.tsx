
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ClientPortalSidebar from './components/ClientPortalSidebar';
import PageTransition from '@/components/PageTransition';
import { Toaster } from '@/components/ui/toaster';

const ClientPortal = () => {
  const { user } = useAuth();
  
  return (
    <PageTransition>
      <div className="flex min-h-screen bg-gray-50">
        <ClientPortalSidebar />
        <div className="flex-1 p-8">
          {user && (
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Bem-vindo ao seu Portal Jurídico, {user.name}
              </h1>
              <p className="text-gray-600">
                Acompanhe os seus processos jurídicos, comunique com a sua equipa legal e aceda aos seus documentos de forma segura.
              </p>
            </div>
          )}
          <Outlet />
        </div>
      </div>
      <Toaster />
    </PageTransition>
  );
};

export default ClientPortal;
