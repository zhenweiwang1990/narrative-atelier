
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Wand2 } from "lucide-react";
import { ExternalLink } from "lucide-react";

interface EditorHeaderProps {
  title: string;
  onClose: () => void;
  onAddElement?: () => void;
  showElementActions?: boolean;
  elementType?: string;
  onAiGenerate?: () => void;
  onPopout?: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  onClose,
  onAddElement,
  showElementActions = false,
  elementType,
  onAiGenerate,
  onPopout,
}) => {
  return (
    <div className="px-3 py-2 preview-header flex items-center">
      <h3 className="text-sm font-medium flex-1 preview-header-content">
        {title}
        {elementType && <span className="text-xs font-normal text-foreground/70 ml-2">{elementType}</span>}
      </h3>

      <div className="flex items-center space-x-1">
        {showElementActions && (
          <>
            {onAiGenerate && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                onClick={onAiGenerate}
                title="AI生成内容"
              >
                <Wand2 className="h-3 w-3" />
              </Button>
            )}
            {onAddElement && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                onClick={onAddElement}
                title="添加新元素"
              >
                <Plus className="h-3 w-3" />
              </Button>
            )}
          </>
        )}
        
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
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
