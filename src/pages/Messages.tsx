
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import ChatInterface from "@/components/messages/ChatInterface";

const Messages = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header mb-6">
        <SectionHeader
          title="Mensagens"
          description="Gerencie as suas comunicações com clientes e colegas"
        />
      </div>

      <ChatInterface />
    </DashboardLayout>
  );
};

export default Messages;
