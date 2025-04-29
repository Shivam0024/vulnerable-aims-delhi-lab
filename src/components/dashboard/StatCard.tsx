
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className="text-hospital-blue">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {trend && (
        <div className="mt-2 text-sm flex items-center">
          <span className={trend.isUp ? 'text-hospital-green' : 'text-hospital-red'}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </span>
          <span className="ml-2 text-gray-500">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
