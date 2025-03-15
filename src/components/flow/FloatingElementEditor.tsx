
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilLine, X } from "lucide-react";
import { SceneElement } from "@/utils/types";
import { useElementManagement } from "@/hooks/useElementManagement";
import { useStory } from "@/components/Layout";
import { NarrationElement } from "@/components/elements/NarrationElement";
import { DialogueElement } from "@/components/elements/DialogueElement";
import { ThoughtElement } from "@/components/elements/ThoughtElement";
import { ChoiceElement } from "@/components/elements/ChoiceElement";
import { QteElement } from "@/components/elements/QteElement";
import { DialogueTaskElement } from "@/components/elements/DialogueTaskElement";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingElementEditorProps {
  sceneId: string;
  currentElementId: string | null;
  position: { x: number; y: number };
  onClose: () => void;
  isOpen: boolean;
  validateTimeLimit?: (value: number) => number;
  validateKeySequence?: (value: string) => string;
}

const FloatingElementEditor: React.FC<FloatingElementEditorProps> = ({
  sceneId,
  currentElementId,
  position,
  onClose,
  isOpen,
  validateTimeLimit = (v) => v,
  validateKeySequence = (v) => v
}) => {
  const { story, setStory } = useStory();
  const isMobile = useIsMobile();
  
  const {
    elements,
    updateElement,
    addChoiceOption,
    deleteChoiceOption,
    updateChoiceOption,
  } = useElementManagement(sceneId, story, setStory);

  // Find the current element being edited
  const currentElement = elements.find(e => e.id === currentElementId);

  if (!isOpen || !currentElement) return null;
  
  // Adjust position for mobile devices
  const editorStyle = isMobile 
    ? { top: '80px', right: '16px', left: '16px', position: 'fixed' as const, zIndex: 51 } 
    : { 
        left: `${position.x + 290}px`, // 290px is approximately the width of the preview + some margin
        top: `${position.y}px`,
        position: 'fixed' as const,
        zIndex: 51
      };

  return (
    <Card
      className={cn(
        "shadow-lg border rounded-md overflow-hidden w-72 h-[500px]",
        isMobile ? "w-auto" : "w-72"
      )}
      style={editorStyle}
    >
      <div className="px-3 py-2 border-b bg-muted/50 flex items-center">
        <PencilLine className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
        <h3 className="text-sm font-medium flex-1">编辑元素</h3>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="p-3 h-[calc(100%-35px)] overflow-y-auto">
        {currentElement.type === 'narration' && (
          <NarrationElement 
            element={currentElement}
            onUpdate={updateElement}
          />
        )}
        
        {currentElement.type === 'dialogue' && (
          <DialogueElement 
            element={currentElement}
            characters={story?.characters || []}
            onUpdate={updateElement}
          />
        )}
        
        {currentElement.type === 'thought' && (
          <ThoughtElement 
            element={currentElement}
            characters={story?.characters || []}
            onUpdate={updateElement}
          />
        )}
        
        {currentElement.type === 'choice' && (
          <ChoiceElement 
            element={currentElement}
            scenes={story?.scenes || []}
            globalValues={story?.globalValues || []}
            onUpdate={updateElement}
            onAddOption={addChoiceOption}
            onDeleteOption={deleteChoiceOption}
            onUpdateOption={updateChoiceOption}
          />
        )}
        
        {currentElement.type === 'qte' && (
          <QteElement 
            element={currentElement}
            scenes={story?.scenes || []}
            globalValues={story?.globalValues || []}
            onUpdate={updateElement}
            validateTimeLimit={validateTimeLimit}
            validateKeySequence={validateKeySequence}
          />
        )}
        
        {currentElement.type === 'dialogueTask' && (
          <DialogueTaskElement 
            element={currentElement}
            characters={story?.characters || []}
            scenes={story?.scenes || []}
            globalValues={story?.globalValues || []}
            onUpdate={updateElement}
          />
        )}
      </div>
    </Card>
  );
};

export default FloatingElementEditor;
