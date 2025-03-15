
import { ElementOutcome, ValueChange, QteElement, DialogueTaskElement, GlobalValue } from '@/utils/types';

type ElementWithOutcomes = QteElement | DialogueTaskElement;

export const useElementOutcomes = (
  element: ElementWithOutcomes,
  onUpdate: (id: string, updates: Partial<ElementWithOutcomes>) => void
) => {
  // Initialize success and failure with empty objects if they don't exist
  const safeElement = {
    ...element,
    success: element.success || { sceneId: '' },
    failure: element.failure || { sceneId: '' }
  };
  
  // Update functions for the success/failure outcomes
  const updateSuccessSceneId = (sceneId: string) => {
    onUpdate(element.id, {
      success: {
        ...safeElement.success,
        sceneId
      }
    });
  };
  
  const updateFailureSceneId = (sceneId: string) => {
    onUpdate(element.id, {
      failure: {
        ...safeElement.failure,
        sceneId
      }
    });
  };
  
  const updateSuccessTransition = (transition: string) => {
    onUpdate(element.id, {
      success: {
        ...safeElement.success,
        transition
      }
    });
  };
  
  const updateFailureTransition = (transition: string) => {
    onUpdate(element.id, {
      failure: {
        ...safeElement.failure,
        transition
      }
    });
  };
  
  const addValueChange = (isSuccess: boolean, globalValues: GlobalValue[]) => {
    const currentChanges = isSuccess 
      ? safeElement.success.valueChanges || []
      : safeElement.failure.valueChanges || [];
      
    const unusedValues = globalValues.filter(
      value => !currentChanges.some(change => change.valueId === value.id)
    );
    
    if (unusedValues.length === 0) return;
    
    const newValueChange: ValueChange = {
      valueId: unusedValues[0].id,
      change: isSuccess ? 1 : -1
    };
    
    if (isSuccess) {
      onUpdate(element.id, {
        success: {
          ...safeElement.success,
          valueChanges: [...currentChanges, newValueChange]
        }
      });
    } else {
      onUpdate(element.id, {
        failure: {
          ...safeElement.failure,
          valueChanges: [...currentChanges, newValueChange]
        }
      });
    }
  };
  
  const updateValueChange = (isSuccess: boolean, valueId: string, change: number) => {
    const currentChanges = isSuccess 
      ? safeElement.success.valueChanges || []
      : safeElement.failure.valueChanges || [];
      
    const updatedChanges = currentChanges.map(vc => 
      vc.valueId === valueId ? { ...vc, change } : vc
    );
    
    if (isSuccess) {
      onUpdate(element.id, {
        success: {
          ...safeElement.success,
          valueChanges: updatedChanges
        }
      });
    } else {
      onUpdate(element.id, {
        failure: {
          ...safeElement.failure,
          valueChanges: updatedChanges
        }
      });
    }
  };
  
  const removeValueChange = (isSuccess: boolean, valueId: string) => {
    const currentChanges = isSuccess 
      ? safeElement.success.valueChanges || []
      : safeElement.failure.valueChanges || [];
      
    const updatedChanges = currentChanges.filter(vc => vc.valueId !== valueId);
    
    if (isSuccess) {
      onUpdate(element.id, {
        success: {
          ...safeElement.success,
          valueChanges: updatedChanges
        }
      });
    } else {
      onUpdate(element.id, {
        failure: {
          ...safeElement.failure,
          valueChanges: updatedChanges
        }
      });
    }
  };
  
  return {
    safeElement,
    updateSuccessSceneId,
    updateFailureSceneId,
    updateSuccessTransition,
    updateFailureTransition,
    addValueChange,
    updateValueChange,
    removeValueChange
  };
};
