
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
  isGenerating?: boolean;
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
  isGenerating = false,
}) => {
  return (
    <div className="p-3 overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      {isGenerating && (
        <div className="mb-3 text-sm text-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
          AI 正在生成内容，请稍候...
        </div>
      )}
      
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
          disabled={isGenerating}
        />
      )}
    </div>
  );
};

export default EditorContent;
