
import React from "react";
import { SceneElement } from "@/utils/types";
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
    addChoiceOption,
    deleteChoiceOption,
    updateChoiceOption,
  } = useElementManagement(sceneId, story, setStory);

  // Find the current element being edited
  const currentElement = elements.find(e => e.id === currentElementId);
  const selectedScene = story?.scenes.find(scene => scene.id === sceneId);

  return (
    <FloatingEditorWrapper position={position} isOpen={isOpen}>
      <EditorHeader 
        title={showSceneProperties ? '编辑场景' : '编辑元素'} 
        onClose={onClose} 
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
