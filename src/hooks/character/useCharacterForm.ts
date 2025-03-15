
import { VOICE_SAMPLES } from "./voiceSamples";
import { useVoiceOperations } from "./useVoiceOperations";
import { useCharacterFormState } from "./useCharacterFormState";
import { useCharacterOperations } from "./useCharacterOperations";
import { Character } from "@/utils/types";

// Export voice samples for components that need them
export { VOICE_SAMPLES };

export const useCharacterForm = () => {
  // Use the refactored hooks
  const {
    isDialogOpen,
    setIsDialogOpen,
    isEditMode,
    selectedCharacterId,
    formData,
    handleInputChange,
    handleSelectChange,
    handleImageChange,
    handleOpenCreateDialog,
    handleOpenEditDialog
  } = useCharacterFormState();

  const { 
    currentPlayingVoice, 
    handlePlayVoiceSample 
  } = useVoiceOperations();

  const { 
    handleSaveCharacter, 
    handleDeleteCharacter,
    getSelectedCharacter 
  } = useCharacterOperations();

  // Integrate the voice sample playing functionality with voice IDs
  const playVoiceSample = (voiceId: string) => {
    const voiceSample = VOICE_SAMPLES.find(sample => sample.id === voiceId);
    if (!voiceSample) return;
    
    handlePlayVoiceSample(voiceId, voiceSample.sampleUrl);
  };

  // Get the selected character
  const selectedCharacter = getSelectedCharacter(selectedCharacterId);

  // Handle character save with the current state
  const handleSaveCharacterWithState = () => {
    handleSaveCharacter(isEditMode, selectedCharacterId, formData);
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    isEditMode,
    formData,
    selectedCharacter,
    currentPlayingVoice,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleInputChange,
    handleSelectChange,
    handleImageChange,
    handlePlayVoiceSample: playVoiceSample,
    handleSaveCharacter: handleSaveCharacterWithState,
    handleDeleteCharacter,
  };
};
