
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SceneType } from "@/utils/types";

interface SceneTypeSelectorProps {
  type: SceneType;
  updateSceneType: (newType: SceneType) => void;
}

const SceneTypeSelector: React.FC<SceneTypeSelectorProps> = ({ type, updateSceneType }) => {
  return (
    <div>
      <Label className="text-xs block mb-2">
        场景类型
      </Label>
      <RadioGroup 
        value={type} 
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
  );
};

export default SceneTypeSelector;
