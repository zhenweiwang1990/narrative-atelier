
import React, { ReactNode, useState, useEffect } from 'react';
import { Story } from '@/utils/types';
import { loadStory, saveStory, createBlankStory } from '@/utils/storage';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [story, setStory] = useState<Story | null>(null);

  // Load story on component mount
  useEffect(() => {
    const savedStory = loadStory();
    if (savedStory) {
      setStory(savedStory);
    } else {
      // Create a blank story if none exists
      const newStory = createBlankStory();
      setStory(newStory);
      saveStory(newStory);
    }
  }, []);

  // Handle story import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedStory = JSON.parse(event.target?.result as string) as Story;
        setStory(importedStory);
        saveStory(importedStory);
      } catch (error) {
        console.error('Failed to parse imported story:', error);
        // TODO: Show error toast
      }
    };
    reader.readAsText(file);
    
    // Reset input value to allow importing the same file again
    e.target.value = '';
  };

  // Handle story save
  const handleSave = () => {
    if (story) {
      saveStory(story);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar story={story} onImport={handleImport} onSave={handleSave} />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 animate-fade-up">
        {story ? (
          <StoryContext.Provider value={{ story, setStory }}>
            {children}
          </StoryContext.Provider>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-pulse text-center">
              <p className="text-lg text-muted-foreground">Loading story data...</p>
            </div>
          </div>
        )}
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            Narrative Atelier — Interactive Story Editor
          </p>
        </div>
      </footer>
    </div>
  );
};

// Context for sharing story data between components
export const StoryContext = React.createContext<{
  story: Story | null;
  setStory: React.Dispatch<React.SetStateAction<Story | null>>;
}>({
  story: null,
  setStory: () => {},
});

export const useStory = () => React.useContext(StoryContext);

export default Layout;
