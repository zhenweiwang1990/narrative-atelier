
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Lock, Unlock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface OptionHeaderProps {
  optIdx: number;
  onDelete: () => void;
  disableDelete: boolean;
  isLocked: boolean;
  onLockToggle: () => void;
}

const OptionHeader: React.FC<OptionHeaderProps> = ({
  optIdx,
  onDelete,
  disableDelete,
  isLocked,
  onLockToggle
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <Label className="text-xs">选项 {optIdx + 1}</Label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`lock-checkbox-${optIdx}`} 
            checked={isLocked} 
            onCheckedChange={onLockToggle}
          />
          <Label htmlFor={`lock-checkbox-${optIdx}`} className="text-xs flex items-center">
            {isLocked ? (
              <>
                <Lock className="h-3 w-3 text-amber-500 mr-1" /> 锁定
              </>
            ) : (
              <>
                <Unlock className="h-3 w-3 text-green-500 mr-1" /> 未锁定
              </>
            )}
          </Label>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 text-destructive"
        onClick={onDelete}
        disabled={disableDelete}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default OptionHeader;
