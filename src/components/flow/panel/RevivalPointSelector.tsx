
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Scene } from "@/utils/types";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RotateCcw, Search } from "lucide-react";

interface RevivalPointSelectorProps {
  revivalPointId: string | undefined;
  selectedSceneId: string | null;
  scenes: Scene[];
  updateRevivalPoint: (sceneId: string) => void;
}

const RevivalPointSelector: React.FC<RevivalPointSelectorProps> = ({
  revivalPointId,
  selectedSceneId,
  scenes,
  updateRevivalPoint
}) => {
  const [open, setOpen] = useState(false);

  const getSceneName = () => {
    if (!revivalPointId || revivalPointId === "none") return "无";
    
    const scene = scenes.find(s => s.id === revivalPointId);
    if (scene) {
      return `${scene.title} (${scene.type === "start" ? "开始" : scene.type === "ending" ? "正常结局" : "普通"})`;
    }
    return "无";
  };

  const availableScenes = scenes
    .filter(scene => scene.id !== selectedSceneId && scene.type !== "bad-ending");

  return (
    <div>
      <Label htmlFor="revivalPoint" className="text-xs flex items-center">
        <RotateCcw className="h-3 w-3 mr-1 text-red-500" /> 复活点
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
            <CommandInput placeholder="搜索复活点..." />
            <CommandEmpty>没有找到适合的场景</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="none"
                onSelect={() => {
                  updateRevivalPoint("");
                  setOpen(false);
                }}
              >
                无
              </CommandItem>
              {availableScenes.map((scene) => (
                <CommandItem
                  key={scene.id}
                  value={scene.id}
                  onSelect={() => {
                    updateRevivalPoint(scene.id);
                    setOpen(false);
                  }}
                >
                  {scene.title} (
                  {scene.type === "start"
                    ? "开始"
                    : scene.type === "ending"
                    ? "正常结局"
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

export default RevivalPointSelector;
