
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Story } from "@/utils/types";
import { Search } from "lucide-react";

interface LocationSelectorProps {
  locationId: string;
  story: Story;
  updateSceneLocation: (locationId: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  locationId, 
  story, 
  updateSceneLocation 
}) => {
  const [open, setOpen] = useState(false);
  
  // Determine if we should show locations as buttons
  const showLocationsAsButtons = story.locations.length < 6;
  
  const getLocationName = () => {
    const location = story.locations.find(loc => loc.id === locationId);
    return location ? location.name : "选择位置";
  };

  return (
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
              variant={locationId === location.id ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => updateSceneLocation(location.id)}
            >
              {location.name}
            </Button>
          ))}
        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-8 text-sm"
            >
              {getLocationName()}
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="搜索位置..." />
              <CommandEmpty>没有找到位置</CommandEmpty>
              <CommandGroup>
                {story.locations.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => {
                      updateSceneLocation(location.id);
                      setOpen(false);
                    }}
                  >
                    {location.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default LocationSelector;
