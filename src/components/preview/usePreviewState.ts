
import { useState, useEffect } from 'react';
import { Scene, Character, SceneElement, Story, GlobalValue, ValueChange, ChoiceElement, QteElement, DialogueTaskElement } from '@/utils/types';

export const usePreviewState = (sceneId: string, story: Story, onSceneChange: (sceneId: string) => void) => {
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(-1);
  const [globalValues, setGlobalValues] = useState<GlobalValue[]>([]);
  const [lastElementShown, setLastElementShown] = useState<boolean>(false);
  
  // Initialize global values on first load
  useEffect(() => {
    if (story.globalValues) {
      setGlobalValues(story.globalValues.map(value => ({
        ...value,
        currentValue: value.initialValue
      })));
    }
  }, [story.globalValues]);
  
  // Reset element index when scene changes
  useEffect(() => {
    setCurrentElementIndex(-1);
    setLastElementShown(false);
  }, [sceneId]);
  
  const scene = story.scenes.find(s => s.id === sceneId);
  
  if (!scene) {
    return {
      scene: null,
      location: null,
      currentElement: null,
      currentElementIndex: -1,
      isLastElement: false,
      isSceneEnding: false,
      lastElementShown: false,
      sortedElements: [],
      handleNext: () => {},
      handleChoiceSelect: () => {},
      handleQteResult: () => {},
      handleDialogueTaskResult: () => {},
      handleRevival: () => {},
      getCharacter: () => undefined,
      globalValues: []
    };
  }
  
  const location = story.locations.find(l => l.id === scene.locationId);
  const sortedElements = [...scene.elements].sort((a, b) => a.order - b.order);
  const currentElement = currentElementIndex >= 0 && currentElementIndex < sortedElements.length 
    ? sortedElements[currentElementIndex] 
    : null;

  const isLastElement = currentElementIndex === sortedElements.length - 1;
  const isSceneEnding = isLastElement && currentElement && !hasNextAction(currentElement);
  
  // Check if the element has next actions (choices, QTE, dialogueTask)
  function hasNextAction(element: SceneElement): boolean {
    return ['choice', 'qte', 'dialogueTask'].includes(element.type);
  }

  // Update global values based on value changes
  const applyValueChanges = (changes?: ValueChange[]) => {
    if (!changes || changes.length === 0) return;
    
    setGlobalValues(prevValues => 
      prevValues.map(value => {
        const change = changes.find(c => c.valueId === value.id);
        if (change) {
          const currentVal = value.currentValue !== undefined ? value.currentValue : value.initialValue;
          return {
            ...value,
            currentValue: currentVal + change.change
          };
        }
        return value;
      })
    );
  };

  const handleNext = () => {
    if (currentElementIndex < sortedElements.length - 1) {
      setCurrentElementIndex(currentElementIndex + 1);
      setLastElementShown(false);
    } else if (scene.nextSceneId) {
      // Move to next scene
      onSceneChange(scene.nextSceneId);
      setCurrentElementIndex(-1);
      setLastElementShown(false);
    } else {
      // 已经到达场景的最后一个元素，且没有下一个场景
      setLastElementShown(true);
    }
  };

  const handleChoiceSelect = (nextSceneId: string, valueChanges?: ValueChange[]) => {
    // Apply value changes if any
    applyValueChanges(valueChanges);
    
    if (nextSceneId) {
      onSceneChange(nextSceneId);
      setCurrentElementIndex(-1);
      setLastElementShown(false);
    } else {
      // If no nextSceneId is set, just move to the next element like a regular step
      handleNext();
    }
  };

  const handleQteResult = (success: boolean, element: QteElement) => {
    const outcome = success ? element.success : element.failure;
    
    applyValueChanges(outcome.valueChanges);
    if (outcome.sceneId) {
      handleChoiceSelect(outcome.sceneId);
    } else {
      // If no scene is set, treat as regular next step
      handleNext();
    }
  };

  const handleDialogueTaskResult = (success: boolean, element: DialogueTaskElement) => {
    const outcome = success ? element.success : element.failure;
    
    applyValueChanges(outcome.valueChanges);
    if (outcome.sceneId) {
      handleChoiceSelect(outcome.sceneId);
    } else {
      // If no scene is set, treat as regular next step
      handleNext();
    }
  };

  const handleRevival = () => {
    if (scene.revivalPointId) {
      onSceneChange(scene.revivalPointId);
      setCurrentElementIndex(-1);
      setLastElementShown(false);
    }
  };

  // Get character for dialogue/thought
  const getCharacter = (characterId: string): Character | undefined => {
    return story.characters.find(c => c.id === characterId);
  };
  
  return {
    scene,
    location,
    currentElement,
    currentElementIndex,
    isLastElement,
    isSceneEnding,
    lastElementShown,
    sortedElements,
    handleNext,
    handleChoiceSelect,
    handleQteResult,
    handleDialogueTaskResult,
    handleRevival,
    getCharacter,
    globalValues
  };
};
