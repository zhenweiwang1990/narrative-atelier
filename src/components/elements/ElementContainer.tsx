
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
  Scene,
  GlobalValue
} from '@/utils/types';

interface ElementContainerProps {
  element: SceneElement;
  index: number;
  totalElements: number;
  selectedElementId?: string;
  characters: Character[];
  scenes: Scene[];
  globalValues: GlobalValue[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedElement: Partial<SceneElement>) => void;
  // Choice-specific handlers
  onAddChoiceOption: (elementId: string) => void;
  onDeleteChoiceOption: (elementId: string, optionId: string) => void;
  onUpdateChoiceOption: (elementId: string, optionId: string, updates: Partial<ChoiceOption>) => void;
  // QTE validation
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
  // Drag and drop
  dragHandleProps?: any;
  isDragging?: boolean;
}

export const ElementContainer: React.FC<ElementContainerProps> = ({
  element,
  index,
  totalElements,
  selectedElementId,
  characters,
  scenes,
  globalValues,
  onSelect,
  onDelete,
  onUpdate,
  onAddChoiceOption,
  onDeleteChoiceOption,
  onUpdateChoiceOption,
  validateTimeLimit,
  validateKeySequence,
  dragHandleProps,
  isDragging
}) => {
  return (
    <AccordionItem 
      key={element.id} 
      value={element.id}
      className={cn(
        "rounded-md border overflow-hidden", 
        selectedElementId === element.id && "ring-2 ring-primary",
        isDragging && "opacity-60"
      )}
    >
      <ElementHeader 
        element={element}
        index={index}
        totalElements={totalElements}
        onSelect={onSelect}
        onDelete={onDelete}
        dragHandleProps={dragHandleProps}
        isDragging={isDragging}
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
            globalValues={globalValues}
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
            globalValues={globalValues}
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
            globalValues={globalValues}
            onUpdate={onUpdate}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
