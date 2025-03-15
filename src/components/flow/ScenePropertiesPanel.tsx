
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, RotateCcw, AlertCircle } from "lucide-react";
import { Scene, SceneType, Story } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

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
  
  // Determine if we should show locations as buttons
  const showLocationsAsButtons = story.locations.length < 6;
  
  // Check if this scene is incomplete (normal type without next scene or connections)
  const hasNextSceneConnection = 
    selectedScene.nextSceneId || 
    isEndingType ||
    selectedScene.elements.some(element => {
      if (element.type === "choice") {
        return element.options.some(option => option.nextSceneId);
      }
      if (element.type === "qte") {
        return element.successSceneId || element.failureSceneId;
      }
      if (element.type === "dialogueTask") {
        return element.successSceneId || element.failureSceneId;
      }
      return false;
    });
  
  const isIncomplete = selectedScene.type === "normal" && !hasNextSceneConnection;

  return (
    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
      {isIncomplete && (
        <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            此场景处于未完待续状态，没有指定后续场景。
          </AlertDescription>
        </Alert>
      )}
      
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
        <Label className="text-xs block mb-2">
          场景类型
        </Label>
        <RadioGroup 
          value={selectedScene.type} 
          onValueChange={(value: SceneType) => updateSceneType(value)}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="start" id="type-start" />
            <Label htmlFor="type-start" className="text-sm cursor-pointer">开始</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="normal" id="type-normal" />
            <Label htmlFor="type-normal" className="text-sm cursor-pointer">普通</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ending" id="type-ending" />
            <Label htmlFor="type-ending" className="text-sm cursor-pointer">正常结局</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bad-ending" id="type-bad-ending" />
            <Label htmlFor="type-bad-ending" className="text-sm cursor-pointer">异常结局</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="location" className="text-xs block mb-2">
          位置
        </Label>
        
        {showLocationsAsButtons ? (
          <div className="flex flex-wrap gap-2">
            {story.locations.map((location) => (
              <Button
                key={location.id}
                size="sm"
                variant={selectedScene.locationId === location.id ? "default" : "outline"}
                className="text-xs h-7"
                onClick={() => updateSceneLocation(location.id)}
              >
                {location.name}
              </Button>
            ))}
          </div>
        ) : (
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
        )}
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
