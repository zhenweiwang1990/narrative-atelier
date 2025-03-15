
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DialogueTaskElement, Character, ValueChange } from "@/utils/types";

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
    <div className="p-4">
      <p className="text-sm mb-2 font-bold text-green-600">Dialogue Task</p>
      <p className="text-sm mb-1">Goal: {element.goal}</p>

      <div className="flex items-center my-2">
        <Avatar className="h-8 w-8 mr-2">
          {targetCharacter?.portrait ? (
            <AvatarImage
              src={targetCharacter.portrait}
              alt={targetCharacter.name}
            />
          ) : (
            <AvatarFallback>
              {targetCharacter?.name?.charAt(0) || "?"}
            </AvatarFallback>
          )}
        </Avatar>
        <p className="text-xs mb-3 text-muted-foreground">
          With: {targetCharacter?.name || "Unknown Character"}
        </p>
      </div>

      {element.openingLine && (
        <div className="mb-3 p-2 bg-muted/20 rounded-md">
          <p className="text-xs font-medium">
            {targetCharacter?.name || "Character"}:
          </p>
          <p className="text-sm">{element.openingLine}</p>
        </div>
      )}

      <div className="flex space-x-2 mt-4">
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 flex-1"
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
          className="bg-red-600 hover:bg-red-700 flex-1"
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
