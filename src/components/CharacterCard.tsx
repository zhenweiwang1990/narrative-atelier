
import React, { useState } from "react";
import { Card, CardFooter } from "./ui/card";
import { Character } from "@/utils/types";
import CharacterCardImage from "./character/CharacterCardImage";
import CharacterCardInfo from "./character/CharacterCardInfo";
import CharacterCardFooter from "./character/CharacterCardFooter";
import CharacterImageDialogs from "./character/CharacterImageDialogs";
import CharacterImageActions from "./character/CharacterImageActions";

interface CharacterCardProps {
  character: Character;
  isEditing?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect?: () => void;
  onConfirmEdit?: () => void;
  onCancelEdit?: () => void;
  isSelected?: boolean;
  onImageChange?: (imageUrl: string, type: 'profilePicture' | 'fullBody') => void;
}

const CharacterCard = ({
  character,
  isEditing = false,
  onEdit,
  onDelete,
  onSelect,
  onConfirmEdit,
  onCancelEdit,
  isSelected = false,
  onImageChange
}: CharacterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isProfileImageSelectorOpen, setIsProfileImageSelectorOpen] = useState(false);
  const [isFullBodyImageSelectorOpen, setIsFullBodyImageSelectorOpen] = useState(false);
  const [isGeneratingFullBody, setIsGeneratingFullBody] = useState(false);
  
  // Handle image selection
  const handleProfileImageSelected = (imageUrl: string) => {
    if (onImageChange) {
      onImageChange(imageUrl, 'profilePicture');
    }
  };
  
  const handleFullBodyImageSelected = (imageUrl: string) => {
    if (onImageChange) {
      onImageChange(imageUrl, 'fullBody');
    }
  };
  
  // Get image processing actions
  const { handleGenerateFullBody } = CharacterImageActions({
    profilePicture: character.profilePicture,
    onImageChange: onImageChange || (() => {}),
    setIsGeneratingFullBody
  });
  
  return (
    <>
      <Card 
        className={`overflow-hidden transition-all duration-200 ${
          isSelected ? "border-primary ring-1 ring-primary" : ""
        } ${isEditing ? "ring-1 ring-blue-400" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CharacterCardImage 
          character={character}
          isEditing={isEditing}
          isHovered={isHovered}
          isSelected={isSelected}
          onSelect={onSelect}
          isGeneratingFullBody={isGeneratingFullBody}
          onOpenProfileImageSelector={() => setIsProfileImageSelectorOpen(true)}
          onOpenFullBodyImageSelector={() => setIsFullBodyImageSelectorOpen(true)}
          onGenerateFullBody={handleGenerateFullBody}
        />

        <CharacterCardInfo character={character} />
        
        <CardFooter className="p-0">
          <CharacterCardFooter 
            isEditing={isEditing}
            onEdit={onEdit}
            onDelete={onDelete}
            onConfirmEdit={onConfirmEdit}
            onCancelEdit={onCancelEdit}
          />
        </CardFooter>
      </Card>
      
      {onImageChange && (
        <CharacterImageDialogs 
          isProfileImageSelectorOpen={isProfileImageSelectorOpen}
          isFullBodyImageSelectorOpen={isFullBodyImageSelectorOpen}
          setIsProfileImageSelectorOpen={setIsProfileImageSelectorOpen}
          setIsFullBodyImageSelectorOpen={setIsFullBodyImageSelectorOpen}
          onProfileImageSelected={handleProfileImageSelected}
          onFullBodyImageSelected={handleFullBodyImageSelected}
        />
      )}
    </>
  );
};

export default CharacterCard;
