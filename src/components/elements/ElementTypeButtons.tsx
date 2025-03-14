
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlignLeft, MessageSquare, Brain, ListTree, Gamepad, MessagesSquare } from 'lucide-react';
import { ElementType } from '@/utils/types';

interface ElementTypeButtonsProps {
  onAddElement: (type: ElementType) => void;
}

const ElementTypeButtons: React.FC<ElementTypeButtonsProps> = ({ onAddElement }) => {
  return (
    <div className="flex flex-wrap gap-1">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onAddElement('narration')}
        className="flex items-center text-xs h-7"
      >
        <AlignLeft className="h-3 w-3 mr-1" /> 旁白
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onAddElement('dialogue')}
        className="flex items-center text-xs h-7"
      >
        <MessageSquare className="h-3 w-3 mr-1" /> 对话
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onAddElement('thought')}
        className="flex items-center text-xs h-7"
      >
        <Brain className="h-3 w-3 mr-1" /> 思考
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onAddElement('choice')}
        className="flex items-center text-xs h-7"
      >
        <ListTree className="h-3 w-3 mr-1" /> 选择
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onAddElement('qte')}
        className="flex items-center text-xs h-7"
      >
        <Gamepad className="h-3 w-3 mr-1" /> 快速反应
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onAddElement('dialogueTask')}
        className="flex items-center text-xs h-7"
      >
        <MessagesSquare className="h-3 w-3 mr-1" /> 对话任务
      </Button>
    </div>
  );
};

export default ElementTypeButtons;
