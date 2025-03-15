
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DialogueTaskElement, Character, ValueChange } from "@/utils/types";
import { MessageSquare } from "lucide-react";

interface DialogueTaskPreviewProps {
  element: DialogueTaskElement;
  getCharacter: (characterId: string) => Character | undefined;
  handleChoiceSelect: (nextSceneId: string, valueChanges?: ValueChange[]) => void;
}

const DialogueTaskPreview: React.FC<DialogueTaskPreviewProps> = ({ 
  element, 
  getCharacter, 
  handleChoiceSelect 
}) => {
  const targetCharacter = getCharacter(element.targetCharacterId);
  
  return (
    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-md border border-indigo-200 dark:border-indigo-800 my-2 animate-fade-in">
      <div className="flex items-center mb-2">
        <MessageSquare className="h-4 w-4 text-indigo-600 mr-2" />
        <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">对话任务</p>
      </div>
      <p className="text-sm mb-1 bg-white dark:bg-indigo-950/60 p-2 rounded-md border border-indigo-100 dark:border-indigo-900">
        <span className="font-semibold text-indigo-700 dark:text-indigo-300">目标:</span> {element.goal}
      </p>

      <div className="flex items-center my-2 bg-indigo-100/50 dark:bg-indigo-900/30 p-2 rounded-md">
        <Avatar className="h-8 w-8 mr-2 border border-indigo-200 dark:border-indigo-700">
          {targetCharacter?.portrait ? (
            <AvatarImage
              src={targetCharacter.portrait}
              alt={targetCharacter.name}
            />
          ) : (
            <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {targetCharacter?.name?.charAt(0) || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        <p className="text-xs text-muted-foreground">
          与 <span className="font-medium text-foreground">{targetCharacter?.name || "Unknown Character"}</span> 交谈
        </p>
      </div>

      {element.openingLine && (
        <div className="mb-3 p-2 bg-white dark:bg-indigo-950/50 rounded-md border border-indigo-100 dark:border-indigo-900">
          <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
            {targetCharacter?.name || "Character"}:
          </p>
          <p className="text-sm">{element.openingLine}</p>
        </div>
      )}

      <div className="flex space-x-2 mt-4">
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white flex-1"
          onClick={() =>
            handleChoiceSelect(
              element.success.sceneId,
              element.success.valueChanges
            )
          }
        >
          Success
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white flex-1"
          onClick={() =>
            handleChoiceSelect(
              element.failure.sceneId,
              element.failure.valueChanges
            )
          }
        >
          Failure
        </Button>
      </div>
    </div>
  );
};

export default DialogueTaskPreview;
