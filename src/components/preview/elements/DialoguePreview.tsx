
import React from "react";
import { Character, DialogueElement } from "@/utils/types";

export interface DialoguePreviewProps {
  element: DialogueElement;
  character?: Character;
  getCharacter?: (characterId: string) => Character;
}

const DialoguePreview: React.FC<DialoguePreviewProps> = ({ 
  element,
  character,
  getCharacter
}) => {
  // Use either the provided character or get it using the getCharacter function
  const speakingCharacter = character || (getCharacter && element.characterId ? getCharacter(element.characterId) : undefined);
  
  if (!speakingCharacter) {
    return <div className="text-red-500">Character not found</div>;
  }

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden">
        {speakingCharacter.profilePicture ? (
          <img 
            src={speakingCharacter.profilePicture} 
            alt={speakingCharacter.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            {speakingCharacter.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium">{speakingCharacter.name}</div>
        <div className="mt-1">{element.text}</div>
      </div>
    </div>
  );
};

export default DialoguePreview;
