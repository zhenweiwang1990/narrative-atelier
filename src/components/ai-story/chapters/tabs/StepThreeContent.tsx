
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";
import TextMarkerContextMenu from '../TextMarkerContextMenu';
import InteractionMarkingGuide from '../InteractionMarkingGuide';

interface StepThreeContentProps {
  chapter: {
    id: string;
    markedContent?: string;
    mainStoryContent?: string;
  };
  onChapterChange: (chapterId: string, field: string, value: string) => void;
  onPrevStep: () => void;
  onPreviewMainStory: () => Promise<void>;
  isProcessingPreview: boolean;
}

const StepThreeContent: React.FC<StepThreeContentProps> = ({
  chapter,
  onChapterChange,
  onPrevStep,
  onPreviewMainStory,
  isProcessingPreview
}) => {
  const hasContent = !!chapter.markedContent || !!chapter.mainStoryContent;

  return (
    <div className="space-y-4">
      <InteractionMarkingGuide />
      
      <TextMarkerContextMenu
        rows={10}
        value={chapter.markedContent || chapter.mainStoryContent || ''}
        onChange={(value) => onChapterChange(chapter.id, 'markedContent', value)}
        className="w-full resize-none"
        placeholder="在这里添加互动标记..."
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
            onClick={onPreviewMainStory}
            disabled={!hasContent || isProcessingPreview}
          >
            {isProcessingPreview ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                处理中...
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4 mr-2" />
                预览主线
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepThreeContent;
