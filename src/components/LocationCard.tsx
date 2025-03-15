
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Pencil, 
  Trash2, 
  Image as ImageIcon, 
  Check,
  X
} from "lucide-react";
import { Location } from "@/utils/types";
import { AspectRatio } from "./ui/aspect-ratio";
import ImageSelectorDialog from "./ai-story/ImageSelectorDialog";

interface LocationCardProps {
  location: Location;
  isEditing?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect?: () => void;
  onConfirmEdit?: () => void;
  onCancelEdit?: () => void;
  isSelected?: boolean;
  onImageChange?: (imageUrl: string) => void;
}

const LocationCard = ({
  location,
  isEditing = false,
  onEdit,
  onDelete,
  onSelect,
  onConfirmEdit,
  onCancelEdit,
  isSelected = false,
  onImageChange
}: LocationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  
  const handleImageSelected = (imageUrl: string) => {
    if (onImageChange) {
      onImageChange(imageUrl);
    }
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
        <div className="relative">
          <AspectRatio ratio={3/4}>
            {location.background ? (
              <img
                src={location.background}
                alt={location.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
          
          {isEditing && onImageChange && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setIsImageSelectorOpen(true)}
              >
                更换图片
              </Button>
            </div>
          )}
          
          {(isHovered || isSelected) && !isEditing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
              {onSelect && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={onSelect} 
                  className="z-10"
                >
                  选择场景
                </Button>
              )}
            </div>
          )}
        </div>

        <CardHeader className="p-3">
          <CardTitle className="text-base truncate">{location.name}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-3 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{location.description}</p>
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
      
      {onImageChange && (
        <ImageSelectorDialog
          open={isImageSelectorOpen}
          onOpenChange={setIsImageSelectorOpen}
          onImageSelected={handleImageSelected}
          aspectRatio={3/4}
          title="选择地点背景"
        />
      )}
    </>
  );
};

export default LocationCard;
