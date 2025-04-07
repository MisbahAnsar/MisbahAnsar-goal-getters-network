
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface GoalCardProps {
  title: string;
  description: string;
  progress: number;
  category: string;
}

const GoalCard = ({ title, description, progress, category }: GoalCardProps) => {
  return (
    <div className="fitness-card">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-fitness-navy">{title}</h3>
          <Badge className="bg-fitness-teal/20 text-fitness-teal hover:bg-fitness-teal/30">
            {category}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-fitness-teal/20" />
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
