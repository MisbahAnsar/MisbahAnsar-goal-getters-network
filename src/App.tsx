
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Workouts from "./pages/Workouts";
import Goals from "./pages/Goals";
import Schedule from "./pages/Schedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <RouteGuard>
                <Layout>
                  <Dashboard />
                </Layout>
              </RouteGuard>
            } />
            <Route path="/community" element={
              <RouteGuard>
                <Layout>
                  <Community />
                </Layout>
              </RouteGuard>
            } />
            <Route path="/profile" element={
              <RouteGuard>
                <Layout>
                  <Profile />
                </Layout>
              </RouteGuard>
            } />
            <Route path="/workouts" element={
              <RouteGuard>
                <Layout>
                  <Workouts />
                </Layout>
              </RouteGuard>
            } />
            <Route path="/goals" element={
              <RouteGuard>
                <Layout>
                  <Goals />
                </Layout>
              </RouteGuard>
            } />
            <Route path="/schedule" element={
              <RouteGuard>
                <Layout>
                  <Schedule />
                </Layout>
              </RouteGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
