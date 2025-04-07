
import { useState } from "react";
import { Activity, Calendar, Clock, Dumbbell, Filter, PlayCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WorkoutCard from "@/components/ui/WorkoutCard";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const popularWorkouts = [
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
    },
    {
      title: "Yoga Flow",
      duration: "60 min",
      level: "Beginner",
      category: "Yoga",
      imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    },
    {
      title: "Core Strength",
      duration: "20 min",
      level: "Intermediate",
      category: "Strength",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
  ];
  
  const recentWorkouts = [
    {
      title: "Morning Stretch",
      duration: "15 min",
      level: "Beginner",
      category: "Yoga",
      imageUrl: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1526&q=80"
    },
    {
      title: "Leg Day",
      duration: "40 min",
      level: "Advanced",
      category: "Strength",
      imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fitness-navy mb-6">Workouts</h1>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search workouts..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Duration
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Activity className="h-4 w-4" /> Level
            </Button>
          </div>
        </div>

        {/* Workout categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="bg-fitness-teal/10 p-3 rounded-full mb-2">
              <Dumbbell className="h-6 w-6 text-fitness-teal" />
            </div>
            <span className="text-fitness-navy font-medium">Strength</span>
            <span className="text-xs text-gray-500">24 workouts</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="bg-fitness-teal/10 p-3 rounded-full mb-2">
              <Activity className="h-6 w-6 text-fitness-teal" />
            </div>
            <span className="text-fitness-navy font-medium">Cardio</span>
            <span className="text-xs text-gray-500">18 workouts</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="bg-fitness-teal/10 p-3 rounded-full mb-2">
              <Calendar className="h-6 w-6 text-fitness-teal" />
            </div>
            <span className="text-fitness-navy font-medium">Yoga</span>
            <span className="text-xs text-gray-500">12 workouts</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="bg-fitness-teal/10 p-3 rounded-full mb-2">
              <PlayCircle className="h-6 w-6 text-fitness-teal" />
            </div>
            <span className="text-fitness-navy font-medium">HIIT</span>
            <span className="text-xs text-gray-500">10 workouts</span>
          </Card>
        </div>
        
        {/* Popular workouts */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-fitness-navy">Popular Workouts</h2>
            <a href="#" className="text-sm text-fitness-teal hover:underline">View all</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularWorkouts.map((workout, index) => (
              <WorkoutCard
                key={index}
                title={workout.title}
                duration={workout.duration}
                level={workout.level}
                category={workout.category}
                imageUrl={workout.imageUrl}
              />
            ))}
          </div>
        </div>
        
        {/* Your recent workouts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-fitness-navy">Your Recent Workouts</h2>
            <a href="#" className="text-sm text-fitness-teal hover:underline">View history</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentWorkouts.map((workout, index) => (
              <WorkoutCard
                key={index}
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
    </div>
  );
};

export default Workouts;
