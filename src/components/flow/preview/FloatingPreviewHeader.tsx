
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, X, Minimize, Maximize } from "lucide-react";

interface FloatingPreviewHeaderProps {
  title: string;
  minimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

const FloatingPreviewHeader: React.FC<FloatingPreviewHeaderProps> = ({
  title,
  minimized,
  onToggleMinimize,
  onClose,
  onMouseDown,
}) => {
  return (
    <div
      className="px-3 py-2 border-b bg-muted/50 flex items-center cursor-move"
      onMouseDown={onMouseDown}
    >
      <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
      <h3 className="text-sm font-medium flex-1">{title}</h3>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onToggleMinimize}
        >
          {minimized ? (
            <Maximize className="h-3 w-3" />
          ) : (
            <Minimize className="h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default FloatingPreviewHeader;
