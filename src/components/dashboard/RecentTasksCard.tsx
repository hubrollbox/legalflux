
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PriorityBadge from "@/components/dashboard/PriorityBadge";
import { RecentTask } from "./types";

interface RecentTasksCardProps {
  tasks: RecentTask[];
}

const RecentTasksCard: React.FC<RecentTasksCardProps> = ({ tasks }) => {
  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle className="">Tarefas Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {tasks.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={item.assignedToAvatar}
                    alt={item.assignedToName}
                  />
                  <AvatarFallback>
                    {item.assignedToName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Atribuído a {item.assignedToName}
                  </p>
                </div>
              </div>
              <PriorityBadge priority={item.priority} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentTasksCard;
