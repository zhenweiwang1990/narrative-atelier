
import React from "react";
import { useStory } from "@/components/Layout";
import { useElementManagement } from "@/hooks/useElementManagement";
import FloatingEditorWrapper from "./editor/FloatingEditorWrapper";
import EditorHeader from "./editor/EditorHeader";
import EditorContent from "./editor/EditorContent";
import { useEditorElementAddition } from "./hooks/useEditorElementAddition";

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

  return (
    <FloatingEditorWrapper position={position} isOpen={isOpen}>
      <EditorHeader 
        title={showSceneProperties ? '编辑场景' : '编辑元素'} 
        onClose={onClose}
        onAddElement={!showSceneProperties && currentElement ? handleAddElement : undefined}
        showElementActions={!showSceneProperties && !!currentElement}
        elementType={currentElement?.type}
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
      />
    </FloatingEditorWrapper>
  );
};

export default FloatingElementEditor;
