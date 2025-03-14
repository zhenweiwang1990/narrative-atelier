
import React from 'react';
import { Button } from '@/components/ui/button';
import { ElementType, SceneElement } from '@/utils/types';
import { AlignLeft, MessageSquare, Brain, ListTree, Gamepad, MessagesSquare, MoveUp, MoveDown, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AccordionTrigger } from '@/components/ui/accordion';

interface ElementHeaderProps {
  element: SceneElement;
  index: number;
  totalElements: number;
  onSelect: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (id: string) => void;
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

export const ElementHeader: React.FC<ElementHeaderProps> = ({
  element,
  index,
  totalElements,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDelete
}) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-muted/20">
      <div 
        className={cn(
          "w-4 h-4 rounded cursor-pointer",
          getElementColorClass(element.type)
        )}
        onClick={() => onSelect(element.id)}
      />
      
      <AccordionTrigger className="hover:no-underline py-0 flex-1" onClick={() => onSelect(element.id)}>
        <div className="flex items-center space-x-2">
          {getElementIcon(element.type)}
          <h3 className="font-medium capitalize text-sm">{element.type}</h3>
        </div>
      </AccordionTrigger>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
        >
          <MoveUp className="h-3 w-3" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6"
          onClick={() => onMoveDown(index)}
          disabled={index === totalElements - 1}
        >
          <MoveDown className="h-3 w-3" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-6 w-6 text-destructive"
          onClick={() => onDelete(element.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
