
import React, { useState, useEffect } from "react";
import { useStory } from "@/contexts/StoryContext";
import { useCharacterForm } from "@/hooks/character/useCharacterForm";
import CharacterHeader from "@/components/character/CharacterHeader";
import CharacterSearchBar from "@/components/character/CharacterSearchBar";
import CharacterList from "@/components/character/CharacterList";
import CharacterDialog from "@/components/character/CharacterDialog";
import ImageSelectorDialog from "@/components/ai-story/ImageSelectorDialog";

const Characters = () => {
  const { story, setStory } = useStory();
  const [searchQuery, setSearchQuery] = useState("");
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [imageType, setImageType] = useState<'profilePicture' | 'fullBody'>('profilePicture');
  
  const {
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
    handlePlayVoiceSample,
    handleSaveCharacter,
    handleDeleteCharacter,
  } = useCharacterForm();

  // 处理打开图片选择器
  const handleOpenImageSelector = (characterId: string, type: 'profilePicture' | 'fullBody') => {
    setSelectedCharacterId(characterId);
    setImageType(type);
    setIsImageSelectorOpen(true);
  };

  // 处理图片选择
  const handleImageSelected = (imageUrl: string) => {
    if (selectedCharacterId && story && setStory) {
      handleDirectImageChange(selectedCharacterId, imageUrl, imageType);
    }
    setIsImageSelectorOpen(false);
  };

  // 直接更新角色图片
  const handleDirectImageChange = (characterId: string, imageUrl: string, type: 'profilePicture' | 'fullBody') => {
    if (!story || !setStory) return;
    
    const updatedCharacters = story.characters.map((character) => {
      if (character.id === characterId) {
        return {
          ...character,
          [type]: imageUrl
        };
      }
      return character;
    });

    // 使用 setStory 更新角色
    setStory({
      ...story,
      characters: updatedCharacters
    });
  };

  // 监听图片选择器事件
  useEffect(() => {
    const handleImageSelectorOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { characterId, imageType } = customEvent.detail;
        handleOpenImageSelector(characterId, imageType);
      }
    };

    window.addEventListener('openCharacterImageSelector', handleImageSelectorOpen as EventListener);
    
    return () => {
      window.removeEventListener('openCharacterImageSelector', handleImageSelectorOpen as EventListener);
    };
  }, [story]);

  // 根据搜索查询过滤角色
  const filteredCharacters =
    story?.characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.bio.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (!story) {
    return (
      <div className="p-4 text-center">
        <p>Loading character data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CharacterHeader onAddCharacter={handleOpenCreateDialog} />

      <div className="flex items-center mb-4">
        <CharacterSearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <CharacterList 
        characters={filteredCharacters}
        onEdit={handleOpenEditDialog}
        onDelete={handleDeleteCharacter}
        onImageChange={handleDirectImageChange}
      />

      <CharacterDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isEditMode={isEditMode}
        formData={formData}
        selectedCharacter={selectedCharacter}
        currentPlayingVoice={currentPlayingVoice}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onImageChange={handleImageChange}
        onPlayVoiceSample={handlePlayVoiceSample}
        onSave={handleSaveCharacter}
      />

      {/* 图片选择器弹窗 */}
      <ImageSelectorDialog
        open={isImageSelectorOpen}
        onOpenChange={setIsImageSelectorOpen}
        onImageSelected={handleImageSelected}
        aspectRatio={imageType === 'profilePicture' ? 1 : 9/16}
        title={imageType === 'profilePicture' ? '选择角色形象照' : '选择角色立绘'}
      />
    </div>
  );
};

export default Characters;
