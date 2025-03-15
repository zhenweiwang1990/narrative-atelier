
import React from 'react';
import { Button } from "@/components/ui/button";
import { Image, UserRound } from "lucide-react";
import { Character } from "@/utils/types";

interface CharacterImageControlsProps {
  character: Character;
  type: 'profilePicture' | 'fullBody';
  onImageChange: (character: Character, type: 'profilePicture' | 'fullBody') => void;
}

const CharacterImageControls: React.FC<CharacterImageControlsProps> = ({
  character,
  type,
  onImageChange
}) => {
  const imageSrc = type === 'profilePicture' ? character.profilePicture : character.fullBody;
  const altText = `${character.name} ${type === 'profilePicture' ? '形象照' : '立绘'}`;
  
  return (
    <div className="flex items-center gap-2">
      {imageSrc ? (
        <div className="relative h-12 w-12 rounded overflow-hidden">
          <img
            src={imageSrc}
            alt={altText}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
          {type === 'profilePicture' ? (
            <UserRound className="h-6 w-6 text-muted-foreground" />
          ) : (
            <Image className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onImageChange(character, type)}
        className="h-8"
      >
        <Image className="h-4 w-4 mr-1" />
        设置
      </Button>
    </div>
  );
};

export default CharacterImageControls;
