
import { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import { useStory } from "@/contexts/StoryContext";
import { ElementContainer } from "./elements/ElementContainer";
import { useElementManagement } from "@/hooks/useElementManagement";
import ElementTypeButtons from "./elements/ElementTypeButtons";
import EmptyElementsState from "./elements/EmptyElementsState";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface ElementEditorProps {
  sceneId: string;
  selectedElementId?: string;
  onSelectElement?: (id: string) => void;
}

const ElementEditor = ({
  sceneId,
  selectedElementId,
  onSelectElement,
}: ElementEditorProps) => {
  const { story, setStory } = useStory();

  const {
    elements,
    addElement,
    deleteElement,
    updateElement,
    reorderElements,
    addChoiceOption,
    deleteChoiceOption,
    updateChoiceOption,
    validateTimeLimit,
    validateKeySequence,
  } = useElementManagement(sceneId, story, setStory);

  // 处理添加元素
  const handleAddElement = (type: any) => {
    const newElementId = addElement(type);
    // 自动选择新元素
    if (onSelectElement && newElementId) {
      onSelectElement(newElementId);
    }
  };

  // 处理删除元素
  const handleDeleteElement = (id: string) => {
    const deletedId = deleteElement(id);
    // 如果删除的元素正在被选中，则清除选择
    if (selectedElementId === deletedId && onSelectElement) {
      onSelectElement("");
    }
  };

  // 处理选择元素（切换展开状态）
  const handleSelectElement = (id: string) => {
    if (onSelectElement) {
      // 如果已经选中，则取消选择（关闭手风琴）
      if (selectedElementId === id) {
        onSelectElement("");
      } else {
        // 否则，选择新元素（打开手风琴）
        onSelectElement(id);
      }
    }
  };

  // 处理拖放重新排序
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex !== destinationIndex) {
      reorderElements(sourceIndex, destinationIndex);
    }
  };

  // Listen for selectElement custom event
  useEffect(() => {
    const handleSelectElementEvent = (event: CustomEvent) => {
      if (event.detail.sceneId === sceneId && event.detail.elementId && onSelectElement) {
        onSelectElement(event.detail.elementId);
      }
    };
    
    window.addEventListener('selectElement', handleSelectElementEvent as EventListener);
    
    return () => {
      window.removeEventListener('selectElement', handleSelectElementEvent as EventListener);
    };
  }, [sceneId, onSelectElement]);

  if (!story) return null;

  // 从剧情中获取全局变量
  const globalValues = story.globalValues || [];

  return (
    <div className="space-y-3">
      <ElementTypeButtons onAddElement={handleAddElement} />

      <div className="space-y-2 overflow-y-auto h-[calc(100vh-14rem)]">
        {elements.length === 0 ? (
          <EmptyElementsState />
        ) : (
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
                            globalValues={globalValues}
                            onSelect={handleSelectElement}
                            onDelete={handleDeleteElement}
                            onUpdate={updateElement}
                            onAddChoiceOption={addChoiceOption}
                            onDeleteChoiceOption={deleteChoiceOption}
                            onUpdateChoiceOption={updateChoiceOption}
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
        )}
      </div>
    </div>
  );
};

export default ElementEditor;
