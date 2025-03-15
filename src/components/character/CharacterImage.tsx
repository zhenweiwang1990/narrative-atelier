
import React from "react";
import { User } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Scissors } from "lucide-react";

interface CharacterImageProps {
  profilePicture?: string | null;
  isEditing?: boolean;
  isHovered?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onOpenProfileImageSelector?: () => void;
  onOpenFullBodyImageSelector?: () => void;
  onGenerateFullBody?: () => void;
  isGeneratingFullBody?: boolean;
  fullBody?: string | null;
}

const CharacterImage: React.FC<CharacterImageProps> = ({
  profilePicture,
  isEditing = false,
  isHovered = false,
  isSelected = false,
  onSelect,
  onOpenProfileImageSelector,
  onOpenFullBodyImageSelector,
  onGenerateFullBody,
  isGeneratingFullBody = false,
  fullBody
}) => {
  return (
    <div className="relative">
      <AspectRatio ratio={9/16}>
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Character"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </AspectRatio>
      
      {isEditing && onOpenProfileImageSelector && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onOpenProfileImageSelector}
          >
            更换形象照
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onOpenFullBodyImageSelector}
            >
              设置立绘
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onGenerateFullBody}
              disabled={isGeneratingFullBody || !profilePicture}
            >
              <Scissors className="h-3 w-3 mr-1" />
              抠图
            </Button>
          </div>
          
          {fullBody && (
            <div className="mt-1 text-xs text-white">已设置立绘</div>
          )}
        </div>
      )}
      
      {(isHovered || isSelected) && !isEditing && onSelect && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onSelect} 
            className="z-10"
          >
            选择角色
          </Button>
        </div>
      )}
    </div>
  );
};

export default CharacterImage;
