
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";
import TextMarkerContextMenu from '../TextMarkerContextMenu';

interface StepTwoContentProps {
  chapter: {
    id: string;
    originalContent: string;
    mainStoryContent?: string;
  };
  onChapterChange: (chapterId: string, field: string, value: string) => void;
  onAIProcess: (chapterId: string) => Promise<void>;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const StepTwoContent: React.FC<StepTwoContentProps> = ({
  chapter,
  onChapterChange,
  onAIProcess,
  onPrevStep,
  onNextStep
}) => {
  return (
    <div className="space-y-4">
      <TextMarkerContextMenu
        rows={10}
        value={chapter.mainStoryContent || ''}
        onChange={(value) => onChapterChange(chapter.id, 'mainStoryContent', value)}
        className="w-full resize-none"
        placeholder="AI 处理后的主线剧情会显示在这里..."
      />
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevStep}
        >
          上一步
        </Button>
        <div className="flex gap-2">
          <Button 
            onClick={() => onAIProcess(chapter.id)}
            disabled={!chapter.originalContent}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            重新处理
          </Button>
          <Button 
            variant="outline" 
            onClick={onNextStep}
          >
            下一步
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepTwoContent;
