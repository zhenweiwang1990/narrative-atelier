
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import TextMarkerContextMenu from './TextMarkerContextMenu';
import InteractionMarkingGuide from './InteractionMarkingGuide';
import ChapterPreview from './ChapterPreview';
import { Chapter } from '@/utils/types';

interface ChapterContentTabsProps {
  chapter: Chapter;
  onChapterChange: (chapterId: string, field: keyof Chapter, value: string) => void;
  onAIProcess: (chapterId: string) => Promise<void>;
  onMarkingToServer: (chapterId: string) => Promise<void>;
}

const ChapterContentTabs: React.FC<ChapterContentTabsProps> = ({
  chapter,
  onChapterChange,
  onAIProcess,
  onMarkingToServer
}) => {
  return (
    <Tabs defaultValue="original">
      <TabsList className="mb-4">
        <TabsTrigger value="original">原文</TabsTrigger>
        <TabsTrigger value="mainStory" disabled={!chapter.isProcessed}>文本剧情</TabsTrigger>
        <TabsTrigger value="interaction" disabled={!chapter.isProcessed}>互动标记</TabsTrigger>
        <TabsTrigger value="preview" disabled={!chapter.isProcessed}>预览</TabsTrigger>
      </TabsList>

      <TabsContent value="original" className="space-y-4">
        <TextMarkerContextMenu
          rows={10}
          value={chapter.originalContent}
          onChange={(value) => onChapterChange(chapter.id, 'originalContent', value)}
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
        <TextMarkerContextMenu
          rows={10}
          value={chapter.mainStoryContent || ''}
          onChange={(value) => onChapterChange(chapter.id, 'mainStoryContent', value)}
          className="w-full resize-none"
          placeholder="AI 处理后的主线剧情会显示在这里..."
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={() => onAIProcess(chapter.id)}
            disabled={!chapter.originalContent}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            重新处理
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="interaction" className="space-y-4">
        <InteractionMarkingGuide />
        
        <TextMarkerContextMenu
          rows={10}
          value={chapter.markedContent || chapter.mainStoryContent || ''}
          onChange={(value) => onChapterChange(chapter.id, 'markedContent', value)}
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
      
      <TabsContent value="preview" className="space-y-4">
        <div className="border rounded-md p-4 bg-muted/20">
          <ChapterPreview content={chapter.markedContent || chapter.mainStoryContent || ''} />
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={() => onMarkingToServer(chapter.id)}
            disabled={!chapter.markedContent && !chapter.mainStoryContent}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            重新转换
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ChapterContentTabs;
