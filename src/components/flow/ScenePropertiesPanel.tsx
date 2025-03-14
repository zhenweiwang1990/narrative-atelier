import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, RotateCcw } from "lucide-react";
import { Scene, SceneType, Story } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScenePropertiesPanelProps {
  selectedScene: Scene;
  story: Story;
  updateSceneTitle: (newTitle: string) => void;
  updateSceneType: (newType: SceneType) => void;
  updateSceneLocation: (locationId: string) => void;
  updateNextScene: (nextSceneId: string) => void;
  updateRevivalPoint?: (sceneId: string) => void;
  selectedSceneId: string;
}

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
  const isEndingType =
    selectedScene.type === "ending" || selectedScene.type === "bad-ending";

  return (
    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
      <div>
        <Label htmlFor="title" className="text-xs">
          标题
        </Label>
        <Input
          id="title"
          value={selectedScene.title}
          onChange={(e) => updateSceneTitle(e.target.value)}
          className="h-8 text-sm"
        />
      </div>

      <div>
        <Label htmlFor="type" className="text-xs">
          场景类型
        </Label>
        <Select
          value={selectedScene.type}
          onValueChange={(value: SceneType) => updateSceneType(value)}
        >
          <SelectTrigger id="type" className="h-8 text-sm">
            <SelectValue placeholder="选择类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="start">开始</SelectItem>
            <SelectItem value="normal">普通</SelectItem>
            <SelectItem value="ending">正常结局</SelectItem>
            <SelectItem value="bad-ending">异常结局</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location" className="text-xs">
          位置
        </Label>
        <Select
          value={selectedScene.locationId}
          onValueChange={updateSceneLocation}
        >
          <SelectTrigger id="location" className="h-8 text-sm">
            <SelectValue placeholder="选择位置" />
          </SelectTrigger>
          <SelectContent>
            {story.locations.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!isEndingType && (
        <div>
          <Label htmlFor="nextScene" className="text-xs">
            下一个场景（线性流程）
          </Label>
          <Select
            value={selectedScene.nextSceneId || "none"}
            onValueChange={(value) =>
              updateNextScene(value === "none" ? "" : value)
            }
          >
            <SelectTrigger id="nextScene" className="h-8 text-sm">
              <SelectValue placeholder="选择下一个场景" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">无（结束或基于选择）</SelectItem>
              {story.scenes
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
      )}

      {selectedScene.type === "bad-ending" && updateRevivalPoint && (
        <div>
          <Label htmlFor="revivalPoint" className="text-xs flex items-center">
            <RotateCcw className="h-3 w-3 mr-1 text-red-500" /> 复活点
          </Label>
          <Select
            value={selectedScene.revivalPointId || "none"}
            onValueChange={(value) =>
              updateRevivalPoint(value === "none" ? "" : value)
            }
          >
            <SelectTrigger id="revivalPoint" className="h-8 text-sm">
              <SelectValue placeholder="选择复活点" />
            </SelectTrigger>
            <SelectContent>
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
      )}

      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
        <Edit className="h-3 w-3" />
        <span>在图表中设置场景连接，或切换到内容选项卡。</span>
      </div>
    </div>
  );
};

export default ScenePropertiesPanel;
