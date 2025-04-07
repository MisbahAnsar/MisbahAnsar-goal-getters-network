
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => {
  return (
    <div className="fitness-card">
      <div className="p-5">
        <div className="flex items-center mb-2">
          <div className="mr-3 p-2 bg-fitness-teal/10 rounded-full text-fitness-teal">
            {icon}
          </div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
        <div className="flex items-end justify-between">
          <div className="stat-value">{value}</div>
          {trend && (
            <div className={`text-sm flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-500'}`}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
