
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const LandingNavbar = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-fitness-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <div className="bg-fitness-teal/10 p-2 mr-2 rounded-full">
              <Heart className="h-6 w-6 text-fitness-teal" />
            </div>
            <h1 className="text-xl font-bold text-fitness-teal">Goal<span className="text-fitness-navy">Getters</span></h1>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/#features" className="text-fitness-navy hover:text-fitness-teal transition-colors">
              Features
            </Link>
            <Link to="/#testimonials" className="text-fitness-navy hover:text-fitness-teal transition-colors">
              Testimonials
            </Link>
            <Link to="/#pricing" className="text-fitness-navy hover:text-fitness-teal transition-colors">
              Pricing
            </Link>
            
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex space-x-2">
                <Link to="/auth?mode=signin">
                  <Button variant="outline" className="border-fitness-teal text-fitness-teal">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-fitness-navy hover:text-fitness-teal focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-fitness-gray/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/#features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-fitness-navy hover:text-fitness-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link to="/#testimonials" 
              className="block px-3 py-2 rounded-md text-base font-medium text-fitness-navy hover:text-fitness-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link to="/#pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-fitness-navy hover:text-fitness-teal"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            {user ? (
              <Link to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-fitness-teal"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/auth?mode=signin" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-fitness-navy hover:text-fitness-teal"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link to="/auth?mode=signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-fitness-teal"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
