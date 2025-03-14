
import React from 'react';
import { AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { ElementHeader } from './ElementHeader';
import { NarrationElement } from './NarrationElement';
import { DialogueElement } from './DialogueElement';
import { ThoughtElement } from './ThoughtElement';
import { ChoiceElement } from './ChoiceElement';
import { QteElement } from './QteElement';
import { DialogueTaskElement } from './DialogueTaskElement';
import { 
  SceneElement, 
  NarrationElement as NarrationElementType,
  DialogueElement as DialogueElementType,
  ThoughtElement as ThoughtElementType,
  ChoiceElement as ChoiceElementType,
  QteElement as QteElementType,
  DialogueTaskElement as DialogueTaskElementType,
  ChoiceOption,
  Character,
  Scene
} from '@/utils/types';

interface ElementContainerProps {
  element: SceneElement;
  index: number;
  totalElements: number;
  selectedElementId?: string;
  characters: Character[];
  scenes: Scene[];
  onSelect: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedElement: Partial<SceneElement>) => void;
  // Choice-specific handlers
  onAddChoiceOption: (elementId: string) => void;
  onDeleteChoiceOption: (elementId: string, optionId: string) => void;
  onUpdateChoiceOption: (elementId: string, optionId: string, updates: Partial<ChoiceOption>) => void;
  // QTE validation
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

export const ElementContainer: React.FC<ElementContainerProps> = ({
  element,
  index,
  totalElements,
  selectedElementId,
  characters,
  scenes,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDelete,
  onUpdate,
  onAddChoiceOption,
  onDeleteChoiceOption,
  onUpdateChoiceOption,
  validateTimeLimit,
  validateKeySequence
}) => {
  return (
    <AccordionItem 
      key={element.id} 
      value={element.id}
      className={cn(
        "rounded-md border overflow-hidden", 
        selectedElementId === element.id && "ring-2 ring-primary"
      )}
    >
      <ElementHeader 
        element={element}
        index={index}
        totalElements={totalElements}
        onSelect={onSelect}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onDelete={onDelete}
      />
      
      <AccordionContent className="p-3 pt-2">
        {element.type === 'narration' && (
          <NarrationElement 
            element={element as NarrationElementType}
            onUpdate={onUpdate}
          />
        )}
        
        {element.type === 'dialogue' && (
          <DialogueElement 
            element={element as DialogueElementType}
            characters={characters}
            onUpdate={onUpdate}
          />
        )}
        
        {element.type === 'thought' && (
          <ThoughtElement 
            element={element as ThoughtElementType}
            characters={characters}
            onUpdate={onUpdate}
          />
        )}
        
        {element.type === 'choice' && (
          <ChoiceElement 
            element={element as ChoiceElementType}
            scenes={scenes}
            onUpdate={onUpdate}
            onAddOption={onAddChoiceOption}
            onDeleteOption={onDeleteChoiceOption}
            onUpdateOption={onUpdateChoiceOption}
          />
        )}
        
        {element.type === 'qte' && (
          <QteElement 
            element={element as QteElementType}
            scenes={scenes}
            onUpdate={onUpdate}
            validateTimeLimit={validateTimeLimit}
            validateKeySequence={validateKeySequence}
          />
        )}
        
        {element.type === 'dialogueTask' && (
          <DialogueTaskElement 
            element={element as DialogueTaskElementType}
            characters={characters}
            scenes={scenes}
            onUpdate={onUpdate}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
