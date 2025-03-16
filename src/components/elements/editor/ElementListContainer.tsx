
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Accordion } from "@/components/ui/accordion";
import { useElementEditor } from "./ElementEditorContext";
import { ElementContainer } from "../ElementContainer";
import EmptyElementsState from "../EmptyElementsState";

interface ElementListContainerProps {
  reorderElements: (sourceIndex: number, destinationIndex: number) => void;
  onAddChoiceOption: (elementId: string) => void;
  onDeleteChoiceOption: (elementId: string, optionId: string) => void;
  onUpdateChoiceOption: (elementId: string, optionId: string, updates: any) => void;
  updateElement: (id: string, updates: any) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

const ElementListContainer = ({
  reorderElements,
  onAddChoiceOption,
  onDeleteChoiceOption,
  onUpdateChoiceOption,
  updateElement,
  validateTimeLimit,
  validateKeySequence,
}: ElementListContainerProps) => {
  const { 
    elements, 
    selectedElementId, 
    story, 
    onSelectElement, 
    onDeleteElement,
    onAiGenerate
  } = useElementEditor();

  // Handle drag end for reordering elements
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex !== destinationIndex) {
      reorderElements(sourceIndex, destinationIndex);
    }
  };

  if (elements.length === 0) {
    return <EmptyElementsState />;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="elements">
        {(provided) => (
          <Accordion
            type="multiple"
            className="space-y-2"
            value={selectedElementId ? [selectedElementId] : []}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {elements.map((element, index) => (
              <Draggable 
                key={element.id} 
                draggableId={element.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <ElementContainer
                      key={element.id}
                      element={element}
                      index={index}
                      totalElements={elements.length}
                      selectedElementId={selectedElementId}
                      characters={story.characters}
                      scenes={story.scenes}
                      globalValues={story.globalValues || []}
                      onSelect={onSelectElement || (() => {})}
                      onDelete={onDeleteElement}
                      onUpdate={updateElement}
                      onAiGenerate={onAiGenerate}
                      onAddChoiceOption={onAddChoiceOption}
                      onDeleteChoiceOption={onDeleteChoiceOption}
                      onUpdateChoiceOption={onUpdateChoiceOption}
                      validateTimeLimit={validateTimeLimit}
                      validateKeySequence={validateKeySequence}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Accordion>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ElementListContainer;
