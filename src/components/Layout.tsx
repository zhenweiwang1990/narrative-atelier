
import React, { ReactNode, useState, useEffect } from 'react';
import { Story } from '@/utils/types';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { loadStory, saveStory, createBlankStory } from '@/utils/storage';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/components/ui/use-toast';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [story, setStory] = useState<Story | null>(null);
  const { 
    user, 
    currentStorySlug, 
    setCurrentStorySlug,
    currentStory,
    setCurrentStory,
    saveStoryToDatabase,
    loadStoryFromDatabase
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  
  // Check if route starts with /editor/
  const isEditorRoute = location.pathname.startsWith('/editor/');
  // Get the story slug from the URL when in editor mode
  const urlSlug = isEditorRoute ? location.pathname.split('/')[2] : null;

  // Load story on component mount or when URL slug changes
  useEffect(() => {
    const initializeStory = async () => {
      // For editor routes, load specific story
      if (isEditorRoute && urlSlug) {
        setCurrentStorySlug(urlSlug);
        
        if (user) {
          try {
            // Try to load from database
            const dbStory = await loadStoryFromDatabase(urlSlug);
            if (dbStory) {
              setStory(dbStory);
              setCurrentStory(dbStory);
              return;
            }
          } catch (error) {
            console.error("Failed to load story from database:", error);
            // Continue with fallback options rather than getting stuck
          }
        }
      } 
      
      // For non-editor routes or when database load fails
      if (!isEditorRoute) {
        const savedStory = loadStory();
        if (savedStory) {
          setStory(savedStory);
          return;
        }
      }
      
      // If no story found, create a blank one
      const newStory = createBlankStory();
      setStory(newStory);
      
      // If in editor mode, redirect to home if no story could be loaded
      if (isEditorRoute && !user) {
        navigate('/auth');
        toast({
          title: "请先登录",
          description: "您需要登录才能查看或编辑剧情",
          variant: "destructive"
        });
      }
    };

    initializeStory();
  }, [isEditorRoute, urlSlug, user, setCurrentStorySlug, navigate, setCurrentStory, loadStoryFromDatabase]);

  // Redirect to auth if not logged in and trying to access editor
  useEffect(() => {
    if (isEditorRoute && !user) {
      navigate('/auth');
    }
  }, [isEditorRoute, user, navigate]);

  // Handle story save
  const handleSave = async () => {
    if (story) {
      // Save to local storage for the current session
      saveStory(story);
      
      // If in editor mode and logged in, also save to database
      if (isEditorRoute && currentStorySlug && user) {
        await saveStoryToDatabase(story, currentStorySlug);
      } else {
        toast({
          title: "保存成功",
          description: "剧情已保存到本地"
        });
      }
    }
  };

  // Auto-save story changes
  useEffect(() => {
    if (story && currentStorySlug && user && isEditorRoute) {
      const saveTimer = setTimeout(() => {
        saveStoryToDatabase(story, currentStorySlug);
      }, 5000); // Auto-save after 5 seconds of inactivity
      
      return () => clearTimeout(saveTimer);
    }
  }, [story, currentStorySlug, user, isEditorRoute, saveStoryToDatabase]);

  // Handle story import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedStory = JSON.parse(event.target?.result as string) as Story;
        setStory(importedStory);
        
        if (isEditorRoute && currentStorySlug && user) {
          await saveStoryToDatabase(importedStory, currentStorySlug);
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <StoryContext.Provider value={{ story, setStory, handleSave, handleImport }}>
          <AppSidebar />
          <div className="flex flex-col flex-1 w-full">
            <main className="flex-1 px-3 py-3 md:px-4 md:py-4 animate-fade-up">
              {story ? (
                children
              ) : (
                <div className="flex items-center justify-center h-[60vh]">
                  <div className="animate-pulse text-center">
                    <p className="text-lg text-muted-foreground">正在加载剧情数据...</p>
                  </div>
                </div>
              )}
            </main>
            <footer className="py-3 border-t border-border">
              <div className="px-3 md:px-4">
                <p className="text-center text-xs text-muted-foreground">
                  Narrative Atelier — Interactive Story Editor
                </p>
              </div>
            </footer>
          </div>
        </StoryContext.Provider>
      </div>
    </SidebarProvider>
  );
};

// Context for sharing story data between components
export const StoryContext = React.createContext<{
  story: Story | null;
  setStory: React.Dispatch<React.SetStateAction<Story | null>>;
  handleSave: () => void;
  handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>({
  story: null,
  setStory: () => {},
  handleSave: () => {},
  handleImport: () => {}
});

export const useStory = () => React.useContext(StoryContext);

export default Layout;
