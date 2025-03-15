
import React from "react";
import { SceneElement, Story } from "@/utils/types";
import { NarrationElement } from "@/components/elements/NarrationElement";
import { DialogueElement } from "@/components/elements/DialogueElement";
import { ThoughtElement } from "@/components/elements/ThoughtElement";
import { ChoiceElement } from "@/components/elements/ChoiceElement";
import { QteElement } from "@/components/elements/QteElement";
import { DialogueTaskElement } from "@/components/elements/DialogueTaskElement";

interface ElementEditorProps {
  element: SceneElement;
  story: Story;
  updateElement: (id: string, updates: Partial<SceneElement>) => void;
  addChoiceOption: (elementId: string) => void;
  deleteChoiceOption: (elementId: string, optionId: string) => void;
  updateChoiceOption: (elementId: string, optionId: string, updates: any) => void;
  validateTimeLimit?: (value: number) => number;
  validateKeySequence?: (value: string) => string;
  disabled?: boolean;
}

const ElementEditor: React.FC<ElementEditorProps> = ({
  element,
  story,
  updateElement,
  addChoiceOption,
  deleteChoiceOption,
  updateChoiceOption,
  validateTimeLimit = (v) => v,
  validateKeySequence = (v) => v,
  disabled = false,
}) => {
  if (!element) return null;

  // Create a wrapper function for updateElement that respects the disabled state
  const handleUpdate = (id: string, updates: Partial<SceneElement>) => {
    if (!disabled) {
      updateElement(id, updates);
    }
  };

  switch (element.type) {
    case "narration":
      return (
        <NarrationElement 
          element={element as any} // Using type assertion to fix TypeScript error
          onUpdate={handleUpdate}
        />
      );
    
    case "dialogue":
      return (
        <DialogueElement 
          element={element as any} // Using type assertion to fix TypeScript error
          characters={story?.characters || []}
          onUpdate={handleUpdate}
        />
      );
    
    case "thought":
      return (
        <ThoughtElement 
          element={element as any} // Using type assertion to fix TypeScript error
          characters={story?.characters || []}
          onUpdate={handleUpdate}
        />
      );
    
    case "choice":
      return (
        <ChoiceElement 
          element={element as any} // Using type assertion to fix TypeScript error
          scenes={story?.scenes || []}
          globalValues={story?.globalValues || []}
          onUpdate={handleUpdate}
          onAddOption={disabled ? undefined : addChoiceOption}
          onDeleteOption={disabled ? undefined : deleteChoiceOption}
          onUpdateOption={disabled ? undefined : updateChoiceOption}
        />
      );
    
    case "qte":
      return (
        <QteElement 
          element={element as any} // Using type assertion to fix TypeScript error
          scenes={story?.scenes || []}
          globalValues={story?.globalValues || []}
          story={story}
          onUpdate={handleUpdate}
          validateTimeLimit={validateTimeLimit}
          validateKeySequence={validateKeySequence}
        />
      );
    
    case "dialogueTask":
      return (
        <DialogueTaskElement 
          element={element as any} // Using type assertion to fix TypeScript error
          characters={story?.characters || []}
          scenes={story?.scenes || []}
          globalValues={story?.globalValues || []}
          onUpdate={handleUpdate}
        />
      );
      
    default:
      return <div>Unsupported element type</div>;
  }
};

export default ElementEditor;
