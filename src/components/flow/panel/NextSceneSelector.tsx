
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Scene } from "@/utils/types";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

interface NextSceneSelectorProps {
  nextSceneId: string | undefined;
  selectedSceneId: string | null;
  scenes: Scene[];
  updateNextScene: (nextSceneId: string) => void;
}

const NextSceneSelector: React.FC<NextSceneSelectorProps> = ({
  nextSceneId,
  selectedSceneId,
  scenes,
  updateNextScene
}) => {
  const [open, setOpen] = useState(false);

  const getSceneName = () => {
    if (!nextSceneId || nextSceneId === "none") return "无（结束或基于选择）";
    
    const scene = scenes.find(s => s.id === nextSceneId);
    if (scene) {
      return `${scene.title} (${scene.type === "start" ? "开始" : scene.type === "ending" ? "正常结局" : scene.type === "bad-ending" ? "异常结局" : "普通"})`;
    }
    return "无（结束或基于选择）";
  };

  const availableScenes = scenes.filter(scene => scene.id !== selectedSceneId);

  return (
    <div>
      <Label htmlFor="nextScene" className="text-xs">
        下一个场景（线性流程）
      </Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-8 text-sm mt-1"
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
                  updateNextScene("");
                  setOpen(false);
                }}
              >
                无（结束或基于选择）
              </CommandItem>
              {availableScenes.map((scene) => (
                <CommandItem
                  key={scene.id}
                  value={scene.id}
                  onSelect={() => {
                    updateNextScene(scene.id);
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
    </div>
  );
};

export default NextSceneSelector;
