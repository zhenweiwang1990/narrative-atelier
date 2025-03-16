
import { useState } from "react";
import { useStory } from "./Layout";
import { useElementManagement } from "@/hooks/useElementManagement";
import { SplitSceneDialog } from "./flow/editor/SplitSceneDialog";
import { generateAiStory } from "@/services/aiStoryService";
import { toast } from "sonner";
import { ElementEditorProvider } from "./elements/editor/ElementEditorContext";
import EditorToolbar from "./elements/editor/EditorToolbar";
import ElementListContainer from "./elements/editor/ElementListContainer";
import SelectElementEventHandler from "./elements/editor/SelectElementEventHandler";

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

  if (!story) return null;

  // Get necessary data and state
  const globalValues = story.globalValues || [];
  const currentScene = story.scenes.find(scene => scene.id === sceneId);
  const isEndingScene = currentScene?.type === "ending" || currentScene?.type === "bad-ending";

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
        type: "branch" as "branch" | "ending", // Fixed type with explicit type assertion
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

  // Create context value for provider
  const contextValue = {
    sceneId,
    elements,
    selectedElementId,
    story,
    onSelectElement: handleSelectElement,
    onAddElement: handleAddElement,
    onDeleteElement: handleDeleteElement,
    onAiGenerate: handleAiGenerate
  };

  return (
    <ElementEditorProvider value={contextValue}>
      <div className="space-y-3">
        <EditorToolbar 
          isEndingScene={isEndingScene}
          onSplitScene={() => setShowSplitDialog(true)}
        />

        <div className="space-y-2 overflow-y-auto h-[calc(100vh-14rem)]">
          <ElementListContainer 
            reorderElements={reorderElements}
            onAddChoiceOption={addChoiceOption}
            onDeleteChoiceOption={deleteChoiceOption}
            onUpdateChoiceOption={updateChoiceOption}
            updateElement={updateElement}
            validateTimeLimit={validateTimeLimit}
            validateKeySequence={validateKeySequence}
          />
        </div>

        <SelectElementEventHandler />

        {!isEndingScene && (
          <SplitSceneDialog 
            open={showSplitDialog} 
            onOpenChange={setShowSplitDialog}
            sceneId={sceneId}
            elements={elements}
          />
        )}
      </div>
    </ElementEditorProvider>
  );
};

export default ElementEditor;
