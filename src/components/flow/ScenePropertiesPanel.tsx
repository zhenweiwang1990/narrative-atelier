
import React from "react";
import { ScenePropertiesPanelProps } from "./types/panelTypes";
import { checkSceneCompletion, isEndingType } from "./utils/sceneUtils";
import IncompleteSceneAlert from "./panel/IncompleteSceneAlert";
import SceneTitleInput from "./panel/SceneTitleInput";
import SceneTypeSelector from "./panel/SceneTypeSelector";
import LocationSelector from "./panel/LocationSelector";
import NextSceneSelector from "./panel/NextSceneSelector";
import RevivalPointSelector from "./panel/RevivalPointSelector";
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
}: ScenePropertiesPanelProps) => {
  const sceneIsIncomplete = checkSceneCompletion(selectedScene);
  const sceneIsEndingType = isEndingType(selectedScene);

  return (
    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
      <IncompleteSceneAlert isIncomplete={sceneIsIncomplete} />
      
      <SceneTitleInput 
        title={selectedScene.title} 
        updateSceneTitle={updateSceneTitle} 
      />

      <SceneTypeSelector 
        type={selectedScene.type} 
        updateSceneType={updateSceneType}
      />

      <LocationSelector 
        locationId={selectedScene.locationId} 
        story={story}
        updateSceneLocation={updateSceneLocation}
      />

      {!sceneIsEndingType && (
        <NextSceneSelector
          nextSceneId={selectedScene.nextSceneId}
          selectedSceneId={selectedSceneId}
          story={story}
          updateNextScene={updateNextScene}
        />
      )}

      {selectedScene.type === "bad-ending" && updateRevivalPoint && (
        <RevivalPointSelector
          revivalPointId={selectedScene.revivalPointId}
          selectedSceneId={selectedSceneId}
          story={story}
          updateRevivalPoint={updateRevivalPoint}
        />
      )}

      <SceneEditHint />
    </div>
  );
};

export default ScenePropertiesPanel;
