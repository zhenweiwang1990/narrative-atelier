
import React from "react";
import { SceneElement, ElementType } from "@/utils/types";
import { useElementManagement } from "@/hooks/useElementManagement";
import { useStory } from "@/components/Layout";
import FloatingEditorWrapper from "./editor/FloatingEditorWrapper";
import EditorHeader from "./editor/EditorHeader";
import ElementEditor from "./editor/ElementEditor";
import ScenePropertiesEditor from "./editor/ScenePropertiesEditor";

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

  // Handle adding element before or after the current element
  const handleAddElement = (type: ElementType, position: 'before' | 'after') => {
    if (!currentElement || currentElementIndex === -1) return;
    
    // Get already sorted elements (don't sort a copy)
    const sortedElements = elements;
    
    // Calculate the order for the new element
    let newOrder: number;
    
    if (position === 'after') {
      // If adding after, use the next available order number
      newOrder = currentElement.order + 1;
      
      // Shift all elements that have order greater than or equal to the new order
      sortedElements.forEach(el => {
        if (el.order >= newOrder) {
          updateElement(el.id, { order: el.order + 1 });
        }
      });
    } else { // position === 'before'
      // If adding before, use the current element's order
      newOrder = currentElement.order;
      
      // Shift the current element and all elements after it
      sortedElements.forEach(el => {
        if (el.order >= newOrder) {
          updateElement(el.id, { order: el.order + 1 });
        }
      });
    }
    
    // Add the new element with the calculated order
    const newElementId = addElement(type, newOrder);
    
    // Auto-select the new element
    if (newElementId && onClose) {
      // Close the current editor
      onClose();
      
      // Small timeout to allow state updates to complete
      setTimeout(() => {
        // Dispatch custom event to notify the parent component
        if (typeof window !== 'undefined') {
          const selectEvent = new CustomEvent('selectElement', { 
            detail: { 
              elementId: newElementId,
              sceneId: sceneId
            } 
          });
          window.dispatchEvent(selectEvent);
        }
      }, 50); // Increased timeout to ensure state updates complete
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
      />

      <div className="p-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {showSceneProperties && selectedScene && story && setStory && (
          <ScenePropertiesEditor
            sceneId={sceneId}
            selectedScene={selectedScene}
            story={story}
            setStory={setStory}
          />
        )}

        {!showSceneProperties && currentElement && (
          <ElementEditor
            element={currentElement}
            story={story}
            updateElement={updateElement}
            addChoiceOption={addChoiceOption}
            deleteChoiceOption={deleteChoiceOption}
            updateChoiceOption={updateChoiceOption}
            validateTimeLimit={validateTimeLimit}
            validateKeySequence={validateKeySequence}
          />
        )}
      </div>
    </FloatingEditorWrapper>
  );
};

export default FloatingElementEditor;
