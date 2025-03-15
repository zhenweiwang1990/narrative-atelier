
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageSelectorDialog from './ImageSelectorDialog';

interface CoverPhotoUploaderProps {
  coverPhoto: string | undefined;
  onChange: (url: string) => void;
  className?: string;
  isEditing?: boolean;
  aspectRatio?: number;
}

const CoverPhotoUploader: React.FC<CoverPhotoUploaderProps> = ({
  coverPhoto,
  onChange,
  className,
  isEditing = true,
  aspectRatio = 2/3
}) => {
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  
  return (
    <>
      <Card 
        className={cn(
          "relative overflow-hidden transition-all",
          className
        )}
        style={{ maxHeight: "300px" }} // 限制封面照片高度不超过300px
      >
        <div className="relative">
          <AspectRatio ratio={aspectRatio}>
            {coverPhoto ? (
              <img 
                src={coverPhoto} 
                alt="封面"
                className="w-full h-full object-cover"
                style={{ maxHeight: "300px" }} // 确保图片本身也受限制
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/50">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
          
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
              <Button 
                variant="secondary" 
                onClick={() => setIsImageSelectorOpen(true)}
              >
                {coverPhoto ? (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    更换图片
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    上传图片
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>
      
      <ImageSelectorDialog
        open={isImageSelectorOpen}
        onOpenChange={setIsImageSelectorOpen}
        onImageSelected={onChange}
        aspectRatio={aspectRatio}
        title="选择封面图片"
      />
    </>
  );
};

export default CoverPhotoUploader;
