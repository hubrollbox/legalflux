
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { RecentCase } from "./types";

interface RecentCasesCardProps {
  cases: RecentCase[];
}

const RecentCasesCard: React.FC<RecentCasesCardProps> = ({ cases }) => {
  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="">Casos Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {cases.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={item.clientAvatar} alt={item.clientName} />
                  <AvatarFallback>{item.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.clientName}</p>
                </div>
              </div>
              <StatusBadge status={item.status} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentCasesCard;
