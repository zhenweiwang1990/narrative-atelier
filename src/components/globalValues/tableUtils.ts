
import { Story, GlobalValue } from "@/utils/types";
import { ValueModification } from "./types";
import { getElementContentPreview } from "@/components/elements/ElementHeader";

// Helper function to get readable element type name
export const getElementTypeName = (type: string): string => {
  switch(type) {
    case 'choice': return '选择';
    case 'qte': return '快速反应';
    case 'dialogueTask': return '对话任务';
    default: return type;
  }
};

// Helper function to get value name from ID
export const getValueName = (story: Story | null, valueId: string): string => {
  if (!story) return valueId;
  const value = story.globalValues.find(v => v.id === valueId);
  return value ? value.name : valueId;
};

// Process story data to get all value modifications
export const extractValueModifications = (story: Story | null): ValueModification[] => {
  if (!story) return [];
  
  const modifications: ValueModification[] = [];
  
  story.scenes.forEach(scene => {
    // Sort elements by order
    const sortedElements = [...scene.elements].sort((a, b) => a.order - b.order);
    
    sortedElements.forEach((element, index) => {
      if (element.type === 'choice') {
        const choiceElement = element as any;
        
        choiceElement.options.forEach((option: any) => {
          if (option.valueChanges && option.valueChanges.length > 0) {
            option.valueChanges.forEach((valueChange: any) => {
              modifications.push({
                sceneId: scene.id,
                sceneTitle: scene.title,
                elementId: element.id,
                elementIndex: index,
                elementType: element.type,
                elementTitle: getElementContentPreview(element),
                optionOrOutcome: option.text,
                outcomeType: 'choice',
                valueId: valueChange.valueId,
                valueChange: valueChange.change,
                choiceOptionId: option.id
              });
            });
          }
        });
      } else if (element.type === 'qte' || element.type === 'dialogueTask') {
        const outcomeElement = element as any;
        
        // Process success outcome
        if (outcomeElement.success && outcomeElement.success.valueChanges) {
          outcomeElement.success.valueChanges.forEach((valueChange: any) => {
            modifications.push({
              sceneId: scene.id,
              sceneTitle: scene.title,
              elementId: element.id,
              elementIndex: index,
              elementType: element.type,
              elementTitle: getElementContentPreview(element),
              optionOrOutcome: '成功',
              outcomeType: 'success',
              valueId: valueChange.valueId,
              valueChange: valueChange.change
            });
          });
        }
        
        // Process failure outcome
        if (outcomeElement.failure && outcomeElement.failure.valueChanges) {
          outcomeElement.failure.valueChanges.forEach((valueChange: any) => {
            modifications.push({
              sceneId: scene.id,
              sceneTitle: scene.title,
              elementId: element.id,
              elementIndex: index,
              elementType: element.type,
              elementTitle: getElementContentPreview(element),
              optionOrOutcome: '失败',
              outcomeType: 'failure',
              valueId: valueChange.valueId,
              valueChange: valueChange.change
            });
          });
        }
      }
    });
  });
  
  return modifications;
};
