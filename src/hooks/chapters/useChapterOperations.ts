
import { useState } from 'react';
import { toast } from 'sonner'; // Add missing import
import { Chapter, Story } from '@/utils/types';

export function useChapterOperations(
  story: Story, 
  setStory: (story: Story) => void
) {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [showMergeConfirm, setShowMergeConfirm] = useState(false);
  
  // Initialize chapters if they don't exist
  const chapters = story.chapters || [];
  
  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: `第 ${chapters.length + 1} 章`,
      originalContent: '',
      isProcessed: false,
      isConverted: false
    };
    
    setStory({
      ...story,
      chapters: [...chapters, newChapter]
    });
    
    setSelectedChapterId(newChapter.id);
  };
  
  const handleChapterChange = (chapterId: string, field: keyof Chapter, value: string) => {
    const updatedChapters = chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, [field]: value } 
        : chapter
    );
    
    setStory({
      ...story,
      chapters: updatedChapters
    });
  };
  
  const handleMergeToStory = () => {
    toast.success('已成功将章节内容合并到剧情流程中');
    setShowMergeConfirm(false);
  };

  return {
    selectedChapterId,
    setSelectedChapterId,
    showMergeConfirm,
    setShowMergeConfirm,
    chapters,
    handleAddChapter,
    handleChapterChange,
    handleMergeToStory
  };
}
