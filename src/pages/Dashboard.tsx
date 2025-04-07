
import { Activity, Dumbbell, Heart, Users } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import GoalCard from "@/components/ui/GoalCard";
import WorkoutCard from "@/components/ui/WorkoutCard";
import UserCard from "@/components/ui/UserCard";

const Dashboard = () => {
  // Mock data
  const stats = [
    { title: "Workouts Completed", value: 24, icon: <Dumbbell className="h-5 w-5" />, trend: { value: 12, isPositive: true } },
    { title: "Active Goals", value: 3, icon: <Heart className="h-5 w-5" />, trend: { value: 0, isPositive: true } },
    { title: "Connections", value: 18, icon: <Users className="h-5 w-5" />, trend: { value: 5, isPositive: true } },
    { title: "Weekly Activity", value: "7.2 hrs", icon: <Activity className="h-5 w-5" />, trend: { value: 3, isPositive: true } },
  ];

  const goals = [
    { title: "Run 5K", description: "Improve endurance and prepare for charity run", progress: 65, category: "Cardio" },
    { title: "Bench Press 200lbs", description: "Increase upper body strength", progress: 40, category: "Strength" },
    { title: "Lose 10lbs", description: "Reduce body fat percentage", progress: 80, category: "Weight Loss" },
  ];

  const recentWorkouts = [
    {
      title: "Upper Body Strength",
      duration: "45 min",
      level: "Intermediate",
      category: "Strength",
      imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    },
    {
      title: "HIIT Cardio",
      duration: "30 min",
      level: "Advanced",
      category: "Cardio",
      imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
    }
  ];

  const suggestedConnections = [
    {
      name: "Ankit kumar",
      goals: ["Weight Loss", "Cardio"],
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      mutualConnections: 3
    },
    {
      name: "Harkirat singh",
      goals: ["Strength Training", "Nutrition"],
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      mutualConnections: 1
    },
    {
      name: "Manu paaji",
      goals: ["Marathon Training", "Flexibility"],
      avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg",
      mutualConnections: 0
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-fitness-navy mb-6">Dashboard</h1>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
        
        {/* Two column layout for goals and workouts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-fitness-navy">Your Goals</h2>
                <a href="/goals" className="text-sm text-fitness-teal hover:underline">View all</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <GoalCard
                    key={goal.title}
                    title={goal.title}
                    description={goal.description}
                    progress={goal.progress}
                    category={goal.category}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-fitness-navy">Recent Workouts</h2>
                <a href="/workouts" className="text-sm text-fitness-teal hover:underline">View all</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.title}
                    title={workout.title}
                    duration={workout.duration}
                    level={workout.level}
                    category={workout.category}
                    imageUrl={workout.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-fitness-navy mb-4">Suggested Connections</h2>
              <div className="space-y-3">
                {suggestedConnections.map((user) => (
                  <UserCard
                    key={user.name}
                    name={user.name}
                    goals={user.goals}
                    avatarUrl={user.avatarUrl}
                    mutualConnections={user.mutualConnections}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
