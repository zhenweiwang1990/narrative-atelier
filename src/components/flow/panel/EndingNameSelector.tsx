
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock data for ending names
const endingNameSuggestions = [
  "双宿双飞", "遗憾离场", "功德圆满", "独行天涯", 
  "有情人终成眷属", "缘尽于此", "未完待续", "梦醒时分",
  "阴阳两隔", "生死相依", "缘起缘灭", "山高水长",
  "剑走偏锋", "半生缘", "长相守", "转角遇见爱",
  "刻骨铭心", "落花流水", "云散高唐", "浮生若梦"
];

interface EndingNameSelectorProps {
  endingName: string;
  updateEndingName: (name: string) => void;
}

const EndingNameSelector: React.FC<EndingNameSelectorProps> = ({
  endingName,
  updateEndingName
}) => {
  const [endingNameText, setEndingNameText] = useState(endingName || "");

  // Handle ending name input change
  const handleEndingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndingNameText(e.target.value);
    updateEndingName(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setEndingNameText(suggestion);
    updateEndingName(suggestion);
  };

  return (
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
  );
};

export default EndingNameSelector;
