
import { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import { useStory } from "./Layout";
import { ElementContainer } from "./elements/ElementContainer";
import { useElementManagement } from "@/hooks/useElementManagement";
import ElementTypeButtons from "./elements/ElementTypeButtons";
import EmptyElementsState from "./elements/EmptyElementsState";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "./ui/button";
import { Scissors } from "lucide-react";
import { SplitSceneDialog } from "./flow/editor/SplitSceneDialog";
import { generateAiStory } from "@/services/aiStoryService";
import { toast } from "sonner";

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
  const [showSplitDialog, setShowSplitDialog] = useState(false);

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

  // Handle AI content generation
  const handleAiGenerate = async (elementId: string) => {
    if (!story) return;
    
    const element = elements.find(el => el.id === elementId);
    if (!element) return;
    
    toast.info("正在生成 AI 内容...");
    
    try {
      // Mock service call for AI generation
      const request = {
        prompt: "Generate content for this element",
        type: "branch",
        elementId: elementId,
        story: story
      };
      
      await generateAiStory(request);
      
      // For now, we're just showing a success toast since this is a mock implementation
      toast.success("AI 内容生成成功！");
    } catch (error) {
      console.error("AI 内容生成失败:", error);
      toast.error("AI 内容生成失败");
    }
  };

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
      <div className="flex gap-2 justify-between">
        <ElementTypeButtons onAddElement={handleAddElement} />
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowSplitDialog(true)}
          className="flex items-center gap-1"
        >
          <Scissors className="h-3.5 w-3.5" />
          拆分场景
        </Button>
      </div>

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
                            onAiGenerate={handleAiGenerate}
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

      <SplitSceneDialog 
        open={showSplitDialog} 
        onOpenChange={setShowSplitDialog}
        sceneId={sceneId}
        elements={elements}
      />
    </div>
  );
};

export default ElementEditor;
