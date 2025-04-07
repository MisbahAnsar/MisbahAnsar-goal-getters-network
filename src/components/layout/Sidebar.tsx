
import { Link } from "react-router-dom";
import { Calendar, Dumbbell, Heart, Home, Users } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/dashboard" },
    { name: "Workouts", icon: <Dumbbell className="h-5 w-5" />, path: "/workouts" },
    { name: "Goals", icon: <Heart className="h-5 w-5" />, path: "/goals" },
    { name: "Schedule", icon: <Calendar className="h-5 w-5" />, path: "/schedule" },
    { name: "Community", icon: <Users className="h-5 w-5" />, path: "/community" },
  ];

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 z-10">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-fitness-gray/20">
        <div className="flex-1 flex flex-col pt-20 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="group flex items-center px-4 py-3 text-base font-medium rounded-md text-gray-600 hover:bg-fitness-teal/10 hover:text-fitness-teal"
              >
                <div className="mr-3 text-gray-500 group-hover:text-fitness-teal">
                  {item.icon}
                </div>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
