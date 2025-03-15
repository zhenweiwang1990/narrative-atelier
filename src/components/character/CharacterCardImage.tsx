
import React from "react";
import { Character } from "@/utils/types";
import CharacterImage from "./CharacterImage";

interface CharacterCardImageProps {
  character: Character;
  isEditing: boolean;
  isHovered: boolean;
  isSelected: boolean;
  onSelect?: () => void;
  isGeneratingFullBody: boolean;
  onOpenProfileImageSelector: () => void;
  onOpenFullBodyImageSelector: () => void;
  onGenerateFullBody: () => void;
}

const CharacterCardImage: React.FC<CharacterCardImageProps> = ({
  character,
  isEditing,
  isHovered,
  isSelected,
  onSelect,
  isGeneratingFullBody,
  onOpenProfileImageSelector,
  onOpenFullBodyImageSelector,
  onGenerateFullBody
}) => {
  return (
    <CharacterImage 
      profilePicture={character.profilePicture}
      isEditing={isEditing}
      isHovered={isHovered}
      isSelected={isSelected}
      onSelect={onSelect}
      onOpenProfileImageSelector={onOpenProfileImageSelector}
      onOpenFullBodyImageSelector={onOpenFullBodyImageSelector}
      onGenerateFullBody={onGenerateFullBody}
      isGeneratingFullBody={isGeneratingFullBody}
      fullBody={character.fullBody}
    />
  );
};

export default CharacterCardImage;
