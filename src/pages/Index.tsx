
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle, Dumbbell, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LandingNavbar from "@/components/layout/LandingNavbar";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Navbar */}
      <LandingNavbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fitness-navy to-fitness-navy/90 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Achieve Your Fitness Goals Together</h1>
            <p className="text-xl text-white/90 mb-8">
              Connect with like-minded fitness enthusiasts, track your progress, and stay motivated with personalized workout plans.
            </p>
            <div className="space-x-4">
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white py-6 px-8 text-lg">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white py-6 px-8 text-lg">
                      Get Started
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-white text-black hover:text-white hover:bg-white/10 py-6 px-8 text-lg">
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-fitness-navy mb-4">Why Goal Getters?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We bring together the best tools and community to help you achieve your fitness goals faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="mx-auto w-16 h-16 bg-fitness-teal/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-fitness-teal" />
            </div>
            <h3 className="text-xl font-semibold text-fitness-navy mb-3">Connect</h3>
            <p className="text-gray-600">Find and connect with others who share your fitness interests and goals.</p>
          </div>

          <div className="text-center p-6">
            <div className="mx-auto w-16 h-16 bg-fitness-teal/10 rounded-full flex items-center justify-center mb-4">
              <Dumbbell className="h-8 w-8 text-fitness-teal" />
            </div>
            <h3 className="text-xl font-semibold text-fitness-navy mb-3">Train</h3>
            <p className="text-gray-600">Access personalized workout plans tailored to your specific goals and level.</p>
          </div>

          <div className="text-center p-6">
            <div className="mx-auto w-16 h-16 bg-fitness-teal/10 rounded-full flex items-center justify-center mb-4">
              <Activity className="h-8 w-8 text-fitness-teal" />
            </div>
            <h3 className="text-xl font-semibold text-fitness-navy mb-3">Track</h3>
            <p className="text-gray-600">Monitor your progress with powerful analytics and visual insights.</p>
          </div>

          <div className="text-center p-6">
            <div className="mx-auto w-16 h-16 bg-fitness-teal/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-fitness-teal" />
            </div>
            <h3 className="text-xl font-semibold text-fitness-navy mb-3">Achieve</h3>
            <p className="text-gray-600">Celebrate milestones and stay motivated with community support.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="bg-fitness-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-fitness-navy mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our community members are transforming their lives through fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "Goal Getters helped me find running partners in my area. I've improved my pace and completed my first half marathon!"
              </p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Sarah" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Harkirat Singh</h4>
                  <p className="text-sm text-gray-500">Marathon Runner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "The customized workout plans helped me gain 15lbs of muscle mass. The community keeps me accountable every day."
              </p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Manu paaji</h4>
                  <p className="text-sm text-gray-500">Strength Trainer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "I lost over 30lbs in 6 months with the support of my Goal Getters group. The progress tracking keeps me motivated."
              </p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/men/17.jpg" alt="Emma" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Ankit kumar</h4>
                  <p className="text-sm text-gray-500">Transformation Journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold text-fitness-navy mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Join thousands of fitness enthusiasts already achieving their goals together.
        </p>
        {user ? (
          <Link to="/dashboard">
            <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white py-6 px-8 text-lg">
              Go to Dashboard
            </Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white py-6 px-8 text-lg">
              Join Goal Getters Today
            </Button>
          </Link>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-fitness-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Goal<span className="text-fitness-teal">Getters</span></h3>
              <p className="text-gray-300">Connecting fitness enthusiasts to achieve goals together.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Workout Plans</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Goal Tracking</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Progress Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Goal Getters. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
