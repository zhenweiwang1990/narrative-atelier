
import React from "react";
import { Scene, Story } from "@/utils/types";
import { isEndingType } from "../utils/sceneUtils";
import NextSceneSelector from "./NextSceneSelector";
import RevivalPointSelector from "./RevivalPointSelector";
import EndingNameSelector from "./EndingNameSelector";

interface SceneFlowSectionProps {
  selectedScene: Scene;
  story: Story;
  selectedSceneId: string;
  updateNextScene: (nextSceneId: string) => void;
  updateRevivalPoint?: (sceneId: string) => void;
  updateEndingName?: (name: string) => void;
}

const SceneFlowSection: React.FC<SceneFlowSectionProps> = ({
  selectedScene,
  story,
  selectedSceneId,
  updateNextScene,
  updateRevivalPoint,
  updateEndingName
}) => {
  const sceneIsEndingType = isEndingType(selectedScene);

  return (
    <div className="space-y-3">
      {/* Ending name field for ending-type scenes */}
      {sceneIsEndingType && updateEndingName && (
        <EndingNameSelector
          endingName={selectedScene.endingName || ""}
          updateEndingName={updateEndingName}
        />
      )}

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
    </div>
  );
};

export default SceneFlowSection;
