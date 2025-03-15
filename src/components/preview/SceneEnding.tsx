import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Scene } from "@/utils/types";

interface SceneEndingProps {
  scene: Scene;
  handleRevival: () => void;
  lastElementShown: boolean;
}

const SceneEnding: React.FC<SceneEndingProps> = ({
  scene,
  handleRevival,
  lastElementShown,
}) => {
  if (!lastElementShown) {
    return null;
  }
  剧情;
  if (scene.type === "bad-ending") {
    return (
      <div className="p-4 text-center">
        <p className="text-sm font-bold text-red-600 mb-3">异常结局</p>
        <p className="text-sm mb-4">剧情已经达到了一个消极的结局。</p>
        {scene.revivalPointId && (
          <Button
            variant="default"
            size="sm"
            className="bg-amber-600 hover:bg-amber-700"
            onClick={handleRevival}
          >
            <RotateCcw className="h-4 w-4 mr-2" /> 从检查点恢复
          </Button>
        )}
      </div>
    );
    剧情;
  } else if (scene.type === "ending") {
    return (
      <div className="p-4 text-center">
        <p className="text-sm font-bold text-green-600 mb-3">结局</p>
        <p className="text-sm">恭喜！您已完成这个剧情路径。</p>
      </div>
    );
  } else if (!scene.nextSceneId) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">
          场景结束。未定义下一个场景。
        </p>
      </div>
    );
  }

  return null;
};

export default SceneEnding;
