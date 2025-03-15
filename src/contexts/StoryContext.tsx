
import React, { createContext, useContext } from 'react';
import { Story } from '@/utils/types';

interface StoryContextType {
  story: Story | null;
  setStory: React.Dispatch<React.SetStateAction<Story | null>>;
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
  handleSave: () => void;
  handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createNewStory: (title: string) => void;
  deleteStory: (storyId: string) => void;
}

// Context for sharing story data between components
export const StoryContext = createContext<StoryContextType>({
  story: null,
  setStory: () => {},
  stories: [],
  setStories: () => {},
  handleSave: () => {},
  handleImport: () => {},
  createNewStory: () => {},
  deleteStory: () => {}
});

export const useStory = () => useContext(StoryContext);
