
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LightboxDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}

const LightboxDialog: React.FC<LightboxDialogProps> = ({
  imageUrl,
  onClose
}) => {
  if (!imageUrl) return null;
  
  return (
    <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black/90">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt="放大预览" 
            className="w-full h-auto"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightboxDialog;
