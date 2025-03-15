
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Story } from '@/utils/types';
import { saveStory, loadStory, createBlankStory } from '@/utils/storage';
import { toast } from '@/components/ui/use-toast';

interface StoryContextProps {
  story: Story | null;
  setStory: React.Dispatch<React.SetStateAction<Story | null>>;
  handleSave: () => void;
  handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StoryContext = createContext<StoryContextProps>({
  story: null,
  setStory: () => {},
  handleSave: () => {},
  handleImport: () => {}
});

export const useStory = () => useContext(StoryContext);

interface StoryProviderProps {
  children: ReactNode;
  onSaveToDatabase?: (story: Story, storySlug: string) => Promise<void>;
  onLoadFromDatabase?: (storySlug: string) => Promise<Story | null>;
  currentStorySlug?: string;
  setCurrentStory?: (story: Story) => void;
  user?: any;
}

export const StoryProvider: React.FC<StoryProviderProps> = ({ 
  children, 
  onSaveToDatabase,
  onLoadFromDatabase,
  currentStorySlug,
  setCurrentStory,
  user
}) => {
  const [story, setStory] = useState<Story | null>(null);

  // Handle story save
  const handleSave = async () => {
    if (story) {
      // Save to local storage for the current session
      saveStory(story);
      
      // If in editor mode and logged in, also save to database
      if (currentStorySlug && user && onSaveToDatabase) {
        await onSaveToDatabase(story, currentStorySlug);
      } else {
        toast({
          title: "保存成功",
          description: "剧情已保存到本地"
        });
      }
    }
  };

  // Handle story import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedStory = JSON.parse(event.target?.result as string) as Story;
        setStory(importedStory);
        
        if (currentStorySlug && user && onSaveToDatabase) {
          await onSaveToDatabase(importedStory, currentStorySlug);
        } else {
          saveStory(importedStory);
        }
        
        toast({
          title: "导入成功",
          description: "剧情已成功导入"
        });
      } catch (error) {
        console.error('Failed to parse imported story:', error);
        toast({
          title: "导入失败",
          description: "文件格式错误，请确保导入有效的JSON文件",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    
    // Reset input value to allow importing the same file again
    e.target.value = '';
  };

  return (
    <StoryContext.Provider value={{ story, setStory, handleSave, handleImport }}>
      {children}
    </StoryContext.Provider>
  );
};
