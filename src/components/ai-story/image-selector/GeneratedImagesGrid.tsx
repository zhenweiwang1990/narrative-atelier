
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Check, Expand } from "lucide-react";

interface GeneratedImagesGridProps {
  generatedImages: string[];
  selectedGeneratedImage: string | null;
  onSelectImage: (imageUrl: string) => void;
  onOpenLightbox: (imageUrl: string) => void;
  aspectRatio: number;
}

const GeneratedImagesGrid: React.FC<GeneratedImagesGridProps> = ({
  generatedImages,
  selectedGeneratedImage,
  onSelectImage,
  onOpenLightbox,
  aspectRatio
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto p-1">
      {generatedImages.map((imageUrl, index) => (
        <div 
          key={index}
          className={`relative cursor-pointer rounded-md overflow-hidden transition-all ${
            selectedGeneratedImage === imageUrl ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div className="w-full max-h-[100px] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={`生成图${index + 1}`} 
              className="w-full h-full object-cover"
              style={{ maxHeight: '100px' }}
              onClick={() => onSelectImage(imageUrl)}
            />
          </div>
          
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70"
            onClick={() => onOpenLightbox(imageUrl)}
          >
            <Expand className="h-3 w-3 text-white" />
          </Button>
          
          {selectedGeneratedImage === imageUrl && (
            <div className="absolute top-1 left-1 bg-primary rounded-full p-0.5">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GeneratedImagesGrid;
