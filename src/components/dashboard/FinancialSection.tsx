
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/layout/SectionHeader";
import FinancialOverviewChart from "./FinancialOverviewChart";

interface FinancialSectionProps {
  financialData: { name: string; revenue: number; expenses: number }[];
}

const FinancialSection: React.FC<FinancialSectionProps> = ({ financialData }) => {
  return (
    <>
      <SectionHeader title="Finanças" description="Receitas e despesas">
        <Button variant="outline">Ver Detalhes</Button>
      </SectionHeader>

      <FinancialOverviewChart data={financialData} />
    </>
  );
};

export default FinancialSection;
