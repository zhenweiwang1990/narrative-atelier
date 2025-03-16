
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageIcon } from "lucide-react";
import ImageSelectorDialog from "@/components/ai-story/ImageSelectorDialog";

interface EndingPosterSelectorProps {
  endingPoster: string | undefined;
  updateEndingPoster: (url: string) => void;
}

const EndingPosterSelector: React.FC<EndingPosterSelectorProps> = ({
  endingPoster,
  updateEndingPoster
}) => {
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  return (
    <div className="space-y-2 mt-4 p-3 border rounded-md bg-gray-50 dark:bg-gray-900">
      <Label className="text-sm font-medium">结局海报</Label>
      <p className="text-xs text-muted-foreground mb-3">
        为结局设置一张海报，展示故事的结局画面
      </p>
      
      <Card className="overflow-hidden border border-dashed">
        <AspectRatio ratio={16/9}>
          {endingPoster ? (
            <img 
              src={endingPoster} 
              alt="结局海报" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30">
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground">暂无结局海报</span>
            </div>
          )}
        </AspectRatio>
      </Card>
      
      <Button
        variant="outline"
        size="sm"
        className="mt-2 w-full"
        onClick={() => setIsImageSelectorOpen(true)}
      >
        {endingPoster ? "更换海报" : "上传结局海报"}
      </Button>
      
      <ImageSelectorDialog
        open={isImageSelectorOpen}
        onOpenChange={setIsImageSelectorOpen}
        onImageSelected={updateEndingPoster}
        aspectRatio={16/9}
        title="选择结局海报"
      />
    </div>
  );
};

export default EndingPosterSelector;
