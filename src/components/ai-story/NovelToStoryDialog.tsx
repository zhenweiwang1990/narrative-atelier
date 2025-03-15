
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Story } from '@/utils/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FileUploadStep from './novel-dialog/FileUploadStep';
import ChapterEditStep from './novel-dialog/ChapterEditStep';
import ConversionStep from './novel-dialog/ConversionStep';
import MergeConfirmationDialog from './novel-dialog/MergeConfirmationDialog';
import { useNovelProcessing } from './novel-dialog/useNovelProcessing';

interface NovelToStoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story | null;
  setStory: (story: Story) => void;
}

const NovelToStoryDialog: React.FC<NovelToStoryDialogProps> = ({
  isOpen,
  onClose,
  story,
  setStory
}) => {
  const {
    step,
    file,
    isProcessing,
    chapters,
    showConfirmation,
    isConverting,
    handleFileChange,
    handleNextStep,
    handlePreviousStep,
    processNovel,
    handleChapterContentChange,
    regenerateChapter,
    convertToStory,
    mergeToStory,
    setShowConfirmation
  } = useNovelProcessing(story, setStory);

  const closeDialog = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>从小说创建剧情 - 步骤 {step}/3</DialogTitle>
            <DialogDescription>
              {step === 1 && '上传小说文件，系统将自动分割成章节'}
              {step === 2 && '编辑章节内容，添加选项、QTE和对话任务标记'}
              {step === 3 && '逐章节转换为交互式剧情结构'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <Tabs value={`step-${step}`} className="w-full h-full">
              {/* 步骤 1: 上传文件 */}
              <TabsContent value="step-1" className="mt-0 h-full">
                <FileUploadStep 
                  file={file}
                  isProcessing={isProcessing}
                  onFileChange={handleFileChange}
                  onProcessFile={processNovel}
                />
              </TabsContent>
              
              {/* 步骤 2: 编辑章节 */}
              <TabsContent value="step-2" className="mt-0 h-[60vh]">
                <ChapterEditStep 
                  chapters={chapters}
                  onChapterContentChange={handleChapterContentChange}
                  onRegenerateChapter={regenerateChapter}
                />
              </TabsContent>
              
              {/* 步骤 3: 转换章节 */}
              <TabsContent value="step-3" className="mt-0 h-[60vh]">
                <ConversionStep 
                  chapters={chapters}
                  isConverting={isConverting}
                  onConvertChapter={convertToStory}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={handlePreviousStep}>
                上一步
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              disabled={step === 1 && chapters.length === 0}
            >
              {step < 3 ? '下一步' : '完成'}
              {step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MergeConfirmationDialog 
        isOpen={showConfirmation} 
        onClose={() => setShowConfirmation(false)}
        onConfirm={mergeToStory}
      />
    </>
  );
};

export default NovelToStoryDialog;
