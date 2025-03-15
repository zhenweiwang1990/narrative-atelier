
import React from "react";
import { Label } from "@/components/ui/label";
import { Scene } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SceneSelectSectionProps {
  successSceneId: string;
  failureSceneId: string;
  scenes: Scene[];
  onUpdateSuccessScene: (sceneId: string) => void;
  onUpdateFailureScene: (sceneId: string) => void;
  showSingleColumn?: boolean;
}

const SceneSelectSection: React.FC<SceneSelectSectionProps> = ({
  successSceneId,
  failureSceneId,
  scenes,
  onUpdateSuccessScene,
  onUpdateFailureScene,
  showSingleColumn = false
}) => {
  // If showing a single column, only render the relevant selector
  if (showSingleColumn) {
    if (successSceneId !== undefined) {
      return (
        <div>
          <Label className="text-xs">成功场景</Label>
          <Select value={successSceneId || "none"} onValueChange={onUpdateSuccessScene}>
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue placeholder="选择场景" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-[100]">
              <SelectGroup>
                <SelectItem value="none">不指定</SelectItem>
                {scenes.map((scene) => (
                  <SelectItem key={scene.id} value={scene.id}>
                    {scene.title} (
                    {scene.type === "start"
                      ? "开始"
                      : scene.type === "ending"
                      ? "结局"
                      : scene.type === "bad-ending"
                      ? "异常结局"
                      : "普通"}
                    )
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    } else if (failureSceneId !== undefined) {
      return (
        <div>
          <Label className="text-xs">失败场景</Label>
          <Select value={failureSceneId || "none"} onValueChange={onUpdateFailureScene}>
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue placeholder="选择场景" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-[100]">
              <SelectGroup>
                <SelectItem value="none">不指定</SelectItem>
                {scenes.map((scene) => (
                  <SelectItem key={scene.id} value={scene.id}>
                    {scene.title} (
                    {scene.type === "start"
                      ? "开始"
                      : scene.type === "ending"
                      ? "结局"
                      : scene.type === "bad-ending"
                      ? "异常结局"
                      : "普通"}
                    )
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    }
    // If both are undefined in single column mode, don't render anything
    return null;
  }

  // Default two-column view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Label className="text-xs">成功场景</Label>
        <Select value={successSceneId || "none"} onValueChange={onUpdateSuccessScene}>
          <SelectTrigger className="mt-1 h-8 text-xs">
            <SelectValue placeholder="选择场景" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[100]">
            <SelectGroup>
              <SelectItem value="none">不指定</SelectItem>
              {scenes.map((scene) => (
                <SelectItem key={scene.id} value={scene.id}>
                  {scene.title} (
                  {scene.type === "start"
                    ? "开始"
                    : scene.type === "ending"
                    ? "结局"
                    : scene.type === "bad-ending"
                    ? "异常结局"
                    : "普通"}
                  )
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs">失败场景</Label>
        <Select value={failureSceneId || "none"} onValueChange={onUpdateFailureScene}>
          <SelectTrigger className="mt-1 h-8 text-xs">
            <SelectValue placeholder="选择场景" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[100]">
            <SelectGroup>
              <SelectItem value="none">不指定</SelectItem>
              {scenes.map((scene) => (
                <SelectItem key={scene.id} value={scene.id}>
                  {scene.title} (
                  {scene.type === "start"
                    ? "开始"
                    : scene.type === "ending"
                    ? "结局"
                    : scene.type === "bad-ending"
                    ? "异常结局"
                    : "普通"}
                  )
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SceneSelectSection;
