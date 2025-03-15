
import React, { useState } from 'react';
import { Story } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import SimpleIdeaDialog from './SimpleIdeaDialog';
import ChapterItem from './chapters/ChapterItem';
import ChaptersHeader from './chapters/ChaptersHeader';
import EmptyChaptersState from './chapters/EmptyChaptersState';
import MergeConfirmDialog from './chapters/MergeConfirmDialog';
import { useChaptersManagement } from './chapters/useChaptersManagement';

interface ChaptersListProps {
  story: Story;
  setStory: (story: Story) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ story, setStory }) => {
  const [isShowSimpleIdeaDialog, setIsShowSimpleIdeaDialog] = useState(false);
  
  const {
    file,
    isProcessing,
    selectedChapterId,
    showMergeConfirm,
    chapters,
    setSelectedChapterId,
    setShowMergeConfirm,
    handleAddChapter,
    handleFileUpload,
    processNovelFile,
    handleChapterChange,
    handleAIProcess,
    handleMarkingToServer,
    handleMergeToStory
  } = useChaptersManagement(story, setStory);
  
  // Wrapper functions to convert Promise<string|number> to Promise<void>
  const processWithAI = async (chapterId: string): Promise<void> => {
    await handleAIProcess(chapterId);
    return;
  };

  const markToServer = async (chapterId: string): Promise<void> => {
    await handleMarkingToServer(chapterId);
    return;
  };
  
  return (
    <>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>剧情章节</CardTitle>
          <ChaptersHeader 
            onAddChapter={handleAddChapter}
            onUploadClick={() => document.getElementById('novel-file')?.click()}
            onAICreateClick={() => setIsShowSimpleIdeaDialog(true)}
            onFileUpload={handleFileUpload}
            isProcessing={isProcessing}
            onProcessFile={processNovelFile}
            file={file}
          />
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-[calc(100vh-13rem)]">
            {chapters.length === 0 ? (
              <EmptyChaptersState />
            ) : (
              <Accordion
                type="single"
                collapsible
                value={selectedChapterId || undefined}
                onValueChange={setSelectedChapterId}
                className="space-y-2"
              >
                {chapters.map((chapter) => (
                  <ChapterItem
                    key={chapter.id}
                    chapter={chapter}
                    onChapterChange={handleChapterChange}
                    onAIProcess={processWithAI}
                    onMarkingToServer={markToServer}
                  />
                ))}
              </Accordion>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      
      <SimpleIdeaDialog
        isOpen={isShowSimpleIdeaDialog}
        onClose={() => setIsShowSimpleIdeaDialog(false)}
        story={story}
        setStory={setStory}
      />
      
      <MergeConfirmDialog
        open={showMergeConfirm}
        onOpenChange={setShowMergeConfirm}
        onConfirm={handleMergeToStory}
        onCancel={() => setShowMergeConfirm(false)}
      />
    </>
  );
};

export default ChaptersList;
