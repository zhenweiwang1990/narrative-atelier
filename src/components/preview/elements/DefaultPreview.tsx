
import React from "react";
import { ChevronRight } from "lucide-react";

const DefaultPreview: React.FC = () => {
  return (
    <div className="p-6 text-center bg-gray-50 dark:bg-gray-900/30 rounded-md border border-gray-200 dark:border-gray-800 my-2 animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-2">
        <ChevronRight className="h-8 w-8 text-gray-400 animate-pulse" />
        <p className="text-sm text-gray-600 dark:text-gray-400">点击下一步开始此场景</p>
      </div>
    </div>
  );
};

export default DefaultPreview;
