import React, { useState } from "react";
import { useStory } from "@/components/Layout";
import { useElementManagement } from "@/hooks/useElementManagement";
import FloatingEditorWrapper from "./editor/FloatingEditorWrapper";
import EditorHeader from "./editor/EditorHeader";
import EditorContent from "./editor/EditorContent";
import { useEditorElementAddition } from "./hooks/useEditorElementAddition";
import { toast } from "sonner";
import { handleAiStoryGeneration } from "@/services/aiStoryServiceClient";

interface FloatingElementEditorProps {
  sceneId: string;
  currentElementId: string | null;
  position: { x: number; y: number };
  onClose: () => void;
  isOpen: boolean;
  validateTimeLimit?: (value: number) => number;
  validateKeySequence?: (value: string) => string;
  showSceneProperties?: boolean;
}

const FloatingElementEditor: React.FC<FloatingElementEditorProps> = ({
  sceneId,
  currentElementId,
  position,
  onClose,
  isOpen,
  validateTimeLimit = (v) => v,
  validateKeySequence = (v) => v,
  showSceneProperties = false
}) => {
  const { story, setStory } = useStory();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {
    elements,
    updateElement,
    addElement,
    addChoiceOption,
    deleteChoiceOption,
    updateChoiceOption,
  } = useElementManagement(sceneId, story, setStory);

  // Find the current element being edited
  const currentElement = elements.find(e => e.id === currentElementId);
  const selectedScene = story?.scenes.find(scene => scene.id === sceneId);
  
  // Get current element index
  const currentElementIndex = currentElement 
    ? elements.findIndex(e => e.id === currentElement.id)
    : -1;

  // Use the custom hook for element addition
  const { handleAddElement } = useEditorElementAddition({
    sceneId,
    currentElementId,
    currentElementIndex,
    elements,
    addElement,
    updateElement,
    onClose,
  });

  // Handle AI content generation
  const handleAiGenerate = async () => {
    if (!currentElement || !story) return;
    
    setIsGenerating(true);
    
    try {
      // Call the AI content generation API
      const result = await handleAiStoryGeneration({
        prompt: `为${currentElement.type}类型元素生成内容`,
        type: "branch",
        elementId: currentElement.id,
        story: story,
        onSuccess: () => {
          // Refresh the element content after successful generation
          toast.success("AI 已成功生成内容");
        }
      });
      
      // Check if result exists and has the success property before accessing it
      if (result && typeof result === 'object' && 'success' in result) {
        if (result.success) {
          // Mock content update based on element type
          switch (currentElement.type) {
            case "narration":
              updateElement(currentElement.id, { 
                text: "AI 生成的叙述内容将在这里显示" 
              });
              break;
            case "dialogue":
              updateElement(currentElement.id, { 
                text: "AI 生成的对话内容将在这里显示" 
              });
              break;
            case "qte":
              updateElement(currentElement.id, { 
                description: "AI 生成的 QTE 描述将在这里显示",
                keySequence: "SPACE",
                timeLimit: 5
              });
              break;
            // Add other element types as needed
          }
        }
      }
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("AI 生成内容失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <FloatingEditorWrapper position={position} isOpen={isOpen}>
      <EditorHeader 
        title={showSceneProperties ? '编辑场景' : '编辑元素'} 
        onClose={onClose}
        onAddElement={!showSceneProperties && currentElement ? handleAddElement : undefined}
        showElementActions={!showSceneProperties && !!currentElement}
        elementType={currentElement?.type}
        onAiGenerate={!showSceneProperties && currentElement ? handleAiGenerate : undefined}
      />

      <EditorContent 
        showSceneProperties={showSceneProperties}
        currentElement={currentElement}
        selectedScene={selectedScene}
        story={story}
        sceneId={sceneId}
        setStory={setStory}
        updateElement={updateElement}
        addChoiceOption={addChoiceOption}
        deleteChoiceOption={deleteChoiceOption}
        updateChoiceOption={updateChoiceOption}
        validateTimeLimit={validateTimeLimit}
        validateKeySequence={validateKeySequence}
        isGenerating={isGenerating}
      />
    </FloatingEditorWrapper>
  );
};

export default FloatingElementEditor;
