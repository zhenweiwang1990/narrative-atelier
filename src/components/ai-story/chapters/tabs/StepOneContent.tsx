
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";
import TextMarkerContextMenu from '../TextMarkerContextMenu';

interface StepOneContentProps {
  chapter: {
    id: string;
    originalContent: string;
    isProcessed?: boolean;
  };
  onChapterChange: (chapterId: string, field: string, value: string) => void;
  onAIProcess: (chapterId: string) => Promise<void>;
  onNextStep: () => void;
}

const StepOneContent: React.FC<StepOneContentProps> = ({
  chapter,
  onChapterChange,
  onAIProcess,
  onNextStep
}) => {
  return (
    <div className="space-y-4">
      <TextMarkerContextMenu
        rows={10}
        value={chapter.originalContent}
        onChange={(value) => onChapterChange(chapter.id, 'originalContent', value)}
        className="w-full resize-none"
        placeholder="输入章节内容..."
      />

      <div className="flex justify-between">
        <div></div> {/* 空div用于对齐 */}
        <div className="flex gap-2">
          <Button 
            onClick={() => onAIProcess(chapter.id)}
            disabled={!chapter.originalContent}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            AI文本处理
          </Button>
          {chapter.isProcessed && (
            <Button 
              variant="outline" 
              onClick={onNextStep}
            >
              下一步
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOneContent;
