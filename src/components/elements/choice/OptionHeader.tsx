
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface OptionHeaderProps {
  optIdx: number;
  onDelete: () => void;
  disableDelete: boolean;
}

const OptionHeader: React.FC<OptionHeaderProps> = ({
  optIdx,
  onDelete,
  disableDelete
}) => {
  return (
    <div className="flex justify-between items-start mb-1">
      <Label className="text-xs">选项 {optIdx + 1}</Label>

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
