
import React from 'react';
import { Chapter } from '@/utils/types';
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Save } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ChapterItemProps {
  chapter: Chapter;
  onChapterChange: (chapterId: string, field: keyof Chapter, value: string) => void;
  onAIProcess: (chapterId: string) => Promise<void>;
  onMarkingToServer: (chapterId: string) => Promise<void>;
}

const ChapterItem: React.FC<ChapterItemProps> = ({
  chapter,
  onChapterChange,
  onAIProcess,
  onMarkingToServer
}) => {
  return (
    <AccordionItem
      key={chapter.id}
      value={chapter.id}
      className="border rounded-md overflow-hidden"
    >
      <AccordionTrigger className="px-4 py-2 hover:no-underline">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className="font-medium">{chapter.title}</span>
            {chapter.isConverted && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-800 dark:text-green-100">
                已转换
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {chapter.isConverted && <Check className="h-4 w-4 text-green-500" />}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4">
        <Tabs defaultValue="original">
          <TabsList className="mb-4">
            <TabsTrigger value="original">原文</TabsTrigger>
            <TabsTrigger value="mainStory" disabled={!chapter.isProcessed}>文本剧情</TabsTrigger>
            <TabsTrigger value="interaction" disabled={!chapter.isProcessed}>互动标记</TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="space-y-4">
            <Textarea
              rows={10}
              value={chapter.originalContent}
              onChange={(e) => onChapterChange(chapter.id, 'originalContent', e.target.value)}
              className="w-full resize-none"
              placeholder="输入章节内容..."
            />

            <div className="flex justify-end">
              <Button 
                onClick={() => onAIProcess(chapter.id)}
                disabled={!chapter.originalContent}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                AI文本处理
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="mainStory" className="space-y-4">
            <Textarea
              rows={10}
              value={chapter.mainStoryContent || ''}
              onChange={(e) => onChapterChange(chapter.id, 'mainStoryContent', e.target.value)}
              className="w-full resize-none"
              placeholder="AI 处理后的主线剧情会显示在这里..."
            />
          </TabsContent>

          <TabsContent value="interaction" className="space-y-4">
            <InteractionMarkingGuide />
            
            <Textarea
              rows={10}
              value={chapter.markedContent || chapter.mainStoryContent || ''}
              onChange={(e) => onChapterChange(chapter.id, 'markedContent', e.target.value)}
              className="w-full resize-none"
              placeholder="在这里添加互动标记..."
            />

            <div className="flex justify-end">
              <Button 
                onClick={() => onMarkingToServer(chapter.id)}
                disabled={!chapter.markedContent && !chapter.mainStoryContent}
              >
                <Save className="h-4 w-4 mr-2" />
                标记入库
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};

const InteractionMarkingGuide = () => (
  <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-md mb-2">
    <p className="font-medium mb-1">标注格式：</p>
    <p>- 分隔场景：【场景：场景名称】</p>
    <p>- 选项：【选择：选项内容】</p>
    <p>- QTE：【QTE：描述内容】</p>
    <p>- 对话任务：【对话：任务内容】</p>
  </div>
);

export default ChapterItem;
