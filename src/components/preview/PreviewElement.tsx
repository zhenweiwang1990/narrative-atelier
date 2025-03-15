import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Keyboard } from "lucide-react";
import {
  SceneElement,
  ChoiceElement,
  QteElement,
  DialogueTaskElement,
  Character,
  ValueChange,
} from "@/utils/types";

interface PreviewElementProps {
  currentElement: SceneElement | null;
  handleNext: () => void;
  handleChoiceSelect: (
    nextSceneId: string,
    valueChanges?: ValueChange[]
  ) => void;
  getCharacter: (characterId: string) => Character | undefined;
}

const PreviewElement: React.FC<PreviewElementProps> = ({
  currentElement,
  handleNext,
  handleChoiceSelect,
  getCharacter,
}) => {
  if (!currentElement) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm">点击下一步开始此场景</p>
      </div>
    );
  }

  switch (currentElement.type) {
    case "narration":
      return (
        <div className="p-4">
          <p className="text-sm">{currentElement.text}</p>
        </div>
      );

    case "dialogue":
      const speaker = getCharacter(currentElement.characterId);
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
          <p className="text-sm">{currentElement.text}</p>
        </div>
      );

    case "thought":
      const thinker = getCharacter(currentElement.characterId);
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
            {currentElement.text}
          </p>
        </div>
      );

    case "choice":
      return (
        <div className="p-4">
          <p className="text-sm mb-3">{currentElement.text}</p>
          <div className="space-y-2">
            {(currentElement as ChoiceElement).options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2 text-sm"
                onClick={() =>
                  handleChoiceSelect(option.nextSceneId, option.valueChanges)
                }
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      );

    case "qte":
      const qteElement = currentElement as QteElement;
      
      return (
        <div className="p-4">
          <p className="text-sm mb-3 font-bold text-amber-600">
            {qteElement.introText || "Quick Time Event"}
          </p>
          <p className="text-sm mb-4">{qteElement.description}</p>

          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center">
              <Keyboard className="h-3 w-3 mr-1" />
              <span>Key Sequence: {qteElement.keySequence || "ABC"}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Time: {qteElement.timeLimit || 3}s</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() =>
                handleChoiceSelect(
                  qteElement.success.sceneId,
                  qteElement.success.valueChanges
                )
              }
            >
              Success
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              onClick={() =>
                handleChoiceSelect(
                  qteElement.failure.sceneId,
                  qteElement.failure.valueChanges
                )
              }
            >
              Failure
            </Button>
          </div>
        </div>
      );

    case "dialogueTask":
      const taskElement = currentElement as DialogueTaskElement;
      const targetCharacter = getCharacter(taskElement.targetCharacterId);
      
      return (
        <div className="p-4">
          <p className="text-sm mb-2 font-bold text-green-600">Dialogue Task</p>
          <p className="text-sm mb-1">Goal: {taskElement.goal}</p>

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

          {taskElement.openingLine && (
            <div className="mb-3 p-2 bg-muted/20 rounded-md">
              <p className="text-xs font-medium">
                {targetCharacter?.name || "Character"}:
              </p>
              <p className="text-sm">{taskElement.openingLine}</p>
            </div>
          )}

          <div className="flex space-x-2 mt-4">
            <Button
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700 flex-1"
              onClick={() =>
                handleChoiceSelect(
                  taskElement.success.sceneId,
                  taskElement.success.valueChanges
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
                  taskElement.failure.sceneId,
                  taskElement.failure.valueChanges
                )
              }
            >
              Failure
            </Button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default PreviewElement;
