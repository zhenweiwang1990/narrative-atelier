
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThoughtElement, Character } from "@/utils/types";

interface ThoughtPreviewProps {
  element: ThoughtElement;
  getCharacter: (characterId: string) => Character | undefined;
}

const ThoughtPreview: React.FC<ThoughtPreviewProps> = ({ element, getCharacter }) => {
  const thinker = getCharacter(element.characterId);
  
  return (
    <div className="p-4">
      <div className="flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2">
          {thinker?.portrait ? (
            <AvatarImage src={thinker.portrait} alt={thinker.name} />
          ) : (
            <AvatarFallback>
              {thinker?.name?.charAt(0) || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        <p className="text-xs font-bold text-purple-600">
          {thinker?.name}'s thoughts
        </p>
      </div>
      <p className="text-sm italic text-purple-700">
        {element.text}
      </p>
    </div>
  );
};

export default ThoughtPreview;
