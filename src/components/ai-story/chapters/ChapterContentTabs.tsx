
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chapter } from '@/utils/types';
import AutomatedProcessingDialog from './AutomatedProcessingDialog';
import StepOneContent from './tabs/StepOneContent';
import StepTwoContent from './tabs/StepTwoContent';
import StepThreeContent from './tabs/StepThreeContent';
import StepFourContent from './tabs/StepFourContent';
import { useChapterTabs } from './hooks/useChapterTabs';
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
  const {
    activeTab,
    setActiveTab,
    isProcessingPreview,
    showProcessingDialog,
    setShowProcessingDialog,
    handlePreviewMainStory,
    handleMarkingToServerClick
  } = useChapterTabs();

  // 处理自动处理完成后的回调
  const handleProcessingComplete = async () => {
    setShowProcessingDialog(false);
    
    try {
      // 调用实际的入库方法
      await onMarkingToServer(chapter.id);
      toast.success('章节已成功入库，可进行人工优化');
    } catch (error) {
      console.error('入库失败', error);
      toast.error('入库失败，请重试');
    }
  };

  return (
    <>
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

        <TabsContent value="step1">
          <StepOneContent 
            chapter={chapter}
            onChapterChange={onChapterChange}
            onAIProcess={onAIProcess}
            onNextStep={() => setActiveTab("step2")}
          />
        </TabsContent>

        <TabsContent value="step2">
          <StepTwoContent 
            chapter={chapter}
            onChapterChange={onChapterChange}
            onAIProcess={onAIProcess}
            onPrevStep={() => setActiveTab("step1")}
            onNextStep={() => setActiveTab("step3")}
          />
        </TabsContent>

        <TabsContent value="step3">
          <StepThreeContent 
            chapter={chapter}
            onChapterChange={onChapterChange}
            onPrevStep={() => setActiveTab("step2")}
            onPreviewMainStory={handlePreviewMainStory}
            isProcessingPreview={isProcessingPreview}
          />
        </TabsContent>
        
        <TabsContent value="step4">
          <StepFourContent 
            chapter={chapter}
            onPrevStep={() => setActiveTab("step3")}
            onMarkingToServer={handleMarkingToServerClick}
          />
        </TabsContent>
      </Tabs>
      
      <AutomatedProcessingDialog 
        isOpen={showProcessingDialog}
        onClose={() => setShowProcessingDialog(false)}
        onComplete={handleProcessingComplete}
      />
    </>
  );
};

export default ChapterContentTabs;
