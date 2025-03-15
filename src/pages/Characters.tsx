
import React, { useState } from "react";
import { useStory } from "@/components/Layout";
import { useCharacterForm } from "@/hooks/character/useCharacterForm";
import CharacterHeader from "@/components/character/CharacterHeader";
import CharacterSearchBar from "@/components/character/CharacterSearchBar";
import CharacterList from "@/components/character/CharacterList";
import CharacterDialog from "@/components/character/CharacterDialog";

const Characters = () => {
  const { story } = useStory();
  const [searchQuery, setSearchQuery] = useState("");
  
  const {
    isDialogOpen,
    setIsDialogOpen,
    isEditMode,
    formData,
    selectedCharacter,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleInputChange,
    handleSelectChange,
    handleImageChange,
    handleSaveCharacter,
    handleDeleteCharacter,
  } = useCharacterForm();

  // 根据搜索查询过滤角色
  const filteredCharacters =
    story?.characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.bio.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (!story) return null;

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
      />

      <CharacterDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isEditMode={isEditMode}
        formData={formData}
        selectedCharacter={selectedCharacter}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onImageChange={handleImageChange}
        onSave={handleSaveCharacter}
      />
    </div>
  );
};

export default Characters;
