
import React from "react";
import { toast } from "sonner";

interface CharacterImageActionsProps {
  profilePicture: string | undefined;
  onImageChange: (imageUrl: string, type: 'profilePicture' | 'fullBody') => void;
  setIsGeneratingFullBody: (isGenerating: boolean) => void;
}

const CharacterImageActions: React.FC<CharacterImageActionsProps> = ({
  profilePicture,
  onImageChange,
  setIsGeneratingFullBody
}) => {
  const handleGenerateFullBody = () => {
    if (!profilePicture) {
      toast.error("请先设置角色形象照");
      return;
    }
    
    setIsGeneratingFullBody(true);
    
    // TODO: Call server API to remove background and generate full body image
    // Mock implementation with timeout
    setTimeout(() => {
      if (onImageChange) {
        // For now, we'll just use the same image as a mock result
        // In real implementation, this would be the processed image with background removed
        onImageChange(profilePicture, 'fullBody');
        toast.success("立绘生成成功");
      }
      setIsGeneratingFullBody(false);
    }, 1500);
  };
  
  return { handleGenerateFullBody };
};

export default CharacterImageActions;
