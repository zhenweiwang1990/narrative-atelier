
import React from 'react';
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";
import ChapterPreview from '../ChapterPreview';

interface StepFourContentProps {
  chapter: {
    markedContent?: string;
    mainStoryContent?: string;
  };
  onPrevStep: () => void;
  onMarkingToServer: () => void;
}

const StepFourContent: React.FC<StepFourContentProps> = ({
  chapter,
  onPrevStep,
  onMarkingToServer
}) => {
  const hasContent = !!chapter.markedContent || !!chapter.mainStoryContent;
  
  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4 bg-muted/20">
        <ChapterPreview content={chapter.markedContent || chapter.mainStoryContent || ''} />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevStep}
        >
          上一步
        </Button>
        <Button 
          onClick={onMarkingToServer}
          disabled={!hasContent}
        >
          <Server className="h-4 w-4 mr-2" />
          入库制作
        </Button>
      </div>
    </div>
  );
};

export default StepFourContent;
