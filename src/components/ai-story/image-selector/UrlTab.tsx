
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogFooter } from "@/components/ui/dialog";

interface UrlTabProps {
  urlInput: string;
  setUrlInput: (url: string) => void;
  handleUrlConfirm: () => void;
  aspectRatio: number;
}

const UrlTab: React.FC<UrlTabProps> = ({
  urlInput,
  setUrlInput,
  handleUrlConfirm,
  aspectRatio
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image-url">图片URL</Label>
        <Input 
          id="image-url" 
          placeholder="https://example.com/image.jpg" 
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </div>
      
      {urlInput && (
        <div className="border rounded-md overflow-hidden">
          <AspectRatio ratio={aspectRatio}>
            <img 
              src={urlInput} 
              alt="预览" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x600?text=加载失败";
              }}
            />
          </AspectRatio>
        </div>
      )}
      
      <DialogFooter>
        <Button onClick={handleUrlConfirm} disabled={!urlInput.trim()}>确认</Button>
      </DialogFooter>
    </div>
  );
};

export default UrlTab;
