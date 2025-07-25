"use client";

import { Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

export const Header = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mt-12 md:mt-0">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, John Doe
          </h1>
          <p className="text-gray-600 mt-1">{currentDate}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <Calendar className="h-4 w-4 mr-1" />
            {currentMonth} {currentYear}
          </Badge>
        </div>
      </div>
    </header>
  );
};
