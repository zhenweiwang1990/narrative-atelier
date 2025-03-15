
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface StoriesErrorStateProps {
  onRetry: () => void;
  errorMessage?: string;
}

export const StoriesErrorState: React.FC<StoriesErrorStateProps> = ({ 
  onRetry, 
  errorMessage = "加载剧情失败" 
}) => {
  // Log the error to make debugging easier
  console.error('StoriesErrorState rendered with error:', errorMessage);
  
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-medium mb-2">无法加载剧情</h3>
      <p className="text-muted-foreground mb-6">{errorMessage}</p>
      <Button onClick={onRetry} className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        重试
      </Button>
    </div>
  );
};
