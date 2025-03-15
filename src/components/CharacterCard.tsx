
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Character } from "@/utils/types";
import { 
  Pencil, 
  Trash2, 
  User,
  Check, 
  X
} from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";

interface CharacterCardProps {
  character: Character;
  isEditing?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect?: () => void;
  onConfirmEdit?: () => void;
  onCancelEdit?: () => void;
  isSelected?: boolean;
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
}: CharacterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get role and gender display text
  const roleText = character.role === "protagonist" ? "主角" : "配角";
  const genderText = 
    character.gender === "male" ? "男性" :
    character.gender === "female" ? "女性" : "其他";
    
  // Get badge colors based on character role
  const roleBadgeVariant = character.role === "protagonist" ? "default" : "secondary";
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${
        isSelected ? "border-primary ring-1 ring-primary" : ""
      } ${isEditing ? "ring-1 ring-blue-400" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <AspectRatio ratio={2/3}>
          {character.profilePicture ? (
            <img
              src={character.profilePicture}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </AspectRatio>
        
        {(isHovered || isSelected) && !isEditing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
            {onSelect && (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={onSelect}
                className="z-10"
              >
                选择角色
              </Button>
            )}
          </div>
        )}
      </div>

      <CardHeader className="p-3">
        <CardTitle className="text-base truncate">{character.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 pt-0">
        <div className="flex gap-2 mb-2">
          <Badge variant={roleBadgeVariant}>{roleText}</Badge>
          <Badge variant="outline">{genderText}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{character.bio}</p>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" size="sm" onClick={onCancelEdit}>
              <X className="h-4 w-4 mr-1" /> 取消
            </Button>
            <Button size="sm" onClick={onConfirmEdit}>
              <Check className="h-4 w-4 mr-1" /> 确定
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
