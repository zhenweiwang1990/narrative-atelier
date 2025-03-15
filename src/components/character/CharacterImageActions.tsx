import React from "react";
import { toast } from "sonner";

interface CharacterImageActionsProps {
  profilePicture: string | undefined;
  onImageChange: (imageUrl: string, type: 'profilePicture' | 'fullBody') => void;
  setIsGeneratingFullBody: (isGenerating: boolean) => void;
}

// Change this to a custom hook instead of a React component
export const useCharacterImageActions = ({
  profilePicture,
  onImageChange,
  setIsGeneratingFullBody
}: CharacterImageActionsProps) => {
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

// Keep the component for backward compatibility, but it now uses the hook
const CharacterImageActions: React.FC<CharacterImageActionsProps> = (props) => {
  // This component doesn't render anything visible
  // It's just a wrapper around the hook for compatibility
  return null;
};

export default CharacterImageActions;
