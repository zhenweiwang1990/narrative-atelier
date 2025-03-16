
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, X, Minimize, Maximize, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FloatingPreviewHeaderProps {
  title: string;
  sceneTitle?: string;
  minimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onPopout?: () => void; // New prop for popup functionality
  progress?: { current: number; total: number }; // New prop for progress display
}

const FloatingPreviewHeader: React.FC<FloatingPreviewHeaderProps> = ({
  title,
  sceneTitle,
  minimized,
  onToggleMinimize,
  onClose,
  onMouseDown,
  onPopout,
  progress,
}) => {
  // Calculate progress percentage
  const progressPercentage = progress && progress.total > 0 
    ? Math.round((progress.current / progress.total) * 100) 
    : 0;

  return (
    <div
      className="px-3 py-2 preview-header flex items-center cursor-move"
      onMouseDown={onMouseDown}
    >
      <MapPin className="h-3.5 w-3.5 mr-1.5 text-foreground/80" />
      <h3 className="text-sm font-medium flex-1 preview-header-content">
        {title}
        {sceneTitle && (
          <span className="text-xs font-normal text-foreground/70 ml-2">
            {sceneTitle}
          </span>
        )}
        
        {/* Progress indicator */}
        {progress && progress.total > 0 && (
          <span className="text-xs font-normal text-foreground/70 ml-2">
            {progress.current}/{progress.total}
          </span>
        )}
      </h3>

      <div className="flex items-center space-x-1">
        {onPopout && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
            onClick={onPopout}
            title="在新窗口打开"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
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
          className="h-6 w-6 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default FloatingPreviewHeader;
