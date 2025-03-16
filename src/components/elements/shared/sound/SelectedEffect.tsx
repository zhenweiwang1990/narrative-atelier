
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2, X } from "lucide-react";

interface SelectedEffectProps {
  effect: {
    category: string;
    name: string;
    url: string;
  };
  onPlayPreview: (url: string) => void;
  onRemove: () => void;
}

const SelectedEffect: React.FC<SelectedEffectProps> = ({
  effect,
  onPlayPreview,
  onRemove
}) => {
  return (
    <div className="text-sm p-2 border rounded flex justify-between items-center bg-muted/30">
      <div>
        <span className="font-medium">{effect.name}</span>
        <span className="text-xs text-muted-foreground ml-2">
          ({effect.category})
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={() => onPlayPreview(effect.url)}
        >
          <Volume2 className="h-3 w-3 mr-1" />
          试听
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-100"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default SelectedEffect;
