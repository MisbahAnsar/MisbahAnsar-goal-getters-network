
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DaySchedule {
  date: Date;
  workouts: {
    id: number;
    title: string;
    time: string;
    duration: string;
    type: string;
    color: string;
  }[];
}

const getWeekDays = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - day + (day === 0 ? -6 : 1)); // Adjust to Monday
  
  const weekDays: DaySchedule[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDays.push({
      date: currentDate,
      workouts: []
    });
  }
  
  // Add some sample workouts
  weekDays[0].workouts = [
    { id: 1, title: "Morning Yoga", time: "07:00 AM", duration: "30 min", type: "Yoga", color: "bg-blue-100 border-blue-300 text-blue-700" },
    { id: 2, title: "Evening Run", time: "06:30 PM", duration: "45 min", type: "Cardio", color: "bg-green-100 border-green-300 text-green-700" }
  ];
  
  weekDays[1].workouts = [];
  
  weekDays[2].workouts = [
    { id: 3, title: "HIIT Workout", time: "06:00 AM", duration: "25 min", type: "HIIT", color: "bg-red-100 border-red-300 text-red-700" },
    { id: 4, title: "Weight Training", time: "05:30 PM", duration: "60 min", type: "Strength", color: "bg-purple-100 border-purple-300 text-purple-700" }
  ];
  
  weekDays[3].workouts = [
    { id: 5, title: "Rest Day", time: "All day", duration: "0 min", type: "Rest", color: "bg-gray-100 border-gray-300 text-gray-700" }
  ];
  
  weekDays[4].workouts = [
    { id: 6, title: "Upper Body", time: "07:30 AM", duration: "45 min", type: "Strength", color: "bg-purple-100 border-purple-300 text-purple-700" }
  ];
  
  weekDays[5].workouts = [
    { id: 7, title: "Long Run", time: "08:00 AM", duration: "90 min", type: "Cardio", color: "bg-green-100 border-green-300 text-green-700" }
  ];
  
  weekDays[6].workouts = [
    { id: 8, title: "Recovery Yoga", time: "09:00 AM", duration: "60 min", type: "Yoga", color: "bg-blue-100 border-blue-300 text-blue-700" }
  ];
  
  return weekDays;
};

const Schedule = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [view, setView] = useState<'week' | 'month'>('week');
  const weekDays = getWeekDays(currentDate);
  
  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(today);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold text-fitness-navy">Training Schedule</h1>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={goToToday}>Today</Button>
          <Button variant="outline" size="icon" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select value={view} onValueChange={(val) => setView(val as 'week' | 'month')}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week view</SelectItem>
              <SelectItem value="month">Month view</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-lg font-semibold">
          {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {weekDays.map((day, index) => {
          const isToday = day.date.toDateString() === today.toDateString();
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day.date);
          const dayNumber = day.date.getDate();
          
          return (
            <div key={index} className="flex flex-col">
              <div className={`text-center p-2 rounded-t-md font-medium ${isToday ? 'bg-fitness-teal text-white' : 'bg-gray-100'}`}>
                <div className="text-xs">{dayName}</div>
                <div className={`text-lg ${isToday ? 'text-white' : 'text-fitness-navy'}`}>{dayNumber}</div>
              </div>
              
              <div className="border rounded-b-md min-h-[250px] p-1">
                {day.workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className={`mt-1 p-2 rounded-md border ${workout.color} text-xs cursor-pointer`}
                  >
                    <div className="font-medium">{workout.title}</div>
                    <div className="flex items-center mt-1 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {workout.time} • {workout.duration}
                    </div>
                  </div>
                ))}
                
                {day.workouts.length === 0 && (
                  <div className="h-full flex items-center justify-center text-xs text-gray-400 italic">
                    No workouts
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Workouts</CardTitle>
          <CardDescription>Next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weekDays
              .flatMap(day => 
                day.workouts.map(workout => ({ 
                  date: day.date, 
                  ...workout 
                }))
              )
              .sort((a, b) => a.date.getTime() - b.date.getTime() || 
                a.time.localeCompare(b.time)
              )
              .slice(0, 5)  // Limit to 5 workouts
              .map(workout => (
                <div key={workout.id} className="flex items-center gap-4 border-b pb-3">
                  <div className="bg-fitness-teal/10 w-12 h-12 rounded-md flex flex-col items-center justify-center">
                    <span className="text-xs text-fitness-teal">
                      {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(workout.date)}
                    </span>
                    <span className="text-lg font-semibold text-fitness-navy">{workout.date.getDate()}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{workout.title}</h4>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> {workout.time} • {workout.duration}
                    </div>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${workout.color}`}>
                      {workout.type}
                    </span>
                  </div>
                </div>
              ))
            }
            
            {weekDays.flatMap(day => day.workouts).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No upcoming workouts scheduled
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
