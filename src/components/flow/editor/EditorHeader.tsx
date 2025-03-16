
import React from "react";
import { Button } from "@/components/ui/button";
import { PencilLine, X, Plus, ArrowLeft, ArrowRight, Wand2, ExternalLink } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ElementType } from "@/utils/types";
import { getElementColorClass, getElementTypeLabel } from "./ElementTypeUtils";
import { cn } from "@/lib/utils";

interface EditorHeaderProps {
  title: string;
  onClose: () => void;
  onAddElement?: (type: ElementType, position: 'before' | 'after') => void;
  showElementActions?: boolean;
  elementType?: ElementType;
  onAiGenerate?: () => void;
  onPopout?: () => void; // New prop for popup functionality
}

const ElementTypeOptions: ElementType[] = [
  "narration",
  "dialogue",
  "thought",
  "choice",
  "qte",
  "dialogueTask"
];

const ElementTypeLabels: Record<ElementType, string> = {
  "narration": "旁白",
  "dialogue": "对话",
  "thought": "内心 OS",
  "choice": "选择",
  "qte": "快速反应",
  "dialogueTask": "对话任务"
};

const EditorHeader: React.FC<EditorHeaderProps> = ({ 
  title, 
  onClose, 
  onAddElement,
  showElementActions = false,
  elementType,
  onAiGenerate,
  onPopout
}) => {
  return (
    <div className="px-3 py-2 border-b bg-muted/50 flex items-center">
      {elementType ? (
        <div 
          className={cn(
            "w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium mr-1.5",
            getElementColorClass(elementType)
          )}
        >
          {getElementTypeLabel(elementType)}
        </div>
      ) : (
        <PencilLine className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
      )}
      <h3 className="text-sm font-medium flex-1">{title}</h3>
      
      <div className="flex items-center mr-1 space-x-1">
        {showElementActions && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 relative">
                  <ArrowLeft className="h-3 w-3" />
                  <Plus className="h-2 w-2 absolute top-1 left-1" />
                  <span className="sr-only">在前添加</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[100]">
                {ElementTypeOptions.map((type) => (
                  <DropdownMenuItem 
                    key={`before-${type}`}
                    onClick={() => onAddElement && onAddElement(type, 'before')}
                  >
                    在此元素前添加{ElementTypeLabels[type]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 relative">
                  <ArrowRight className="h-3 w-3" />
                  <Plus className="h-2 w-2 absolute top-1 right-1" />
                  <span className="sr-only">在后添加</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[100]">
                {ElementTypeOptions.map((type) => (
                  <DropdownMenuItem 
                    key={`after-${type}`}
                    onClick={() => onAddElement && onAddElement(type, 'after')}
                  >
                    在此元素后添加{ElementTypeLabels[type]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        
        {onAiGenerate && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onAiGenerate} 
            className="h-6 w-6 text-purple-600"
            title="AI 生成内容"
          >
            <Wand2 className="h-3 w-3" />
          </Button>
        )}
        
        {onPopout && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onPopout}
            title="在新窗口打开"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        )}
      </div>

      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default EditorHeader;
