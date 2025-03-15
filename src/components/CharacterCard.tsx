
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Character } from "@/utils/types";
import { toast } from "sonner";
import CharacterImage from "./character/CharacterImage";
import CharacterBadges from "./character/CharacterBadges";
import CharacterCardFooter from "./character/CharacterCardFooter";
import CharacterImageDialogs from "./character/CharacterImageDialogs";

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
  
  const handleGenerateFullBody = () => {
    if (!character.profilePicture) {
      toast.error("请先设置角色形象照片");
      return;
    }
    
    setIsGeneratingFullBody(true);
    
    // TODO: Call server API to remove background and generate full body image
    // Mock implementation with timeout
    setTimeout(() => {
      if (onImageChange) {
        // For now, we'll just use the same image as a mock result
        // In real implementation, this would be the processed image with background removed
        onImageChange(character.profilePicture!, 'fullBody');
        toast.success("立绘生成成功");
      }
      setIsGeneratingFullBody(false);
    }, 1500);
  };
  
  return (
    <>
      <Card 
        className={`overflow-hidden transition-all duration-200 ${
          isSelected ? "border-primary ring-1 ring-primary" : ""
        } ${isEditing ? "ring-1 ring-blue-400" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CharacterImage 
          profilePicture={character.profilePicture}
          isEditing={isEditing}
          isHovered={isHovered}
          isSelected={isSelected}
          onSelect={onSelect}
          onOpenProfileImageSelector={() => setIsProfileImageSelectorOpen(true)}
          onOpenFullBodyImageSelector={() => setIsFullBodyImageSelectorOpen(true)}
          onGenerateFullBody={handleGenerateFullBody}
          isGeneratingFullBody={isGeneratingFullBody}
          fullBody={character.fullBody}
        />

        <CardHeader className="p-3">
          <CardTitle className="text-base truncate">{character.name}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-3 pt-0">
          <CharacterBadges 
            role={character.role} 
            gender={character.gender} 
          />
          <p className="text-sm text-muted-foreground line-clamp-2">{character.bio}</p>
        </CardContent>
        
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
