
import React from "react";
import { Character, ThoughtElement } from "@/utils/types";

export interface ThoughtPreviewProps {
  element: ThoughtElement;
  character?: Character;
  getCharacter?: (characterId: string) => Character;
}

const ThoughtPreview: React.FC<ThoughtPreviewProps> = ({ 
  element,
  character,
  getCharacter
}) => {
  // Use either the provided character or get it using the getCharacter function
  const thinkingCharacter = character || (getCharacter && element.characterId ? getCharacter(element.characterId) : undefined);
  
  if (!thinkingCharacter) {
    return <div className="text-red-500">Character not found</div>;
  }

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600">
        {thinkingCharacter.profilePicture ? (
          <img 
            src={thinkingCharacter.profilePicture} 
            alt={thinkingCharacter.name}
            className="w-full h-full object-cover opacity-70"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground opacity-70">
            {thinkingCharacter.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium italic text-muted-foreground">{thinkingCharacter.name}的想法</div>
        <div className="mt-1 italic text-muted-foreground">{element.text}</div>
      </div>
    </div>
  );
};

export default ThoughtPreview;
