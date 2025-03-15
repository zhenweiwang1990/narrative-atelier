
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save, Eye } from "lucide-react";
import TextMarkerContextMenu from './TextMarkerContextMenu';
import InteractionMarkingGuide from './InteractionMarkingGuide';
import ChapterPreview from './ChapterPreview';
import { Chapter } from '@/utils/types';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handlePreviewMainStory = () => {
    // Store the current chapter ID in sessionStorage for the preview page
    sessionStorage.setItem('previewChapterId', chapter.id);
    navigate('/story-creation/preview');
  };

  return (
    <div className="space-y-4">
      <div className="w-full bg-muted/30 rounded-lg p-2">
        <ul className="flex items-center justify-between relative">
          <li className="flex flex-col items-center w-1/4">
            <div className="rounded-full w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center mb-1">1</div>
            <span className="text-xs text-center">获得原文</span>
          </li>

          <li className="flex flex-col items-center w-1/4">
            <div className={`rounded-full w-8 h-8 ${chapter.isProcessed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} flex items-center justify-center mb-1`}>2</div>
            <span className="text-xs text-center">处理文本</span>
          </li>

          <li className="flex flex-col items-center w-1/4">
            <div className={`rounded-full w-8 h-8 ${chapter.markedContent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} flex items-center justify-center mb-1`}>3</div>
            <span className="text-xs text-center">标记互动</span>
          </li>

          <li className="flex flex-col items-center w-1/4">
            <div className={`rounded-full w-8 h-8 ${chapter.isConverted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} flex items-center justify-center mb-1`}>4</div>
            <span className="text-xs text-center">主线入库</span>
          </li>

          {/* Progress bar connecting the steps */}
          <div className="absolute top-4 left-[12%] w-[76%] h-1 bg-muted z-0">
            <div 
              className="h-full bg-primary" 
              style={{ 
                width: chapter.isConverted ? '100%' : 
                      chapter.markedContent ? '66%' : 
                      chapter.isProcessed ? '33%' : '0%' 
              }}
            />
          </div>
        </ul>
      </div>

      <Tabs defaultValue="original">
        <TabsList className="mb-4">
          <TabsTrigger value="original">获得原文</TabsTrigger>
          <TabsTrigger value="mainStory" disabled={!chapter.isProcessed}>处理文本</TabsTrigger>
          <TabsTrigger value="interaction" disabled={!chapter.isProcessed}>标记互动</TabsTrigger>
          <TabsTrigger value="preview" disabled={!chapter.isProcessed}>主线入库</TabsTrigger>
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
              onClick={handlePreviewMainStory}
              disabled={!chapter.markedContent && !chapter.mainStoryContent}
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              预览主线
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
              <Save className="h-4 w-4 mr-2" />
              入库制作
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChapterContentTabs;
