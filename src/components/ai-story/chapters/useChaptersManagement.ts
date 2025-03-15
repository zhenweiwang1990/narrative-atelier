
import { useState } from 'react';
import { toast } from 'sonner';
import { Story } from '@/utils/types';
import { useChapterFileUpload } from '@/hooks/chapters/useChapterFileUpload';
import { useChapterAIProcessing } from '@/hooks/chapters/useChapterAIProcessing';
import { useChapterOperations } from '@/hooks/chapters/useChapterOperations';

export function useChaptersManagement(story: Story, setStory: (story: Story) => void) {
  // Use the smaller, more focused hooks
  const {
    file,
    isProcessing,
    handleFileUpload,
    processNovelFile
  } = useChapterFileUpload(story, setStory);
  
  const {
    handleAIProcess,
    handleMarkingToServer
  } = useChapterAIProcessing(story, setStory);
  
  const {
    selectedChapterId,
    setSelectedChapterId,
    showMergeConfirm,
    setShowMergeConfirm,
    chapters,
    handleAddChapter,
    handleChapterChange,
    handleMergeToStory
  } = useChapterOperations(story, setStory);

  return {
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
  };
}
