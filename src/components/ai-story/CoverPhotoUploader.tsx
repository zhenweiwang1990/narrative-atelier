
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverPhotoUploaderProps {
  coverPhoto: string | undefined;
  onChange: (url: string) => void;
  className?: string;
  isEditing?: boolean; // Add the isEditing prop to the interface
}

const CoverPhotoUploader: React.FC<CoverPhotoUploaderProps> = ({
  coverPhoto,
  onChange,
  className,
  isEditing = true // Default to true to maintain backward compatibility
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };
  
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all",
        isDragging ? "border-blue-500 ring-2 ring-blue-300" : "",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="relative">
        <AspectRatio ratio={2/3}>
          {coverPhoto ? (
            <img 
              src={coverPhoto} 
              alt="小说封面"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </AspectRatio>
        
        <input 
          type="file" 
          id="cover-photo-input"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
            <Button asChild variant="secondary">
              <label htmlFor="cover-photo-input" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                上传封面
              </label>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CoverPhotoUploader;
