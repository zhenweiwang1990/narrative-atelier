
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Story } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  // Determine if we should show locations as buttons
  const showLocationsAsButtons = story.locations.length < 6;
  
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
        <Select
          value={locationId}
          onValueChange={updateSceneLocation}
        >
          <SelectTrigger id="location" className="h-8 text-sm">
            <SelectValue placeholder="选择位置" />
          </SelectTrigger>
          <SelectContent>
            {story.locations.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default LocationSelector;
