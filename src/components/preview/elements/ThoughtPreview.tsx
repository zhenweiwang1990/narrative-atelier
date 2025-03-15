
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThoughtElement, Character } from "@/utils/types";
import { Lightbulb } from "lucide-react";

interface ThoughtPreviewProps {
  element: ThoughtElement;
  getCharacter: (characterId: string) => Character | undefined;
}

const ThoughtPreview: React.FC<ThoughtPreviewProps> = ({ element, getCharacter }) => {
  const thinker = getCharacter(element.characterId);
  
  return (
    <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-md border border-purple-200 dark:border-purple-800 my-2 animate-fade-in">
      <div className="flex items-center mb-2">
        <Lightbulb className="h-4 w-4 text-purple-600 mr-2" />
        <p className="text-xs font-medium text-purple-600 dark:text-purple-400">思考</p>
      </div>
      <div className="flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2 border border-purple-200 dark:border-purple-700">
          {thinker?.portrait ? (
            <AvatarImage src={thinker.portrait} alt={thinker.name} />
          ) : (
            <AvatarFallback className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {thinker?.name?.charAt(0) || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
          {thinker?.name || "Unknown"} 的想法
        </p>
      </div>
      <p className="text-sm italic text-purple-700 dark:text-purple-300 bg-white dark:bg-purple-950/60 p-2 rounded-md border border-purple-100 dark:border-purple-900">
        "{element.text}"
      </p>
    </div>
  );
};

export default ThoughtPreview;
