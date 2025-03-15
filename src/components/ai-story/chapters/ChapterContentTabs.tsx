
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save, ArrowRight, Server } from "lucide-react";
import TextMarkerContextMenu from './TextMarkerContextMenu';
import InteractionMarkingGuide from './InteractionMarkingGuide';
import ChapterPreview from './ChapterPreview';
import { Chapter } from '@/utils/types';
import { toast } from 'sonner';

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
  const [activeTab, setActiveTab] = useState("step1");
  const [isProcessingPreview, setIsProcessingPreview] = useState(false);

  // 处理预览主线按钮
  const handlePreviewMainStory = async () => {
    try {
      setIsProcessingPreview(true);
      // TODO: 实际调用服务器处理互动标记内容并转换为JSON
      toast.loading("正在处理互动标记...");
      
      // Mock: 假设等待1秒模拟服务器处理
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("处理完成，跳转到主线入库阶段");
      
      // 直接切换到第四个Tab而不是跳转页面
      setActiveTab("step4");
    } catch (error) {
      console.error('预览主线失败', error);
      toast.error('预览失败，请重试');
    } finally {
      setIsProcessingPreview(false);
    }
  };

  return (
    <Tabs 
      defaultValue="step1" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="mb-4 w-full justify-start bg-background border-b rounded-none px-0 relative">
        <div className="absolute h-[3px] bottom-0 left-0 right-0 bg-muted-foreground/20"></div>
        <TabsTrigger 
          value="step1" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 relative"
        >
          1. 获得原文
        </TabsTrigger>
        <TabsTrigger 
          value="step2" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
          disabled={!chapter.isProcessed}
        >
          2. 处理文本
        </TabsTrigger>
        <TabsTrigger 
          value="step3" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
          disabled={!chapter.isProcessed}
        >
          3. 标记互动
        </TabsTrigger>
        <TabsTrigger 
          value="step4" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
          disabled={!chapter.isProcessed}
        >
          4. 主线入库
        </TabsTrigger>
      </TabsList>

      <TabsContent value="step1" className="space-y-4">
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
                onClick={() => {
                  setActiveTab("step2");
                }}
              >
                下一步
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="step2" className="space-y-4">
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
            onClick={() => setActiveTab("step1")}
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
              onClick={() => setActiveTab("step3")}
            >
              下一步
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="step3" className="space-y-4">
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
            onClick={() => setActiveTab("step2")}
          >
            上一步
          </Button>
          <div className="flex gap-2">
            <Button 
              onClick={handlePreviewMainStory}
              disabled={!chapter.markedContent && !chapter.mainStoryContent || isProcessingPreview}
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
      </TabsContent>
      
      <TabsContent value="step4" className="space-y-4">
        <div className="border rounded-md p-4 bg-muted/20">
          <ChapterPreview content={chapter.markedContent || chapter.mainStoryContent || ''} />
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setActiveTab("step3")}
          >
            上一步
          </Button>
          <Button 
            onClick={() => onMarkingToServer(chapter.id)}
            disabled={!chapter.markedContent && !chapter.mainStoryContent}
          >
            <Server className="h-4 w-4 mr-2" />
            入库制作
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ChapterContentTabs;
