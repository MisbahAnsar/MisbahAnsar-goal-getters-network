
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoalCard from "@/components/ui/GoalCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Goals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const activeGoals = [
    { title: "Run 5K", description: "Improve endurance and prepare for charity run", progress: 65, category: "Cardio" },
    { title: "Bench Press 200lbs", description: "Increase upper body strength", progress: 40, category: "Strength" },
    { title: "Lose 10lbs", description: "Reduce body fat percentage", progress: 80, category: "Weight Loss" },
  ];
  
  const completedGoals = [
    { title: "30-Day Yoga Challenge", description: "Complete daily yoga sessions for a month", progress: 100, category: "Yoga" },
    { title: "Run 10,000 Steps Daily", description: "Build the habit of getting 10k steps per day", progress: 100, category: "Cardio" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-fitness-navy">Goals</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fitness-teal hover:bg-fitness-teal/90">
              <Plus className="h-4 w-4 mr-2" /> Create Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Define a new fitness goal to track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input id="goal-title" placeholder="e.g. Run 5K, Lose 10lbs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-description">Description</Label>
                <Textarea id="goal-description" placeholder="Describe your goal and why it matters to you" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-category">Category</Label>
                  <Select>
                    <SelectTrigger id="goal-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="weightloss">Weight Loss</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-target-date">Target Date</Label>
                  <Input id="goal-target-date" type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-fitness-teal hover:bg-fitness-teal/90">Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Active Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Active Goals</CardTitle>
          <CardDescription>Goals you're currently working towards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGoals.map((goal, index) => (
              <GoalCard
                key={index}
                title={goal.title}
                description={goal.description}
                progress={goal.progress}
                category={goal.category}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Completed Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Goals</CardTitle>
          <CardDescription>Goals you've successfully achieved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedGoals.map((goal, index) => (
              <GoalCard
                key={index}
                title={goal.title}
                description={goal.description}
                progress={goal.progress}
                category={goal.category}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goal Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Goals</CardTitle>
          <CardDescription>Personalized recommendations based on your interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4 hover:border-fitness-teal/50 hover:bg-fitness-teal/5 transition-colors cursor-pointer">
              <h3 className="font-medium mb-2">Complete 30 Push-ups Daily</h3>
              <p className="text-sm text-gray-600 mb-3">Build upper body strength with a daily pushup routine</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-fitness-teal/10 text-fitness-teal px-2 py-0.5 rounded-full">
                  Strength
                </span>
                <Button variant="outline" size="sm">Add Goal</Button>
              </div>
            </div>
            <div className="border rounded-md p-4 hover:border-fitness-teal/50 hover:bg-fitness-teal/5 transition-colors cursor-pointer">
              <h3 className="font-medium mb-2">Drink 8 Glasses of Water Daily</h3>
              <p className="text-sm text-gray-600 mb-3">Stay hydrated and improve overall health</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-fitness-teal/10 text-fitness-teal px-2 py-0.5 rounded-full">
                  Nutrition
                </span>
                <Button variant="outline" size="sm">Add Goal</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Goals;
