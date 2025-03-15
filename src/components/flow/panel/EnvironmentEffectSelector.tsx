
import React from "react";
import { Label } from "@/components/ui/label";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";

// Mock data for environment effects
const environmentEffects = [
  { id: "none", label: "无" },
  { id: "rain", label: "雨天" },
  { id: "snow", label: "下雪" },
  { id: "fog", label: "雾气" },
  { id: "autumn", label: "落叶" },
  { id: "fireflies", label: "萤火虫" }
];

interface EnvironmentEffectSelectorProps {
  effect: string;
  updateEffect: (value: string) => void;
}

const EnvironmentEffectSelector: React.FC<EnvironmentEffectSelectorProps> = ({
  effect,
  updateEffect
}) => {
  return (
    <div className="space-y-2 mt-4">
      <Label>环境特效</Label>
      <RadioGroup 
        defaultValue={effect || "none"}
        onValueChange={(value) => updateEffect(value)}
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
  );
};

export default EnvironmentEffectSelector;
