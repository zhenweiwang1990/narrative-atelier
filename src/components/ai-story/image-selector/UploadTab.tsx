
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogFooter } from "@/components/ui/dialog";
import { Upload } from "lucide-react";

interface UploadTabProps {
  filePreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: () => void;
  aspectRatio: number;
}

const UploadTab: React.FC<UploadTabProps> = ({
  filePreview,
  handleFileChange,
  handleFileUpload,
  aspectRatio
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image-upload">上传图片</Label>
        <div className="grid w-full items-center gap-1.5">
          <label 
            htmlFor="image-upload" 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">点击上传</span> 或拖放图片
              </p>
            </div>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      
      {filePreview && (
        <div className="border rounded-md overflow-hidden">
          <AspectRatio ratio={aspectRatio}>
            <img 
              src={filePreview} 
              alt="预览" 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      )}
      
      <DialogFooter>
        <Button onClick={handleFileUpload} disabled={!filePreview}>上传</Button>
      </DialogFooter>
    </div>
  );
};

export default UploadTab;
