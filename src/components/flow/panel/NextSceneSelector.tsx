
import React from "react";
import { Label } from "@/components/ui/label";
import { Scene } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NextSceneSelectorProps {
  nextSceneId: string | undefined;
  selectedSceneId: string | null;
  scenes: Scene[];
  updateNextScene: (nextSceneId: string) => void;
}

const NextSceneSelector: React.FC<NextSceneSelectorProps> = ({
  nextSceneId,
  selectedSceneId,
  scenes,
  updateNextScene
}) => {
  return (
    <div>
      <Label htmlFor="nextScene" className="text-xs">
        下一个场景（线性流程）
      </Label>
      <Select
        value={nextSceneId || "none"}
        onValueChange={(value) =>
          updateNextScene(value === "none" ? "" : value)
        }
      >
        <SelectTrigger id="nextScene" className="h-8 text-sm">
          <SelectValue placeholder="选择下一个场景" />
        </SelectTrigger>
        <SelectContent position="popper" className="z-[100]">
          <SelectItem value="none">无（结束或基于选择）</SelectItem>
          {scenes
            .filter((scene) => scene.id !== selectedSceneId)
            .map((scene) => (
              <SelectItem key={scene.id} value={scene.id}>
                {scene.title} (
                {scene.type === "start"
                  ? "开始"
                  : scene.type === "ending"
                  ? "正常结局"
                  : scene.type === "bad-ending"
                  ? "异常结局"
                  : "普通"}
                )
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NextSceneSelector;
