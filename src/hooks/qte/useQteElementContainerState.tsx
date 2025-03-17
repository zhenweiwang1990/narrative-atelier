
import { QteElement, Scene, GlobalValue, Story } from '@/utils/types';
import { useQteAiDialog } from '@/hooks/ai-dialog/useQteAiDialog';
import { useElementOutcomes } from '@/hooks/useElementOutcomes';

export const useQteElementContainerState = (
  element: QteElement, 
  onUpdate: (id: string, updates: Partial<QteElement>) => void,
  story: Story | null
) => {
  // Set up AI dialog functionality
  const {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    aiDialogFor,
    handleOpenAiDialog,
    handleAiStorySubmit
  } = useQteAiDialog(element.id, story);
  
  // Set up element outcomes management
  const {
    safeElement,
    updateSuccessSceneId,
    updateFailureSceneId,
    updateSuccessTransition,
    updateFailureTransition,
    addValueChange,
    updateValueChange,
    removeValueChange
  } = useElementOutcomes(element, onUpdate);
  
  // Ensure proper update of success scene ID
  const handleUpdateSuccessSceneId = (sceneId: string) => {
    updateSuccessSceneId(sceneId);
  };
  
  // Ensure proper update of failure scene ID
  const handleUpdateFailureSceneId = (sceneId: string) => {
    updateFailureSceneId(sceneId);
  };
  
  return {
    aiDialogState: {
      aiDialogOpen,
      setAiDialogOpen,
      aiDialogType,
      aiDialogFor,
      handleOpenAiDialog,
      handleAiStorySubmit,
    },
    outcomeState: {
      safeElement,
      updateSuccessSceneId: handleUpdateSuccessSceneId,
      updateFailureSceneId: handleUpdateFailureSceneId,
      updateSuccessTransition,
      updateFailureTransition,
      addValueChange,
      updateValueChange,
      removeValueChange,
    }
  };
};
