
import React, { useState } from "react";
import { ScenePropertiesPanelProps } from "./types/panelTypes";
import { checkSceneCompletion, isEndingType } from "./utils/sceneUtils";
import IncompleteSceneAlert from "./panel/IncompleteSceneAlert";
import SceneTitleInput from "./panel/SceneTitleInput";
import SceneTypeSelector from "./panel/SceneTypeSelector";
import LocationSelector from "./panel/LocationSelector";
import NextSceneSelector from "./panel/NextSceneSelector";
import RevivalPointSelector from "./panel/RevivalPointSelector";
import SceneEditHint from "./panel/SceneEditHint";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

// Mock data for effects
const entranceEffects = [
  { id: "fade", label: "淡入淡出" },
  { id: "slide", label: "滑动" },
  { id: "zoom", label: "缩放" },
  { id: "flip", label: "翻转" },
  { id: "bounce", label: "弹跳" }
];

const environmentEffects = [
  { id: "none", label: "无" },
  { id: "rain", label: "雨天" },
  { id: "snow", label: "下雪" },
  { id: "fog", label: "雾气" },
  { id: "autumn", label: "落叶" },
  { id: "fireflies", label: "萤火虫" }
];

// Mock data for ending names
const endingNameSuggestions = [
  "双宿双飞", "遗憾离场", "功德圆满", "独行天涯", 
  "有情人终成眷属", "缘尽于此", "未完待续", "梦醒时分",
  "阴阳两隔", "生死相依", "缘起缘灭", "山高水长",
  "剑走偏锋", "半生缘", "长相守", "转角遇见爱",
  "刻骨铭心", "落花流水", "云散高唐", "浮生若梦"
];

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
}: ScenePropertiesPanelProps) => {
  const sceneIsIncomplete = checkSceneCompletion(selectedScene);
  const sceneIsEndingType = isEndingType(selectedScene);
  
  // Local state for suggested ending names
  const [endingNameText, setEndingNameText] = useState(selectedScene.endingName || "");

  // Handle ending name input change
  const handleEndingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndingNameText(e.target.value);
    if (updateEndingName) {
      updateEndingName(e.target.value);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setEndingNameText(suggestion);
    if (updateEndingName) {
      updateEndingName(suggestion);
    }
  };

  return (
    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
      <IncompleteSceneAlert isIncomplete={sceneIsIncomplete} />
      
      <SceneTitleInput 
        title={selectedScene.title} 
        updateSceneTitle={updateSceneTitle} 
      />

      <SceneTypeSelector 
        type={selectedScene.type} 
        updateSceneType={updateSceneType}
      />

      <LocationSelector 
        locationId={selectedScene.locationId} 
        story={story}
        updateSceneLocation={updateSceneLocation}
      />

      {/* Entrance Effect Selector */}
      <div className="space-y-1 mt-4">
        <Label htmlFor="entranceEffect">入场特效</Label>
        <Select 
          defaultValue={selectedScene.entranceEffect || "fade"}
          onValueChange={(value) => updateSceneEntrance && updateSceneEntrance(value)}
        >
          <SelectTrigger id="entranceEffect">
            <SelectValue placeholder="选择入场特效" />
          </SelectTrigger>
          <SelectContent>
            {entranceEffects.map((effect) => (
              <SelectItem key={effect.id} value={effect.id}>{effect.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Environment Effect Selector */}
      <div className="space-y-2 mt-4">
        <Label>环境特效</Label>
        <RadioGroup 
          defaultValue={selectedScene.environmentEffect || "none"}
          onValueChange={(value) => updateSceneEnvironment && updateSceneEnvironment(value)}
          className="grid grid-cols-2 gap-2"
        >
          {environmentEffects.map((effect) => (
            <div key={effect.id} className="flex items-center space-x-2">
              <RadioGroupItem value={effect.id} id={`environment-${effect.id}`} />
              <Label htmlFor={`environment-${effect.id}`}>{effect.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Ending name field for ending-type scenes */}
      {sceneIsEndingType && updateEndingName && (
        <div className="space-y-2 mt-4 p-3 border rounded-md">
          <Label htmlFor="endingName">结局名称</Label>
          <Input 
            id="endingName" 
            placeholder="输入结局名称" 
            value={endingNameText}
            onChange={handleEndingNameChange}
          />
          
          <div className="mt-2">
            <Label className="text-xs text-muted-foreground">推荐结局名：</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {endingNameSuggestions.slice(0, 8).map((name) => (
                <Button 
                  key={name} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSuggestionClick(name)}
                  className="text-xs"
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!sceneIsEndingType && (
        <NextSceneSelector
          nextSceneId={selectedScene.nextSceneId}
          selectedSceneId={selectedSceneId}
          story={story}
          updateNextScene={updateNextScene}
        />
      )}

      {selectedScene.type === "bad-ending" && updateRevivalPoint && (
        <RevivalPointSelector
          revivalPointId={selectedScene.revivalPointId}
          selectedSceneId={selectedSceneId}
          story={story}
          updateRevivalPoint={updateRevivalPoint}
        />
      )}

      <SceneEditHint />
    </div>
  );
};

export default ScenePropertiesPanel;
