
import React from "react";
import { Scene, Story } from "@/utils/types";
import NextSceneSelector from "./NextSceneSelector";
import RevivalPointSelector from "./RevivalPointSelector";
import EndingNameSelector from "./EndingNameSelector";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SceneFlowSectionProps {
  selectedScene: Scene;
  story: Story;
  selectedSceneId: string | null;
  updateNextScene: (nextSceneId: string) => void;
  updateRevivalPoint?: (revivalPointId: string) => void;
  updateEndingName?: (name: string) => void;
  updateSceneUnlockPrice?: (price: number | undefined) => void;
}

const SceneFlowSection: React.FC<SceneFlowSectionProps> = ({
  selectedScene,
  story,
  selectedSceneId,
  updateNextScene,
  updateRevivalPoint,
  updateEndingName,
  updateSceneUnlockPrice
}) => {
  return (
    <div className="space-y-3">
      <div className="p-3 border rounded-md bg-muted/10">
        <h3 className="text-sm font-medium mb-2">流程控制</h3>
        <div className="space-y-3">
          <NextSceneSelector
            nextSceneId={selectedScene.nextSceneId}
            scenes={story.scenes}
            selectedSceneId={selectedSceneId}
            updateNextScene={updateNextScene}
          />
          
          {updateRevivalPoint && (
            <RevivalPointSelector
              revivalPointId={selectedScene.revivalPointId}
              scenes={story.scenes}
              selectedSceneId={selectedSceneId}
              updateRevivalPoint={updateRevivalPoint}
            />
          )}
          
          {updateEndingName && selectedScene.type === "ending" && (
            <EndingNameSelector
              endingName={selectedScene.endingName || ""}
              updateEndingName={updateEndingName}
            />
          )}
        </div>
      </div>

      {/* 场景解锁价格设置 */}
      <div className="p-3 border rounded-md bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <h3 className="text-sm font-medium mb-2">解锁设置</h3>
        <div className="space-y-2">
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
      </div>
    </div>
  );
};

export default SceneFlowSection;
