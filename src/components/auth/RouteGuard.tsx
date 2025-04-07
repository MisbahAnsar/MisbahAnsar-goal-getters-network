
import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Debug log
    console.log("RouteGuard: User state changed", { user, isLoading });
  }, [user, isLoading]);

  // If still checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-fitness-teal">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!user) {
    console.log("RouteGuard: No user found, redirecting to /auth");
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the protected component
  console.log("RouteGuard: User authenticated, showing content");
  return <>{children}</>;
};

export default RouteGuard;
