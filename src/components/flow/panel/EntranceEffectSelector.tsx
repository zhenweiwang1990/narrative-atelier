
import React from "react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data for effects
const entranceEffects = [
  { id: "fade", label: "淡入淡出" },
  { id: "slide", label: "滑动" },
  { id: "zoom", label: "缩放" },
  { id: "flip", label: "翻转" },
  { id: "bounce", label: "弹跳" }
];

interface EntranceEffectSelectorProps {
  effect: string;
  updateEffect: (value: string) => void;
}

const EntranceEffectSelector: React.FC<EntranceEffectSelectorProps> = ({
  effect,
  updateEffect
}) => {
  return (
    <div className="space-y-1 mt-4">
      <Label htmlFor="entranceEffect">入场特效</Label>
      <Select 
        defaultValue={effect || "fade"}
        onValueChange={(value) => updateEffect(value)}
      >
        <SelectTrigger id="entranceEffect" className="h-9">
          <SelectValue placeholder="选择入场特效" />
        </SelectTrigger>
        <SelectContent className="z-[200]">
          {entranceEffects.map((effect) => (
            <SelectItem key={effect.id} value={effect.id}>{effect.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EntranceEffectSelector;
