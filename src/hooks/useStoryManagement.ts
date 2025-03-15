
import { useState } from 'react';
import { Story } from '@/utils/types';
import { 
  useStoryLoading,
  useStoryFileOperations,
  useStoryOperations,
  useStoryPersistence
} from './story';

export function useStoryManagement() {
  const {
    stories,
    setStories,
    currentStory,
    setCurrentStory,
    loading,
    error,
    setError
  } = useStoryLoading();

  // Alias for backward compatibility
  const [story, setStory] = [currentStory, setCurrentStory];

  const {
    handleImport,
    handleSave,
    handleExport
  } = useStoryFileOperations(story, stories, setStories, setStory, setError);

  const {
    createNewStory,
    deleteStory
  } = useStoryOperations(stories, setStories, setStory, setError);

  // Persist current story ID
  useStoryPersistence(story);

  return {
    story,
    setStory,
    stories,
    setStories,
    loading,
    error,
    handleSave,
    handleImport,
    handleExport,
    createNewStory,
    deleteStory
  };
}
