
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DialogueElement, Character } from "@/utils/types";
import { MessageCircle } from "lucide-react";

interface DialoguePreviewProps {
  element: DialogueElement;
  getCharacter: (characterId: string) => Character | undefined;
}

const DialoguePreview: React.FC<DialoguePreviewProps> = ({ element, getCharacter }) => {
  const speaker = getCharacter(element.characterId);
  
  return (
    <div className="p-4 bg-green-50 dark:bg-green-950/40 rounded-md border border-green-200 dark:border-green-800 my-2 animate-fade-in">
      <div className="flex items-center mb-2">
        <MessageCircle className="h-4 w-4 text-green-600 mr-2" />
        <p className="text-xs font-medium text-green-600 dark:text-green-400">对话</p>
      </div>
      <div className="flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2 border border-green-200 dark:border-green-700">
          {speaker?.portrait ? (
            <AvatarImage src={speaker.portrait} alt={speaker.name} />
          ) : (
            <AvatarFallback className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {speaker?.name?.charAt(0) || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        <p className="text-xs font-bold">{speaker?.name || "Unknown"}</p>
      </div>
      <p className="text-sm bg-white dark:bg-green-950/60 p-2 rounded-md border border-green-100 dark:border-green-900">{element.text}</p>
    </div>
  );
};

export default DialoguePreview;
