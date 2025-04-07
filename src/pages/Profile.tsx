
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, User, Heart, Edit, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  fitness_level: string | null;
  goals: string[] | null;
  phone_number: string | null;
}

interface WorkoutCategory {
  id: string;
  name: string;
}

const Profile = () => {
  const { user, session } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userWorkouts, setUserWorkouts] = useState<WorkoutCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchUserWorkouts();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        throw error;
      }

      setProfileData(data as ProfileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: "Unable to load your profile information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserWorkouts = async () => {
    try {
      // Get the workout categories for this user
      const { data: userWorkoutData, error: userWorkoutError } = await supabase
        .from('user_workouts')
        .select('category_id')
        .eq('user_id', user?.id);

      if (userWorkoutError) throw userWorkoutError;

      if (!userWorkoutData || userWorkoutData.length === 0) {
        // If the user doesn't have any workouts yet, create some dummy ones
        await createDummyWorkouts();
        return;
      }

      // Extract category IDs
      const categoryIds = userWorkoutData.map(uw => uw.category_id);
      
      // Get the details of these categories
      const { data: categoryData, error: categoryError } = await supabase
        .from('workout_categories')
        .select('id, name')
        .in('id', categoryIds);

      if (categoryError) throw categoryError;
      
      if (categoryData) {
        setUserWorkouts(categoryData as WorkoutCategory[]);
      }
    } catch (error) {
      console.error('Error fetching user workouts:', error);
      toast({
        title: "Error loading workouts",
        description: "Unable to load your workout information.",
        variant: "destructive",
      });
    }
  };

  const createDummyWorkouts = async () => {
    try {
      // Get some workout categories
      const { data: categoryData, error: categoryError } = await supabase
        .from('workout_categories')
        .select('id, name')
        .limit(3);

      if (categoryError) throw categoryError;
      
      if (categoryData && categoryData.length > 0) {
        // Create user workout entries for each category
        const userWorkoutsToInsert = categoryData.map(category => ({
          user_id: user?.id,
          category_id: category.id
        }));
        
        await supabase
          .from('user_workouts')
          .insert(userWorkoutsToInsert);
          
        // Fetch the workouts again
        fetchUserWorkouts();
      }
    } catch (error) {
      console.error('Error creating dummy workouts:', error);
    }
  };

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-fitness-teal">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fitness-navy mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-fitness-navy">Profile Overview</CardTitle>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                </div>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-3">
                      <AvatarImage src={profileData?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt={profileData?.full_name || 'User'} />
                      <AvatarFallback>{profileData?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1 font-medium">{profileData?.full_name || 'Fitness Enthusiast'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 font-medium">{profileData?.email || user.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Fitness Level</h3>
                      <p className="mt-1 font-medium">{profileData?.fitness_level || 'Beginner'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                      <p className="mt-1">{profileData?.bio || 'No bio added yet. Tell us about yourself and your fitness journey!'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-fitness-navy">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-fitness-teal/10 p-2 rounded-full">
                      <Dumbbell className="h-4 w-4 text-fitness-teal" />
                    </div>
                    <span>Workouts</span>
                  </div>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-fitness-teal/10 p-2 rounded-full">
                      <User className="h-4 w-4 text-fitness-teal" />
                    </div>
                    <span>Connections</span>
                  </div>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-fitness-teal/10 p-2 rounded-full">
                      <Heart className="h-4 w-4 text-fitness-teal" />
                    </div>
                    <span>Goals Achieved</span>
                  </div>
                  <span className="font-medium">5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Workout Interests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-fitness-navy">Workout Interests</CardTitle>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" /> Edit
            </Button>
          </div>
          <CardDescription>Your preferred workout categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userWorkouts.map(workout => (
              <div key={workout.id} className="flex items-center gap-1.5 bg-fitness-teal/10 text-fitness-teal px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>{workout.name}</span>
              </div>
            ))}
            {userWorkouts.length === 0 && (
              <p className="text-gray-500 italic">No workout interests added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-fitness-navy">Your Fitness Goals</CardTitle>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" /> Edit
            </Button>
          </div>
          <CardDescription>What you're working towards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profileData?.goals && profileData.goals.map((goal, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-fitness-teal" />
                <span>{goal}</span>
              </div>
            ))}
            {(!profileData?.goals || profileData.goals.length === 0) && (
              <p className="text-gray-500 italic">No goals added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
