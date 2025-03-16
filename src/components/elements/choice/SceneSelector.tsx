
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Scene } from "@/utils/types";
import { Search } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  const getSceneName = () => {
    if (!nextSceneId || nextSceneId === "none") return "不指定";
    if (nextSceneId === "ai-branch") return "AI 写支线";
    if (nextSceneId === "ai-ending") return "AI 写结局";
    
    const scene = scenes.find(s => s.id === nextSceneId);
    if (scene) {
      return `${scene.title} (${scene.type === "start" ? "开始" : scene.type === "ending" ? "正常结局" : scene.type === "bad-ending" ? "异常结局" : "普通"})`;
    }
    return "不指定";
  };

  return (
    <div>
      <Label className="text-xs">下一个场景</Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between mt-1"
          >
            {getSceneName()}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="搜索场景..." />
            <CommandEmpty>没有找到场景</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="none"
                onSelect={() => {
                  onSceneChange("none");
                  setOpen(false);
                }}
              >
                不指定
              </CommandItem>
              <CommandItem
                value="ai-branch"
                className="text-blue-600"
                onSelect={() => {
                  onSceneChange("ai-branch");
                  setOpen(false);
                }}
              >
                AI 写支线
              </CommandItem>
              <CommandItem
                value="ai-ending"
                className="text-purple-600"
                onSelect={() => {
                  onSceneChange("ai-ending");
                  setOpen(false);
                }}
              >
                AI 写结局
              </CommandItem>
              {scenes.map((scene) => (
                <CommandItem
                  key={scene.id}
                  value={scene.id}
                  onSelect={() => {
                    onSceneChange(scene.id);
                    setOpen(false);
                  }}
                >
                  {scene.title} (
                  {scene.type === "start"
                    ? "开始"
                    : scene.type === "ending"
                    ? "正常结局"
                    : scene.type === "bad-ending"
                    ? "异常结局"
                    : "普通"}
                  )
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <AiSceneSelector 
        nextSceneId={nextSceneId} 
        onAiSceneSelect={(type) => onSceneChange(type === 'branch' ? 'ai-branch' : 'ai-ending')}
        scenes={scenes}
      />
    </div>
  );
};

export default SceneSelector;
