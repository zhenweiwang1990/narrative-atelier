
import { useState } from 'react';
import { Story } from '@/utils/types';
import { toast } from 'sonner';
import { saveAllStories } from '@/utils/storyLoading';
import { readStoryFile, exportStoryAsFile } from '@/utils/fileOperations';
import { updateStoryInList } from '@/utils/storyOperations';

export function useStoryFileOperations(
  story: Story | null,
  stories: Story[],
  setStories: React.Dispatch<React.SetStateAction<Story[]>>,
  setStory: React.Dispatch<React.SetStateAction<Story | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  // Handle story import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    readStoryFile(
      file,
      stories,
      (importedStory, updatedStories) => {
        try {
          setStories(updatedStories);
          setStory(importedStory);
          saveAllStories(updatedStories, importedStory.id);
        } catch (saveError) {
          console.error('Failed to save imported story:', saveError);
          setError('保存导入的剧情失败');
          toast.error('保存导入的剧情失败');
        }
      },
      (errorMessage) => {
        setError(errorMessage);
      }
    );
    
    // Reset input value to allow importing the same file again
    e.target.value = '';
  };

  // Handle story save
  const handleSave = async (): Promise<boolean> => {
    setError(null);
    
    if (story) {
      try {
        // Update the story in the stories array
        const updatedStories = updateStoryInList(story, stories);
        
        setStories(updatedStories);
        saveAllStories(updatedStories, story.id);
        toast.success('保存剧情成功');
        return true;
      } catch (error) {
        console.error('Failed to save story:', error);
        setError('保存剧情失败');
        toast.error('保存剧情失败');
        return false;
      }
    }
    return false;
  };

  // Handle story export
  const handleExport = () => {
    if (!story) {
      toast.error('没有可导出的剧情');
      return;
    }
    
    exportStoryAsFile(story);
  };

  return {
    handleImport,
    handleSave,
    handleExport
  };
}
