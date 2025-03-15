
import React from "react";
import { Label } from "@/components/ui/label";
import { Story } from "@/utils/types";
import { RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RevivalPointSelectorProps {
  revivalPointId: string | undefined;
  selectedSceneId: string;
  story: Story;
  updateRevivalPoint: (sceneId: string) => void;
}

const RevivalPointSelector: React.FC<RevivalPointSelectorProps> = ({
  revivalPointId,
  selectedSceneId,
  story,
  updateRevivalPoint
}) => {
  return (
    <div>
      <Label htmlFor="revivalPoint" className="text-xs flex items-center">
        <RotateCcw className="h-3 w-3 mr-1 text-red-500" /> 复活点
      </Label>
      <Select
        value={revivalPointId || "none"}
        onValueChange={(value) =>
          updateRevivalPoint(value === "none" ? "" : value)
        }
      >
        <SelectTrigger id="revivalPoint" className="h-8 text-sm">
          <SelectValue placeholder="选择复活点" />
        </SelectTrigger>
        <SelectContent position="popper" className="z-[100]">
          <SelectItem value="none">无</SelectItem>
          {story.scenes
            .filter(
              (scene) =>
                scene.id !== selectedSceneId && scene.type !== "bad-ending"
            )
            .map((scene) => (
              <SelectItem key={scene.id} value={scene.id}>
                {scene.title} (
                {scene.type === "start"
                  ? "开始"
                  : scene.type === "ending"
                  ? "正常结局"
                  : "普通"}
                )
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RevivalPointSelector;
