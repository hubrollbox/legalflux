
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface FinancialOverviewChartProps {
  data: { name: string; revenue: number; expenses: number }[];
}

const FinancialOverviewChart: React.FC<FinancialOverviewChartProps> = ({
  data,
}) => {
  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="">Visão Geral Financeira</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#82ca9d" />
            <Bar dataKey="expenses" fill="#d88484" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FinancialOverviewChart;
