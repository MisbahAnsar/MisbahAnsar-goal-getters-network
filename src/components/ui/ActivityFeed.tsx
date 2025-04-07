
import { CheckCircle, Dumbbell, Heart, MessageCircle, ThumbsUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Activity {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  type: 'workout' | 'goal' | 'achievement' | 'connection';
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workout':
        return <Dumbbell className="h-4 w-4" />;
      case 'goal':
        return <Heart className="h-4 w-4" />;
      case 'achievement':
        return <CheckCircle className="h-4 w-4" />;
      case 'connection':
        return <Users className="h-4 w-4" />;
      default:
        return <Dumbbell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="fitness-card">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="mr-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={activity.user.avatarUrl}
                    alt={activity.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="font-medium text-fitness-navy">
                  {activity.user.name}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="flex items-center mr-1">
                    {getActivityIcon(activity.type)}
                  </span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{activity.content}</p>
            <div className="flex items-center justify-between border-t border-fitness-gray/20 pt-3">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center text-gray-500 hover:text-fitness-teal">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{activity.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center text-gray-500 hover:text-fitness-teal">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{activity.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-fitness-teal">
                View details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
