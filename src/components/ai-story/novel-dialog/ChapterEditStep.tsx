
import React from 'react';
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations: string[];
  isConverted?: boolean;
}

interface ChapterEditStepProps {
  chapters: ChapterData[];
  onChapterContentChange: (index: number, newContent: string) => void;
  onRegenerateChapter: (index: number) => void;
}

const ChapterEditStep: React.FC<ChapterEditStepProps> = ({
  chapters,
  onChapterContentChange,
  onRegenerateChapter,
}) => {
  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-6 pb-4">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">{chapter.title}</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onRegenerateChapter(index)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                重新生成
              </Button>
            </div>
            
            <Textarea
              value={chapter.content}
              onChange={(e) => onChapterContentChange(index, e.target.value)}
              className="h-48 resize-none"
            />
            
            <MarkupGuide />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

const MarkupGuide = () => (
  <div className="text-xs text-muted-foreground">
    <p>标注格式：</p>
    <p>- 选项：【选择：选项内容】</p>
    <p>- QTE：【QTE：描述内容】</p>
    <p>- 对话任务：【对话：任务内容】</p>
  </div>
);

export default ChapterEditStep;
