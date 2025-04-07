
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, MessageSquare, Send, UserPlus, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import UserCard from "@/components/ui/UserCard";

interface PostProfile {
  full_name: string;
  avatar_url: string | null;
}

interface PostComment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: PostProfile;
}

interface Post {
  id: string;
  content: string;
  created_at: string;
  likes: number;
  user_id: string;
  profiles: PostProfile;
  comments: PostComment[];
}

interface SuggestedUser {
  id: string;
  full_name: string;
  avatar_url: string | null;
  goals: string[] | null;
  mutual_connections: number;
}

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchSuggestedUsers();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("community_posts")
        .select(`
          id,
          content,
          created_at,
          likes,
          user_id,
          profiles:profiles!user_id (
            full_name,
            avatar_url
          ),
          comments:comments!post_id (
            id,
            content,
            created_at,
            user_id,
            profiles:profiles!user_id (
              full_name,
              avatar_url
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        // Create dummy posts if there are none
        await createDummyPosts();
      } else {
        // Process the data to match our types
        const processedData = data.map(post => ({
          ...post,
          profiles: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
          comments: post.comments?.map((comment: any) => ({
            ...comment,
            profiles: Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles
          })) || []
        }));
        setPosts(processedData as Post[]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createDummyPosts = async () => {
    try {
      // First check if we have the user in the database
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user?.id)
        .single();

      if (!profile) {
        return; // User profile doesn't exist yet
      }

      // Create some dummy posts
      const dummyPosts = [
        {
          user_id: user?.id,
          content: "Just completed a 5K run! Feeling great and making progress on my cardio goals.",
          likes: 12
        },
        {
          user_id: user?.id,
          content: "Looking for workout partners in the downtown area. Anyone interested in joining for morning sessions?",
          likes: 5
        },
        {
          user_id: user?.id,
          content: "What's your favorite post-workout meal? I'm trying to improve my nutrition plan.",
          likes: 8
        }
      ];

      for (const post of dummyPosts) {
        await supabase
          .from("community_posts")
          .insert(post);
      }

      fetchPosts();
    } catch (error) {
      console.error("Error creating dummy posts:", error);
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      // For demo purposes, we'll create and fetch some dummy users
      // In a real app, you'd fetch actual users with similar interests
      
      // For now, we'll use dummy data
      const dummyUsers: SuggestedUser[] = [
        {
          id: "1",
          full_name: "Ankit kumar",
          avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
          goals: ["Weight Loss", "Cardio"],
          mutual_connections: 3
        },
        {
          id: "2",
          full_name: "Harkirat Singh",
          avatar_url: "https://randomuser.me/api/portraits/women/44.jpg", 
          goals: ["Strength Training", "Nutrition"],
          mutual_connections: 1
        },
        {
          id: "3",
          full_name: "Manu paaji",
          avatar_url: "https://randomuser.me/api/portraits/men/67.jpg",
          goals: ["Marathon Training", "Flexibility"],
          mutual_connections: 0
        }
      ];
      
      setSuggestedUsers(dummyUsers);
    } catch (error) {
      console.error("Error fetching suggested users:", error);
    }
  };

  const createPost = async () => {
    if (!user || !newPost.trim()) return;

    try {
      const newPostRecord = {
        content: newPost, 
        user_id: user.id
      };
      
      const { data, error } = await supabase
        .from("community_posts")
        .insert(newPostRecord)
        .select(`
          id,
          content,
          created_at,
          likes,
          user_id,
          profiles:profiles!user_id (
            full_name,
            avatar_url
          ),
          comments:comments!post_id (
            id,
            content,
            created_at,
            user_id,
            profiles:profiles!user_id (
              full_name,
              avatar_url
            )
          )
        `)
        .single();

      if (error) {
        throw error;
      }

      // Process the returned post to match our type
      const processedPost = {
        ...data,
        profiles: Array.isArray(data.profiles) ? data.profiles[0] : data.profiles,
        comments: data.comments?.map((comment: any) => ({
          ...comment,
          profiles: Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles
        })) || []
      };

      setPosts([processedPost as Post, ...posts]);
      setNewPost("");

      toast({
        title: "Post created!",
        description: "Your post has been shared with the community.",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addComment = async (postId: string) => {
    if (!user || !newComment[postId]?.trim()) return;

    try {
      const newCommentRecord = {
        post_id: postId,
        user_id: user.id,
        content: newComment[postId]
      };
      
      const { data, error } = await supabase
        .from("comments")
        .insert(newCommentRecord)
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles:profiles!user_id (
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        throw error;
      }

      // Process the returned comment to match our type
      const processedComment = {
        ...data,
        profiles: Array.isArray(data.profiles) ? data.profiles[0] : data.profiles
      };

      // Update the post with the new comment
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), processedComment as PostComment]
          };
        }
        return post;
      }));

      // Clear the comment input
      setNewComment({...newComment, [postId]: ""});

      toast({
        title: "Comment added!",
        description: "Your comment has been added to the post.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const likePost = async (postId: string) => {
    try {
      // Get the current post
      const currentPost = posts.find(p => p.id === postId);
      if (!currentPost) return;

      // Update locally first for UI responsiveness
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: (post.likes || 0) + 1 };
        }
        return post;
      }));

      // Update in database
      const { error } = await supabase
        .from("community_posts")
        .update({ likes: (currentPost.likes || 0) + 1 })
        .eq("id", postId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fitness-navy mb-6">Community</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="p-4">
              <div className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={user ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}` : undefined} 
                    alt="Your avatar" 
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share something with the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="resize-none mb-2"
                  />
                  <div className="flex justify-end">
                    <Button 
                      className="bg-fitness-teal hover:bg-fitness-teal/90"
                      onClick={createPost}
                      disabled={!newPost.trim()}
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Posts Feed */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-pulse text-fitness-teal">Loading posts...</div>
                </div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={post.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`} 
                            alt={post.profiles?.full_name || 'User'} 
                          />
                          <AvatarFallback>{post.profiles?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{post.profiles?.full_name || 'User'}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="text-gray-800">
                        {post.content}
                      </div>
                      
                      {/* Post Actions */}
                      <div className="flex items-center space-x-4 text-gray-500 border-t border-b py-2">
                        <button 
                          className="flex items-center space-x-1 hover:text-fitness-teal transition-colors"
                          onClick={() => likePost(post.id)}
                        >
                          <Heart className="h-4 w-4" />
                          <span>{post.likes || 0} Likes</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-fitness-teal transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments?.length || 0} Comments</span>
                        </button>
                      </div>
                      
                      {/* Comments */}
                      {post.comments && post.comments.length > 0 && (
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage 
                                  src={comment.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}`} 
                                  alt={comment.profiles?.full_name || 'User'} 
                                />
                                <AvatarFallback>{comment.profiles?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-gray-50 rounded-md p-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-sm">{comment.profiles?.full_name || 'User'}</span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Add Comment */}
                      <div className="flex space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} 
                            alt="Your avatar" 
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex items-center">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment({...newComment, [post.id]: e.target.value})}
                            className="rounded-r-none"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-l-none border-l-0"
                            onClick={() => addComment(post.id)}
                            disabled={!newComment[post.id]?.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No posts yet. Be the first to share!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Find Workout Partners */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-fitness-navy flex items-center">
                  <Users className="h-5 w-5 mr-2 text-fitness-teal" /> 
                  Workout Partners
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">Connect with others who share similar fitness interests.</p>
              <div className="space-y-3">
                {suggestedUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    name={user.full_name}
                    goals={user.goals || ['Fitness']}
                    avatarUrl={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                    mutualConnections={user.mutual_connections}
                  />
                ))}
              </div>

              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full border-fitness-teal text-fitness-teal hover:bg-fitness-teal/10" variant="outline">
                      <UserPlus className="h-4 w-4 mr-2" /> Find More Partners
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Find Workout Partners</DialogTitle>
                      <DialogDescription>
                        Search for people with similar fitness goals to connect with.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Filter by Interest</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Strength Training', 'Cardio', 'Yoga', 'Running', 'CrossFit'].map(interest => (
                            <button 
                              key={interest}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-fitness-teal/10 hover:text-fitness-teal"
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Location</h4>
                        <Input placeholder="Enter your city" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white">Search</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
            
            {/* Community Events */}
            <Card className="p-4">
              <h2 className="text-lg font-semibold text-fitness-navy mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Weekend Run Group</h3>
                    <span className="text-xs bg-fitness-teal/10 text-fitness-teal px-2 py-0.5 rounded-full">4 spots</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Join us for a 5k morning run at Central Park.</p>
                  <div className="text-xs text-gray-500">Saturday, 8:00 AM</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Yoga in the Park</h3>
                    <span className="text-xs bg-fitness-teal/10 text-fitness-teal px-2 py-0.5 rounded-full">10 spots</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Outdoor yoga session for all levels.</p>
                  <div className="text-xs text-gray-500">Sunday, 9:30 AM</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">HIIT Workout Session</h3>
                    <span className="text-xs bg-fitness-teal/10 text-fitness-teal px-2 py-0.5 rounded-full">6 spots</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">High-intensity training with Coach Mike.</p>
                  <div className="text-xs text-gray-500">Monday, 6:00 PM</div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3">View All Events</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
