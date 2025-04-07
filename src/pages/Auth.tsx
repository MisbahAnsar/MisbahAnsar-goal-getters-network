
import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dumbbell, Heart, Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Define form schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(mode !== 'signup');
  const { user, signIn, signUp } = useAuth();

  // Update login/register mode if URL params change
  useEffect(() => {
    setIsLogin(mode !== 'signup');
  }, [mode]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to sign in. Please check your credentials and try again.");
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    try {
      await signUp(values.email, values.password, values.fullName);
      setIsLogin(true);
      toast.success("Account created successfully! You can now sign in.");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account. Please try again later.");
    }
  };

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="bg-fitness-teal/10 p-3 rounded-full">
              <Heart className="h-8 w-8 text-fitness-teal" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-fitness-navy">Goal<span className="text-fitness-teal">Getters</span></h1>
          <p className="text-gray-600 mt-1">Achieve your fitness goals together</p>
        </div>

        {/* Auth Card */}
        <Card className="border-fitness-gray/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {isLogin ? "Sign In" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? "Welcome back! Enter your credentials to continue"
                : "Join our community of fitness enthusiasts"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                              className="pl-10" 
                              placeholder="your@email.com" 
                              id="login-email"
                              type="email"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              type="password"
                              placeholder="******"
                              id="login-password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-fitness-teal hover:bg-fitness-teal/90 text-white"
                    disabled={loginForm.formState.isSubmitting}
                  >
                    {loginForm.formState.isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                              className="pl-10" 
                              placeholder="John Doe" 
                              id="register-fullname"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input 
                              className="pl-10" 
                              placeholder="your@email.com" 
                              type="email"
                              id="register-email"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              type="password"
                              placeholder="******"
                              id="register-password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              type="password"
                              placeholder="******"
                              id="register-confirm-password"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-fitness-teal hover:bg-fitness-teal/90 text-white"
                    disabled={registerForm.formState.isSubmitting}
                  >
                    {registerForm.formState.isSubmitting ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-4 text-center">
              <Button
                variant="link"
                className="text-fitness-teal"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="mx-auto w-10 h-10 bg-fitness-teal/10 rounded-full flex items-center justify-center mb-2">
              <Dumbbell className="h-5 w-5 text-fitness-teal" />
            </div>
            <h3 className="text-sm font-medium text-fitness-navy">Track Workouts</h3>
          </div>
          <div className="text-center">
            <div className="mx-auto w-10 h-10 bg-fitness-teal/10 rounded-full flex items-center justify-center mb-2">
              <User className="h-5 w-5 text-fitness-teal" />
            </div>
            <h3 className="text-sm font-medium text-fitness-navy">Connect with Others</h3>
          </div>
          <div className="text-center">
            <div className="mx-auto w-10 h-10 bg-fitness-teal/10 rounded-full flex items-center justify-center mb-2">
              <Heart className="h-5 w-5 text-fitness-teal" />
            </div>
            <h3 className="text-sm font-medium text-fitness-navy">Achieve Goals</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
