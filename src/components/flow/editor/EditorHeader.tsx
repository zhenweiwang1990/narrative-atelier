
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, FilePlus, Sparkles } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ElementType } from "@/utils/types";
import { getElementTypeLabel } from "@/components/elements/ElementHeader";

interface EditorHeaderProps {
  title: string;
  onClose: () => void;
  handleAddElement?: (type: string, position?: 'before' | 'after') => void;
  showElementActions?: boolean;
  elementType?: ElementType;
  onAiGenerate?: () => void;
  onPopout?: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  onClose,
  handleAddElement,
  showElementActions = false,
  elementType,
  onAiGenerate,
  onPopout,
}) => {
  const elementTypes = [
    { value: "narration", label: "旁白" },
    { value: "dialogue", label: "对话" },
    { value: "thought", label: "想法" },
    { value: "choice", label: "选择" },
    { value: "qte", label: "QTE" },
    { value: "dialogueTask", label: "对话任务" },
  ];

  // Helper function to get the element type display name
  const getElementTypeDisplayName = (type?: ElementType) => {
    if (!type) return "";
    
    const typeMap: Record<ElementType, string> = {
      narration: "旁白",
      dialogue: "对话",
      thought: "想法",
      choice: "选择",
      qte: "QTE",
      dialogueTask: "对话任务"
    };
    
    return typeMap[type];
  };

  // Construct the title with element type if available
  const headerTitle = elementType 
    ? `${title} - ${getElementTypeDisplayName(elementType)}`
    : title;

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <h2 className="font-medium text-sm">{headerTitle}</h2>
      
      <div className="flex items-center gap-1">
        {showElementActions && (
          <>
            {handleAddElement && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <FilePlus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {elementTypes.map((type) => (
                      <DropdownMenuItem 
                        key={`before-${type.value}`}
                        onClick={() => handleAddElement(type.value, 'before')}
                      >
                        在此元素前添加{type.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {elementTypes.map((type) => (
                      <DropdownMenuItem 
                        key={`after-${type.value}`}
                        onClick={() => handleAddElement(type.value, 'after')}
                      >
                        在此元素后添加{type.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {onAiGenerate && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-purple-500"
                onClick={onAiGenerate}
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
        
        {onPopout && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground"
            onClick={onPopout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
