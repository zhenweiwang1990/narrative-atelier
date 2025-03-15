
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface LocationHeaderProps {
  onAddLocation: () => void;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({
  onAddLocation,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">地点</h1>
        <p className="text-sm text-muted-foreground">
          管理您剧情的地点和背景。
        </p>
      </div>

      <Button size="sm" onClick={onAddLocation}>
        <Plus className="h-4 w-4 mr-2" /> 添加地点
      </Button>
    </div>
  );
};

export default LocationHeader;
