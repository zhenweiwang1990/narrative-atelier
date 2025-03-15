
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check } from "lucide-react";

export interface ImageStyle {
  id: string;
  name: string;
  previewUrl: string;
}

interface ImageStyleGridProps {
  styles: ImageStyle[];
  selectedStyle: string | null;
  onStyleSelect: (styleId: string) => void;
}

const ImageStyleGrid: React.FC<ImageStyleGridProps> = ({
  styles,
  selectedStyle,
  onStyleSelect
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {styles.map((style) => (
        <div 
          key={style.id}
          className={`relative cursor-pointer rounded-md overflow-hidden transition-all ${
            selectedStyle === style.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onStyleSelect(style.id)}
        >
          <AspectRatio ratio={1}>
            <img 
              src={style.previewUrl} 
              alt={style.name} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white font-medium">{style.name}</span>
          </div>
          {selectedStyle === style.id && (
            <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageStyleGrid;
