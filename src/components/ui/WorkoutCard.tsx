
import { Calendar, Clock, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutCardProps {
  title: string;
  duration: string;
  level: string;
  category: string;
  imageUrl: string;
}

const WorkoutCard = ({ title, duration, level, category, imageUrl }: WorkoutCardProps) => {
  return (
    <div className="fitness-card">
      <div className="h-40 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block bg-fitness-navy/80 text-white text-xs px-2 py-1 rounded">
            {level}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-fitness-navy">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Dumbbell className="h-4 w-4 mr-1" />
          <span>{category}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule
          </Button>
          <Button size="sm" className="bg-fitness-teal hover:bg-fitness-teal/90">
            Start Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
