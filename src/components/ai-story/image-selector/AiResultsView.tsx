
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import GeneratedImagesGrid from "./GeneratedImagesGrid";

interface AiResultsViewProps {
  generatedImages: string[];
  selectedGeneratedImage: string | null;
  onSelectImage: (imageUrl: string) => void;
  onOpenLightbox: (imageUrl: string) => void;
  onRegenerateImages: () => void;
  onConfirmImage: () => void;
  aspectRatio: number;
}

const AiResultsView: React.FC<AiResultsViewProps> = ({
  generatedImages,
  selectedGeneratedImage,
  onSelectImage,
  onOpenLightbox,
  onRegenerateImages,
  onConfirmImage,
  aspectRatio
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRegenerateImages}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          返回修改
        </Button>
        <h3 className="text-center font-medium">选择您喜欢的图片</h3>
      </div>
      
      <GeneratedImagesGrid
        generatedImages={generatedImages}
        selectedGeneratedImage={selectedGeneratedImage}
        onSelectImage={onSelectImage}
        onOpenLightbox={onOpenLightbox}
        aspectRatio={aspectRatio}
      />
      
      <DialogFooter>
        <Button 
          onClick={onConfirmImage}
          disabled={!selectedGeneratedImage}
        >
          使用选中图片
        </Button>
      </DialogFooter>
    </div>
  );
};

export default AiResultsView;
