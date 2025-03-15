
import React from 'react';
import { Check, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChapterHeaderContentProps {
  title: string;
  id: string;
  isConverted: boolean;
  isProcessed: boolean;
  onTitleChange: (id: string, title: string) => void;
}

const ChapterHeaderContent: React.FC<ChapterHeaderContentProps> = ({
  title,
  id,
  isConverted,
  isProcessed,
  onTitleChange
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <span className="font-medium">
          <Input 
            value={title || '无标题章节'} 
            onChange={(e) => onTitleChange(id, e.target.value)}
            className="w-40 h-7 p-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={(e) => e.stopPropagation()}
          />
        </span>
        {isConverted && (
          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-800 dark:text-green-100">
            已转换
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {isProcessed ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        )}
      </div>
    </div>
  );
};

export default ChapterHeaderContent;
