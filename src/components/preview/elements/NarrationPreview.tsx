
import React from "react";
import { NarrationElement } from "@/utils/types";
import { BookOpen } from "lucide-react";

interface NarrationPreviewProps {
  element: NarrationElement;
}

const NarrationPreview: React.FC<NarrationPreviewProps> = ({ element }) => {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-md border border-blue-200 dark:border-blue-800 my-2 animate-fade-in">
      <div className="flex items-center mb-2">
        <BookOpen className="h-4 w-4 text-blue-500 mr-2" />
        <h3 className="text-xs font-medium text-blue-600 dark:text-blue-400">旁白</h3>
      </div>
      <p className="text-sm">{element.text}</p>
    </div>
  );
};

export default NarrationPreview;
