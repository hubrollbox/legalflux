import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar would go here */}
        <div className="hidden md:block w-64 bg-card border-r border-gray-200 min-h-screen">
          {/* Sidebar content */}
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header would go here */}
          <header className="h-16 border-b border-gray-200 bg-card flex items-center px-6">
            {/* Header content */}
          </header>
          
          {/* Page content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
