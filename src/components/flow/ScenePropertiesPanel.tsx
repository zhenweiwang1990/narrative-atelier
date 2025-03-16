
import React from "react";
import { ScenePropertiesPanelProps } from "./types/panelTypes";
import { checkSceneCompletion } from "./utils/sceneUtils";
import IncompleteSceneAlert from "./panel/IncompleteSceneAlert";
import SceneMetadataSection from "./panel/SceneMetadataSection";
import SceneFlowSection from "./panel/SceneFlowSection";
import SceneEditHint from "./panel/SceneEditHint";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      />

      {/* 场景解锁价格设置 */}
      <div className="space-y-2 p-2 border rounded-md bg-muted/20">
        <Label className="text-xs">场景解锁价格</Label>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            min="0"
            value={selectedScene.unlockPrice ?? ''} 
            onChange={(e) => updateSceneUnlockPrice?.(e.target.value === '' ? undefined : Number(e.target.value))}
            placeholder="需要的钻石数量"
            className="text-xs"
          />
          <span className="text-xs text-muted-foreground">钻石</span>
        </div>
        <p className="text-xs text-muted-foreground">
          设置后，玩家需要支付相应钻石才能解锁此场景。不设置则默认免费。
        </p>
      </div>

      <SceneEditHint />
    </div>
  );
};

export default ScenePropertiesPanel;
