
import React from "react";
import PageTransition from "@/components/PageTransition";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ImprovedLinksInterface from "@/components/usefullinks/ImprovedLinksInterface";

const UsefulLinks = () => {

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <ImprovedLinksInterface />
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default UsefulLinks;
