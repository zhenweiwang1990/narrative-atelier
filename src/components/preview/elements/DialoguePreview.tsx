
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DialogueElement, Character } from "@/utils/types";

interface DialoguePreviewProps {
  element: DialogueElement;
  getCharacter: (characterId: string) => Character | undefined;
}

const DialoguePreview: React.FC<DialoguePreviewProps> = ({ element, getCharacter }) => {
  const speaker = getCharacter(element.characterId);
  
  return (
    <div className="p-4">
      <div className="flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2">
          {speaker?.portrait ? (
            <AvatarImage src={speaker.portrait} alt={speaker.name} />
          ) : (
            <AvatarFallback>
              {speaker?.name?.charAt(0) || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        <p className="text-xs font-bold">{speaker?.name || "Unknown"}</p>
      </div>
      <p className="text-sm">{element.text}</p>
    </div>
  );
};

export default DialoguePreview;
