
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  
  const getEffectName = () => {
    const selectedEffect = entranceEffects.find(e => e.id === effect);
    return selectedEffect ? selectedEffect.label : "淡入淡出";
  };

  return (
    <div className="space-y-1 mt-4">
      <Label htmlFor="entranceEffect">入场特效</Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-9 mt-1"
          >
            {getEffectName()}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="搜索特效..." />
            <CommandEmpty>没有找到特效</CommandEmpty>
            <CommandGroup>
              {entranceEffects.map((effect) => (
                <CommandItem
                  key={effect.id}
                  value={effect.id}
                  onSelect={() => {
                    updateEffect(effect.id);
                    setOpen(false);
                  }}
                >
                  {effect.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EntranceEffectSelector;
