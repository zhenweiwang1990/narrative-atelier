
import React from 'react';
import { Button } from '@/components/ui/button';
import { ElementType, SceneElement } from '@/utils/types';
import { AlignLeft, MessageSquare, Brain, ListTree, Gamepad, MessagesSquare, ChevronDown, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AccordionTrigger } from '@/components/ui/accordion';

interface ElementHeaderProps {
  element: SceneElement;
  index: number;
  totalElements: number;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
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

export const ElementHeader: React.FC<ElementHeaderProps> = ({
  element,
  onSelect,
  onDelete,
  isDragging,
  dragHandleProps
}) => {
  return (
    <div 
      className={cn(
        "flex items-center space-x-2 p-2 bg-muted/20 cursor-grab",
        isDragging && "bg-muted shadow-md"
      )}
      {...dragHandleProps}
    >
      <div 
        className={cn(
          "w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium",
          getElementColorClass(element.type)
        )}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(element.id);
        }}
      >
        {getElementTypeLabel(element.type)}
      </div>
      
      <AccordionTrigger className="hover:no-underline py-0 flex-1 justify-between" onClick={() => onSelect(element.id)}>
        <div className="flex items-center space-x-2">
          {getElementIcon(element.type)}
          <h3 className="font-medium capitalize text-sm">{element.type}</h3>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionTrigger>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="h-6 w-6 text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(element.id);
        }}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};
