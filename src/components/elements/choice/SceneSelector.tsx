
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scene } from "@/utils/types";
import AiSceneSelector from "./AiSceneSelector";

interface SceneSelectorProps {
  nextSceneId: string | undefined;
  scenes: Scene[];
  onSceneChange: (value: string) => void;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({
  nextSceneId,
  scenes,
  onSceneChange
}) => {
  return (
    <div>
      <Label className="text-xs">下一个场景</Label>
      <Select
        value={nextSceneId || "none"}
        onValueChange={onSceneChange}
      >
        <SelectTrigger className="mt-1 h-7 text-xs">
          <SelectValue placeholder="选择下一个场景" />
        </SelectTrigger>
        <SelectContent className="z-[1100]">
          <SelectGroup>
            <SelectItem value="none">不指定</SelectItem>
            <SelectItem value="ai-branch" className="text-blue-600">AI 写支线</SelectItem>
            <SelectItem value="ai-ending" className="text-purple-600">AI 写结局</SelectItem>
            {scenes.map((scene) => (
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
          </SelectGroup>
        </SelectContent>
      </Select>

      <AiSceneSelector 
        nextSceneId={nextSceneId} 
        onAiSceneSelect={(type) => onSceneChange(type === 'branch' ? 'ai-branch' : 'ai-ending')}
        scenes={scenes}
      />
    </div>
  );
};

export default SceneSelector;
