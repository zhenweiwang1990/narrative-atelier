
import React from "react";
import { X, Plus, Zap, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElementType } from "@/utils/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ElementTypeButtons from "@/components/elements/ElementTypeButtons";
import { getElementTypeLabel } from "@/components/elements/ElementHeader";

interface EditorHeaderProps {
  title: string;
  onClose: () => void;
  onAddElement?: () => void; 
  handleAddElement?: (type: ElementType, position: 'before' | 'after') => void;
  showElementActions?: boolean;
  elementType?: ElementType;
  onAiGenerate?: () => void;
  onPopout?: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  onClose,
  onAddElement,
  handleAddElement,
  showElementActions = false,
  elementType,
  onAiGenerate,
  onPopout,
}) => {
  // Get human-readable element type description
  const getElementTypeDisplay = (type?: ElementType) => {
    if (!type) return "";
    
    switch (type) {
      case "narration": return "旁白";
      case "dialogue": return "对话";
      case "thought": return "思考";
      case "choice": return "选择";
      case "qte": return "游戏互动";
      case "dialogueTask": return "对话任务";
      default: return "";
    }
  };

  const elementTypeDisplay = getElementTypeDisplay(elementType);
  const headerTitle = elementTypeDisplay 
    ? `${title} - ${elementTypeDisplay}` 
    : title;
  
  return (
    <div className="p-3 flex items-center justify-between border-b bg-[hsl(var(--preview-header))] text-[hsl(var(--preview-header-foreground))]">
      <h3 className="text-sm font-medium">{headerTitle}</h3>
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
            {handleAddElement && elementType && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[hsl(var(--preview-header-foreground))]"
                      title="在此元素前添加新元素"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="p-2 flex-col items-start">
                        <p className="text-xs text-muted-foreground mb-1 w-full">在此元素前添加：</p>
                        <ElementTypeButtons 
                          onAddElement={(type) => handleAddElement(type, 'before')} 
                        />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[hsl(var(--preview-header-foreground))]"
                      title="在此元素后添加新元素"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="p-2 flex-col items-start">
                        <p className="text-xs text-muted-foreground mb-1 w-full">在此元素后添加：</p>
                        <ElementTypeButtons 
                          onAddElement={(type) => handleAddElement(type, 'after')} 
                        />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
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
