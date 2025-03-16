
import React from "react";
import { ScenePropertiesPanelProps } from "./types/panelTypes";
import { checkSceneCompletion } from "./utils/sceneUtils";
import IncompleteSceneAlert from "./panel/IncompleteSceneAlert";
import SceneMetadataSection from "./panel/SceneMetadataSection";
import SceneFlowSection from "./panel/SceneFlowSection";
import SceneEditHint from "./panel/SceneEditHint";

const ScenePropertiesPanel = ({
  selectedScene,
  story,
  updateSceneTitle,
  updateSceneType,
  updateSceneLocation,
  updateNextScene,
  updateRevivalPoint,
  selectedSceneId,
  updateSceneEntrance,
  updateSceneEnvironment,
  updateEndingName,
  updateBackgroundMusic,
  updateSceneUnlockPrice,
}: ScenePropertiesPanelProps) => {
  const sceneIsIncomplete = checkSceneCompletion(selectedScene);
  
  return (
    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
      <IncompleteSceneAlert isIncomplete={sceneIsIncomplete} />
      
      <SceneMetadataSection
        selectedScene={selectedScene}
        story={story}
        updateSceneTitle={updateSceneTitle}
        updateSceneType={updateSceneType}
        updateSceneLocation={updateSceneLocation}
        updateSceneEntrance={updateSceneEntrance}
        updateSceneEnvironment={updateSceneEnvironment}
        updateBackgroundMusic={updateBackgroundMusic}
      />
      
      <SceneFlowSection
        selectedScene={selectedScene}
        story={story}
        selectedSceneId={selectedSceneId}
        updateNextScene={updateNextScene}
        updateRevivalPoint={updateRevivalPoint}
        updateEndingName={updateEndingName}
        updateSceneUnlockPrice={updateSceneUnlockPrice}
      />

      <SceneEditHint />
    </div>
  );
};

export default ScenePropertiesPanel;
