
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";

interface DashboardHeaderProps {
  userName: string;
  userRole: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, userRole }) => {
  return (
    <div className="dashboard-header">
      <div>
        <h1 className="page-title">Painel de Controlo</h1>
        <p className="text-gray-500">
          Bem-vindo(a), {userName} ({userRole})
        </p>
      </div>
      <div className="space-x-2">
        <Button variant="outline">Relatórios</Button>
        <DatePickerWithRange />
      </div>
    </div>
  );
};

export default DashboardHeader;
