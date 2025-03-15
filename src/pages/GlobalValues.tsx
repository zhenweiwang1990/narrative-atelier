
import React from "react";
import GlobalValues from "@/components/GlobalValues";
import GlobalValuesModificationsTable from "@/components/GlobalValuesModificationsTable";
import { useStory } from "@/components/Layout";
import { GlobalValue, Story } from "@/utils/types";
import { ValueModification } from "@/components/globalValues/types";

const GlobalValuesPage: React.FC = () => {
  const { story, setStory } = useStory();

  const handleGlobalValuesChange = (values: GlobalValue[]) => {
    if (!story) return;
    setStory({
      ...story,
      globalValues: values,
    });
  };

  const handleModificationUpdate = (modification: ValueModification) => {
    if (!story) return;
    
    const updatedStory = { ...story };
    const scene = updatedStory.scenes.find(s => s.id === modification.sceneId);
    
    if (!scene) return;
    
    const element = scene.elements.find(e => e.id === modification.elementId);
    
    if (!element) return;
    
    // Update the value based on the element type and outcome type
    if (element.type === 'choice' && modification.outcomeType === 'choice') {
      const choiceElement = element as any;
      const option = choiceElement.options.find((o: any) => o.id === modification.choiceOptionId);
      
      if (option) {
        if (!option.valueChanges) {
          option.valueChanges = [];
        }
        
        const valueChangeIndex = option.valueChanges.findIndex(
          (vc: any) => vc.valueId === modification.valueId
        );
        
        if (valueChangeIndex >= 0) {
          option.valueChanges[valueChangeIndex].change = modification.valueChange;
        }
      }
    } else if ((element.type === 'qte' || element.type === 'dialogueTask')) {
      const outcomeElement = element as any;
      
      if (modification.outcomeType === 'success' && outcomeElement.success) {
        if (!outcomeElement.success.valueChanges) {
          outcomeElement.success.valueChanges = [];
        }
        
        const valueChangeIndex = outcomeElement.success.valueChanges.findIndex(
          (vc: any) => vc.valueId === modification.valueId
        );
        
        if (valueChangeIndex >= 0) {
          outcomeElement.success.valueChanges[valueChangeIndex].change = modification.valueChange;
        }
      } else if (modification.outcomeType === 'failure' && outcomeElement.failure) {
        if (!outcomeElement.failure.valueChanges) {
          outcomeElement.failure.valueChanges = [];
        }
        
        const valueChangeIndex = outcomeElement.failure.valueChanges.findIndex(
          (vc: any) => vc.valueId === modification.valueId
        );
        
        if (valueChangeIndex >= 0) {
          outcomeElement.failure.valueChanges[valueChangeIndex].change = modification.valueChange;
        }
      }
    }
    
    setStory(updatedStory);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">全局变量</h1>
      <p className="text-muted-foreground mb-6">
        全局变量可用于跟踪剧情中各场景之间的数值变化。
        这些值可以根据用户选择而改变，并会影响剧情进展。
      </p>

      <GlobalValues
        values={story?.globalValues || []}
        onChange={handleGlobalValuesChange}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">变量变更一览表</h2>
        <p className="text-muted-foreground mb-4">
          此表格显示了所有场景元素中的变量变更，你可以直接编辑变更值。
        </p>
        
        <GlobalValuesModificationsTable 
          story={story} 
          onModificationUpdate={handleModificationUpdate}
        />
      </div>
    </div>
  );
};

export default GlobalValuesPage;
