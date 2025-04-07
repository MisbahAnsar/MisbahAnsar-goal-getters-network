
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface UserCardProps {
  name: string;
  goals: string[];
  avatarUrl: string;
  mutualConnections: number;
}

const UserCard = ({ name, goals, avatarUrl, mutualConnections }: UserCardProps) => {
  return (
    <div className="border rounded-md p-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500">
            {goals[0]}{goals.length > 1 ? `, ${goals[1]}` : ""}
          </div>
          {mutualConnections > 0 && (
            <div className="text-xs text-fitness-teal">
              {mutualConnections} mutual connection{mutualConnections > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-fitness-teal hover:bg-fitness-teal/10"
      >
        <UserPlus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserCard;
