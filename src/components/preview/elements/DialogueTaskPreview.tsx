
import React, { useState } from "react";
import { Character, DialogueTaskElement, ValueChange } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface DialogueTaskPreviewProps {
  element: DialogueTaskElement;
  character?: Character;
  getCharacter?: (characterId: string) => Character;
  handleChoiceSelect: (nextSceneId: string | undefined, valueChanges?: ValueChange[]) => void;
}

const DialogueTaskPreview: React.FC<DialogueTaskPreviewProps> = ({ 
  element,
  character,
  getCharacter,
  handleChoiceSelect 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Use either the provided character or get it using the getCharacter function
  const targetCharacter = character || (getCharacter && element.targetCharacterId ? getCharacter(element.targetCharacterId) : undefined);
  
  // Mock success/failure for preview
  const handleSuccess = () => {
    if (element.success) {
      handleChoiceSelect(
        element.success.sceneId, 
        element.success.valueChanges
      );
    }
  };

  const handleFailure = () => {
    if (element.failure) {
      handleChoiceSelect(
        element.failure.sceneId, 
        element.failure.valueChanges
      );
    }
  };

  // Toggle showing additional details
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="p-4 bg-muted/30 rounded-lg">
      <h3 className="font-medium mb-2">对话任务：{element.goal}</h3>
      
      {targetCharacter && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            {targetCharacter.profilePicture ? (
              <img 
                src={targetCharacter.profilePicture} 
                alt={targetCharacter.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                {targetCharacter.name.charAt(0)}
              </div>
            )}
          </div>
          <div>与 <span className="font-medium">{targetCharacter.name}</span> 对话</div>
        </div>
      )}
      
      {element.openingLine && (
        <div className="mb-3 italic text-muted-foreground">
          "{element.openingLine}"
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleDetails} 
        className="mb-3 w-full flex justify-between items-center text-xs"
      >
        {showDetails ? "隐藏详情" : "显示详情"}
        {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {showDetails && (
        <div className="mb-4 space-y-3 text-sm">
          {element.characterIntro && (
            <div>
              <h4 className="font-medium text-xs">角色介绍：</h4>
              <p className="text-muted-foreground">{element.characterIntro}</p>
            </div>
          )}
          
          {element.dialogueTopics && element.dialogueTopics.length > 0 && (
            <div>
              <h4 className="font-medium text-xs">对话话题：</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                {element.dialogueTopics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={handleFailure}>
          失败
        </Button>
        <Button size="sm" onClick={handleSuccess}>
          成功
        </Button>
      </div>
    </div>
  );
};

export default DialogueTaskPreview;
