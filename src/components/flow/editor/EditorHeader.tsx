
import React from "react";
import { X, Plus, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElementType } from "@/utils/types";

interface EditorHeaderProps {
  title: string;
  onClose: () => void;
  onAddElement?: () => void; // This was expecting a no-argument function
  handleAddElement?: (type: ElementType, position: 'before' | 'after') => void; // Add the new prop
  showElementActions?: boolean;
  elementType?: ElementType;
  onAiGenerate?: () => void;
  onPopout?: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  onClose,
  onAddElement,
  handleAddElement, // New prop with the correct function signature
  showElementActions = false,
  elementType,
  onAiGenerate,
  onPopout,
}) => {
  // Create a menu for adding elements before/after when clicking the "Add" button
  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use the dropdown menu to choose position and element type
    if (handleAddElement && elementType) {
      // For now, let's default to adding the same type of element after
      handleAddElement(elementType, 'after');
    } else if (onAddElement) {
      // Fallback to original behavior if available
      onAddElement();
    }
  };
  
  return (
    <div className="p-3 flex items-center justify-between border-b bg-[hsl(var(--preview-header))] text-[hsl(var(--preview-header-foreground))]">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="flex items-center space-x-1">
        {showElementActions && (
          <>
            {onPopout && (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 text-[hsl(var(--preview-header-foreground))]"
                onClick={onPopout}
                title="弹出编辑"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            {onAiGenerate && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[hsl(var(--preview-header-foreground))]"
                onClick={onAiGenerate}
                title="AI生成内容"
              >
                <Zap className="h-4 w-4" />
              </Button>
            )}
            {(handleAddElement || onAddElement) && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[hsl(var(--preview-header-foreground))]"
                onClick={handleAddClick}
                title="在此元素后添加新元素"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[hsl(var(--preview-header-foreground))]"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
