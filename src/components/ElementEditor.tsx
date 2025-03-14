
import { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { useStory } from './Layout';
import { ElementContainer } from './elements/ElementContainer';
import { useElementManagement } from '@/hooks/useElementManagement';
import ElementTypeButtons from './elements/ElementTypeButtons';
import EmptyElementsState from './elements/EmptyElementsState';

interface ElementEditorProps {
  sceneId: string;
  selectedElementId?: string;
  onSelectElement?: (id: string) => void;
}

const ElementEditor = ({ sceneId, selectedElementId, onSelectElement }: ElementEditorProps) => {
  const { story, setStory } = useStory();
  
  const {
    elements,
    addElement,
    deleteElement,
    moveElementUp,
    moveElementDown,
    updateElement,
    addChoiceOption,
    deleteChoiceOption,
    updateChoiceOption,
    validateTimeLimit,
    validateKeySequence
  } = useElementManagement(sceneId, story, setStory);
  
  // Handle adding an element
  const handleAddElement = (type: any) => {
    const newElementId = addElement(type);
    // Auto-select the new element
    if (onSelectElement && newElementId) {
      onSelectElement(newElementId);
    }
  };
  
  // Handle deleting an element
  const handleDeleteElement = (id: string) => {
    const deletedId = deleteElement(id);
    // Clear selection if the deleted element was selected
    if (selectedElementId === deletedId && onSelectElement) {
      onSelectElement('');
    }
  };

  if (!story) return null;

  // Get global values from story
  const globalValues = story.globalValues || [];

  return (
    <div className="space-y-3">
      <ElementTypeButtons onAddElement={handleAddElement} />
      
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-14rem)]">
        {elements.length === 0 ? (
          <EmptyElementsState />
        ) : (
          <Accordion 
            type="multiple" 
            className="space-y-2"
            value={selectedElementId ? [selectedElementId] : []}
          >
            {elements.map((element, index) => (
              <ElementContainer
                key={element.id}
                element={element}
                index={index}
                totalElements={elements.length}
                selectedElementId={selectedElementId}
                characters={story.characters}
                scenes={story.scenes}
                globalValues={globalValues}
                onSelect={onSelectElement ? onSelectElement : () => {}}
                onMoveUp={moveElementUp}
                onMoveDown={moveElementDown}
                onDelete={handleDeleteElement}
                onUpdate={updateElement}
                onAddChoiceOption={addChoiceOption}
                onDeleteChoiceOption={deleteChoiceOption}
                onUpdateChoiceOption={updateChoiceOption}
                validateTimeLimit={validateTimeLimit}
                validateKeySequence={validateKeySequence}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default ElementEditor;
