
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Scene } from "@/utils/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SceneEndingProps {
  scene: Scene;
  handleRevival: () => void;
  lastElementShown: boolean;
}

const SceneEnding: React.FC<SceneEndingProps> = ({ scene, handleRevival, lastElementShown }) => {
  if (!lastElementShown) {
    return null;
  }
  
  const showEndingPoster = scene.endingPoster && (scene.type === "ending" || scene.type === "bad-ending");
  
  if (scene.type === "bad-ending") {
    return (
      <div className="p-4 text-center">
        {showEndingPoster && (
          <div className="mb-4">
            <AspectRatio ratio={16/9} className="overflow-hidden rounded-md">
              <img 
                src={scene.endingPoster} 
                alt="结局海报" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        )}
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
  } else if (scene.type === "ending") {
    return (
      <div className="p-4 text-center">
        {showEndingPoster && (
          <div className="mb-4">
            <AspectRatio ratio={16/9} className="overflow-hidden rounded-md">
              <img 
                src={scene.endingPoster} 
                alt="结局海报" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        )}
        <p className="text-sm font-bold text-green-600 mb-3">结局</p>
        <p className="text-sm">恭喜！您已完成这个剧情路径。</p>
        {scene.endingName && (
          <p className="text-sm font-medium mt-2">「{scene.endingName}」</p>
        )}
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
