
import React from "react";
import GlobalValues from "@/components/GlobalValues";
import GlobalValuesModificationsTable from "@/components/GlobalValuesModificationsTable";
import TitlesList from "@/components/titles/TitlesList";
import { useStory } from "@/components/Layout";
import { GlobalValue, Story, Title } from "@/utils/types";
import { ValueModification } from "@/components/globalValues/types";
import { toast } from "sonner";

const GlobalValuesPage: React.FC = () => {
  const { story, setStory } = useStory();

  const handleGlobalValuesChange = (values: GlobalValue[]) => {
    if (!story) return;
    setStory({
      ...story,
      globalValues: values,
    });
  };

  const handleTitlesChange = (titles: Title[]) => {
    if (!story) return;
    setStory({
      ...story,
      titles: titles || [],
    });
  };

  const handleModificationUpdate = (modification: ValueModification) => {
    if (!story) return;
    
    const updatedStory = { ...story };
    const scene = updatedStory.scenes?.find(s => s.id === modification.sceneId);
    
    if (!scene) return;
    
    const element = scene.elements?.find(e => e.id === modification.elementId);
    
    if (!element) return;
    
    // Update the value based on the element type and outcome type
    if (element.type === 'choice' && modification.outcomeType === 'choice') {
      const choiceElement = element as any;
      if (!choiceElement.options) return;
      
      const option = choiceElement.options.find((o: any) => o.id === modification.choiceOptionId);
      
      if (option) {
        if (!option.valueChanges) {
          option.valueChanges = [];
        }
        
        const valueChangeIndex = option.valueChanges.findIndex(
          (vc: any) => vc.valueId === modification.valueId
        );
        
        if (modification.toRemove) {
          // Remove the value change
          if (valueChangeIndex >= 0) {
            option.valueChanges.splice(valueChangeIndex, 1);
            toast.success("已删除值变更");
          }
        } else if (valueChangeIndex >= 0) {
          // Update existing value change
          option.valueChanges[valueChangeIndex].change = modification.valueChange;
        } else {
          // Add new value change
          option.valueChanges.push({
            valueId: modification.valueId,
            change: modification.valueChange
          });
          toast.success("已添加新的值变更");
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
        
        if (modification.toRemove) {
          // Remove the value change
          if (valueChangeIndex >= 0) {
            outcomeElement.success.valueChanges.splice(valueChangeIndex, 1);
            toast.success("已删除值变更");
          }
        } else if (valueChangeIndex >= 0) {
          // Update existing value change
          outcomeElement.success.valueChanges[valueChangeIndex].change = modification.valueChange;
        } else {
          // Add new value change
          outcomeElement.success.valueChanges.push({
            valueId: modification.valueId,
            change: modification.valueChange
          });
          toast.success("已添加新的值变更");
        }
      } else if (modification.outcomeType === 'failure' && outcomeElement.failure) {
        if (!outcomeElement.failure.valueChanges) {
          outcomeElement.failure.valueChanges = [];
        }
        
        const valueChangeIndex = outcomeElement.failure.valueChanges.findIndex(
          (vc: any) => vc.valueId === modification.valueId
        );
        
        if (modification.toRemove) {
          // Remove the value change
          if (valueChangeIndex >= 0) {
            outcomeElement.failure.valueChanges.splice(valueChangeIndex, 1);
            toast.success("已删除值变更");
          }
        } else if (valueChangeIndex >= 0) {
          // Update existing value change
          outcomeElement.failure.valueChanges[valueChangeIndex].change = modification.valueChange;
        } else {
          // Add new value change
          outcomeElement.failure.valueChanges.push({
            valueId: modification.valueId,
            change: modification.valueChange
          });
          toast.success("已添加新的值变更");
        }
      }
    }
    
    setStory(updatedStory);
  };

  return (
    <div className="container mx-auto p-4 max-w-full">
      <h1 className="text-2xl font-bold mb-6">全局变量与成就</h1>
      <p className="text-muted-foreground mb-6">
        全局变量可用于跟踪剧情中各场景之间的数值变化。
        成就可以根据游戏结束时的全局变量值来奖励玩家。
      </p>

      <div className="flex gap-8 mb-8">
        <div className="w-[300px] flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">全局变量</h2>
          <GlobalValues
            values={story?.globalValues || []}
            onChange={handleGlobalValuesChange}
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">成就管理</h2>
          <p className="text-sm text-muted-foreground mb-4">
            成就是玩家完成游戏后获得的奖励，基于最终全局变量值判定。
          </p>
          <TitlesList 
            titles={story?.titles || []}
            globalValues={story?.globalValues || []}
            onChange={handleTitlesChange}
          />
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">变量变更一览表</h2>
        <p className="text-muted-foreground mb-4">
          此表格显示了所有场景元素中的变量变更，你可以添加、编辑或删除变更值。
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
