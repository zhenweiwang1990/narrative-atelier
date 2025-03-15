
import React, { createContext, useContext } from 'react';
import { Story } from '@/utils/types';

interface StoryContextType {
  story: Story | null;
  setStory: React.Dispatch<React.SetStateAction<Story | null>>;
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
  handleSave: () => Promise<boolean>;
  handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createNewStory: (title: string) => void;
  deleteStory: (storyId: string) => void;
  loading: boolean;
  error: string | null;
}

// Context for sharing story data between components
export const StoryContext = createContext<StoryContextType>({
  story: null,
  setStory: () => {},
  stories: [],
  setStories: () => {},
  handleSave: async () => false,
  handleImport: () => {},
  createNewStory: () => {},
  deleteStory: () => {},
  loading: false,
  error: null
});

export const useStory = () => useContext(StoryContext);
