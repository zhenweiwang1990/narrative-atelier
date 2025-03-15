
import React from 'react';
import { Button } from '@/components/ui/button';
import { ElementType, SceneElement } from '@/utils/types';
import { AlignLeft, MessageSquare, Brain, ListTree, Gamepad, MessagesSquare, ChevronDown, Trash2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElementHeaderProps {
  element: SceneElement;
  index: number;
  totalElements: number;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onAiGenerate?: (id: string) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
  isExpanded?: boolean;
}

export const getElementIcon = (type: ElementType) => {
  switch (type) {
    case 'narration': return <AlignLeft className="h-4 w-4" />;
    case 'dialogue': return <MessageSquare className="h-4 w-4" />;
    case 'thought': return <Brain className="h-4 w-4" />;
    case 'choice': return <ListTree className="h-4 w-4" />;
    case 'qte': return <Gamepad className="h-4 w-4" />;
    case 'dialogueTask': return <MessagesSquare className="h-4 w-4" />;
  }
};

export const getElementColorClass = (type: ElementType) => {
  switch (type) {
    case 'narration': return 'bg-gray-400';
    case 'dialogue': return 'bg-blue-400';
    case 'thought': return 'bg-purple-400';
    case 'choice': return 'bg-amber-400';
    case 'qte': return 'bg-red-400';
    case 'dialogueTask': return 'bg-green-400';
  }
};

export const getElementTypeLabel = (type: ElementType) => {
  switch (type) {
    case 'narration': return '旁';
    case 'dialogue': return '话';
    case 'thought': return '想';
    case 'choice': return '选';
    case 'qte': return '游';
    case 'dialogueTask': return '任';
  }
};

// Function to get content preview based on element type
export const getElementContentPreview = (element: SceneElement): string => {
  switch (element.type) {
    case 'narration':
    case 'dialogue':
    case 'thought':
      return element.text ? 
        (element.text.length > 40 ? `${element.text.substring(0, 40)}...` : element.text) : 
        '(空内容)';
    case 'choice':
      return element.text ? 
        (element.text.length > 40 ? `${element.text.substring(0, 40)}...` : element.text) : 
        '(选项提示)';
    case 'qte':
      return element.description ? 
        (element.description.length > 40 ? `${element.description.substring(0, 40)}...` : element.description) : 
        '(QTE描述)';
    case 'dialogueTask':
      return element.goal ? 
        (element.goal.length > 40 ? `${element.goal.substring(0, 40)}...` : element.goal) : 
        '(对话任务)';
    default:
      return '(无预览)';
  }
};

export const ElementHeader: React.FC<ElementHeaderProps> = ({
  element,
  onSelect,
  onDelete,
  onAiGenerate,
  isDragging,
  dragHandleProps,
  isExpanded
}) => {
  return (
    <div 
      className={cn(
        "flex items-center space-x-2 p-2 bg-muted/20 cursor-pointer",
        isDragging && "bg-muted shadow-md"
      )}
      {...dragHandleProps}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id);
      }}
    >
      <div 
        className={cn(
          "w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium shrink-0",
          getElementColorClass(element.type)
        )}
      >
        {getElementTypeLabel(element.type)}
      </div>
      
      <div className="flex-1 truncate">
        <p className="font-medium text-sm truncate">
          {getElementContentPreview(element)}
        </p>
      </div>
      
      {onAiGenerate && (
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 text-purple-500 shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onAiGenerate(element.id);
          }}
          title="AI 生成内容"
        >
          <Sparkles className="h-3 w-3" />
        </Button>
      )}
      
      <Button 
        variant="ghost" 
        size="icon"
        className="h-6 w-6 text-destructive shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(element.id);
        }}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
      
      <ChevronDown 
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isExpanded ? "rotate-180" : "rotate-0"
        )} 
      />
    </div>
  );
};
