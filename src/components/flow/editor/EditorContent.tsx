
import React from "react";
import { SceneElement, ElementType, Story } from "@/utils/types";
import ElementEditor from "@/components/flow/editor/ElementEditor";
import ScenePropertiesEditor from "@/components/flow/editor/ScenePropertiesEditor";

interface EditorContentProps {
  showSceneProperties: boolean;
  currentElement: SceneElement | undefined;
  selectedScene: any;
  story: Story | null;
  sceneId: string;
  setStory: React.Dispatch<React.SetStateAction<Story | null>>;
  updateElement: (id: string, updates: Partial<SceneElement>) => void;
  addChoiceOption: (elementId: string) => void;
  deleteChoiceOption: (elementId: string, optionId: string) => void;
  updateChoiceOption: (elementId: string, optionId: string, updates: any) => void;
  validateTimeLimit?: (value: number) => number;
  validateKeySequence?: (value: string) => string;
}

const EditorContent: React.FC<EditorContentProps> = ({
  showSceneProperties,
  currentElement,
  selectedScene,
  story,
  sceneId,
  setStory,
  updateElement,
  addChoiceOption,
  deleteChoiceOption,
  updateChoiceOption,
  validateTimeLimit = (v) => v,
  validateKeySequence = (v) => v,
}) => {
  return (
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
  );
};

export default EditorContent;
