
import React from "react";
import { SceneElement } from "@/utils/types";
import { NarrationElement } from "@/components/elements/NarrationElement";
import { DialogueElement } from "@/components/elements/DialogueElement";
import { ThoughtElement } from "@/components/elements/ThoughtElement";
import { ChoiceElement } from "@/components/elements/ChoiceElement";
import { QteElement } from "@/components/elements/QteElement";
import { DialogueTaskElement } from "@/components/elements/DialogueTaskElement";

interface ElementEditorProps {
  element: SceneElement;
  story: any;
  updateElement: (id: string, updates: Partial<SceneElement>) => void;
  addChoiceOption: (elementId: string) => void;
  deleteChoiceOption: (elementId: string, optionId: string) => void;
  updateChoiceOption: (elementId: string, optionId: string, updates: any) => void;
  validateTimeLimit?: (value: number) => number;
  validateKeySequence?: (value: string) => string;
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
}) => {
  if (!element) return null;

  switch (element.type) {
    case "narration":
      return (
        <NarrationElement 
          element={element}
          onUpdate={updateElement}
        />
      );
    
    case "dialogue":
      return (
        <DialogueElement 
          element={element}
          characters={story?.characters || []}
          onUpdate={updateElement}
        />
      );
    
    case "thought":
      return (
        <ThoughtElement 
          element={element}
          characters={story?.characters || []}
          onUpdate={updateElement}
        />
      );
    
    case "choice":
      return (
        <ChoiceElement 
          element={element}
          scenes={story?.scenes || []}
          globalValues={story?.globalValues || []}
          onUpdate={updateElement}
          onAddOption={addChoiceOption}
          onDeleteOption={deleteChoiceOption}
          onUpdateOption={updateChoiceOption}
        />
      );
    
    case "qte":
      return (
        <QteElement 
          element={element}
          scenes={story?.scenes || []}
          globalValues={story?.globalValues || []}
          onUpdate={updateElement}
          validateTimeLimit={validateTimeLimit}
          validateKeySequence={validateKeySequence}
        />
      );
    
    case "dialogueTask":
      return (
        <DialogueTaskElement 
          element={element}
          characters={story?.characters || []}
          scenes={story?.scenes || []}
          globalValues={story?.globalValues || []}
          onUpdate={updateElement}
        />
      );
      
    default:
      return <div>Unsupported element type</div>;
  }
};

export default ElementEditor;
