
import { Story, GlobalValue, ChoiceElement, QteElement, DialogueTaskElement } from "@/utils/types";
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

// Process story data to get all possible options/outcomes, including those without value changes
export const getAllPossibleOptions = (story: Story | null): Partial<ValueModification>[] => {
  if (!story) return [];
  
  const allOptions: Partial<ValueModification>[] = [];
  
  story.scenes.forEach(scene => {
    // Get elements that can have value changes (choice, qte, dialogueTask)
    const relevantElements = scene.elements.filter(
      element => ['choice', 'qte', 'dialogueTask'].includes(element.type)
    ).sort((a, b) => a.order - b.order);
    
    relevantElements.forEach((element, index) => {
      const elementTitle = getElementContentPreview(element);
      
      if (element.type === 'choice') {
        const choiceElement = element as ChoiceElement;
        
        choiceElement.options.forEach((option) => {
          allOptions.push({
            sceneId: scene.id,
            sceneTitle: scene.title,
            elementId: element.id,
            elementIndex: index,
            elementType: element.type,
            elementTitle,
            optionOrOutcome: option.text,
            outcomeType: 'choice',
            choiceOptionId: option.id
          });
        });
      } else if (element.type === 'qte') {
        const qteElement = element as QteElement;
        
        // Add success outcome
        if (qteElement.success) {
          allOptions.push({
            sceneId: scene.id,
            sceneTitle: scene.title,
            elementId: element.id,
            elementIndex: index,
            elementType: element.type,
            elementTitle,
            optionOrOutcome: '成功',
            outcomeType: 'success'
          });
        }
        
        // Add failure outcome
        if (qteElement.failure) {
          allOptions.push({
            sceneId: scene.id,
            sceneTitle: scene.title,
            elementId: element.id,
            elementIndex: index,
            elementType: element.type,
            elementTitle,
            optionOrOutcome: '失败',
            outcomeType: 'failure'
          });
        }
      } else if (element.type === 'dialogueTask') {
        const dialogueTaskElement = element as DialogueTaskElement;
        
        // Add success outcome
        if (dialogueTaskElement.success) {
          allOptions.push({
            sceneId: scene.id,
            sceneTitle: scene.title,
            elementId: element.id,
            elementIndex: index,
            elementType: element.type,
            elementTitle,
            optionOrOutcome: '成功',
            outcomeType: 'success'
          });
        }
        
        // Add failure outcome
        if (dialogueTaskElement.failure) {
          allOptions.push({
            sceneId: scene.id,
            sceneTitle: scene.title,
            elementId: element.id,
            elementIndex: index,
            elementType: element.type,
            elementTitle,
            optionOrOutcome: '失败',
            outcomeType: 'failure'
          });
        }
      }
    });
  });
  
  return allOptions;
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
        const choiceElement = element as ChoiceElement;
        
        choiceElement.options.forEach((option) => {
          if (option.valueChanges && option.valueChanges.length > 0) {
            option.valueChanges.forEach((valueChange) => {
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
      } else if (element.type === 'qte') {
        const qteElement = element as QteElement;
        
        // Process success outcome
        if (qteElement.success && qteElement.success.valueChanges) {
          qteElement.success.valueChanges.forEach((valueChange) => {
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
        if (qteElement.failure && qteElement.failure.valueChanges) {
          qteElement.failure.valueChanges.forEach((valueChange) => {
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
      } else if (element.type === 'dialogueTask') {
        const dialogueTaskElement = element as DialogueTaskElement;
        
        // Process success outcome
        if (dialogueTaskElement.success && dialogueTaskElement.success.valueChanges) {
          dialogueTaskElement.success.valueChanges.forEach((valueChange) => {
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
        if (dialogueTaskElement.failure && dialogueTaskElement.failure.valueChanges) {
          dialogueTaskElement.failure.valueChanges.forEach((valueChange) => {
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
