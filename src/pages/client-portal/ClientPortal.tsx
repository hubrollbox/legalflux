import { Outlet } from 'react-router-dom';
import ClientPortalSidebar from './components/ClientPortalSidebar';

const ClientPortal = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientPortalSidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientPortal;