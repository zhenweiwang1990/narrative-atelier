
import React from "react";
import ImageSelectorDialog from "../ai-story/ImageSelectorDialog";

interface CharacterImageDialogsProps {
  isProfileImageSelectorOpen: boolean;
  isFullBodyImageSelectorOpen: boolean;
  setIsProfileImageSelectorOpen: (isOpen: boolean) => void;
  setIsFullBodyImageSelectorOpen: (isOpen: boolean) => void;
  onProfileImageSelected: (imageUrl: string) => void;
  onFullBodyImageSelected: (imageUrl: string) => void;
}

const CharacterImageDialogs: React.FC<CharacterImageDialogsProps> = ({
  isProfileImageSelectorOpen,
  isFullBodyImageSelectorOpen,
  setIsProfileImageSelectorOpen,
  setIsFullBodyImageSelectorOpen,
  onProfileImageSelected,
  onFullBodyImageSelected
}) => {
  return (
    <>
      <ImageSelectorDialog
        open={isProfileImageSelectorOpen}
        onOpenChange={setIsProfileImageSelectorOpen}
        onImageSelected={onProfileImageSelected}
        aspectRatio={9/16}
        title="选择角色形象照"
      />
      
      <ImageSelectorDialog
        open={isFullBodyImageSelectorOpen}
        onOpenChange={setIsFullBodyImageSelectorOpen}
        onImageSelected={onFullBodyImageSelected}
        aspectRatio={9/16}
        title="选择角色立绘"
      />
    </>
  );
};

export default CharacterImageDialogs;
