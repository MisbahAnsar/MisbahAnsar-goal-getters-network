
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fitness-light px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-fitness-teal">404</h1>
        <h2 className="text-3xl font-bold text-fitness-navy mt-4 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! Looks like you've taken a wrong turn on your fitness journey.
        </p>
        <Link to="/">
          <Button className="bg-fitness-teal hover:bg-fitness-teal/90 text-white">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
