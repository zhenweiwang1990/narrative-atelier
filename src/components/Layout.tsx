
import React, { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useStoryManagement } from '@/hooks/useStoryManagement';
import { StoryContext } from '@/contexts/StoryContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { 
    story, 
    setStory, 
    stories, 
    setStories, 
    loading, 
    error,
    handleSave, 
    handleImport, 
    createNewStory, 
    deleteStory 
  } = useStoryManagement();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <StoryContext.Provider value={{ 
          story, 
          setStory, 
          stories, 
          setStories,
          handleSave, 
          handleImport,
          createNewStory,
          deleteStory,
          loading,
          error
        }}>
          <AppSidebar />
          <div className="flex flex-col flex-1 w-full">
            <main className="flex-1 px-3 py-3 md:px-4 md:py-4 animate-fade-up">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>错误</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {loading ? (
                <div className="flex items-center justify-center h-[60vh]">
                  <div className="animate-pulse text-center">
                    <p className="text-lg text-muted-foreground">加载剧情数据中...</p>
                  </div>
                </div>
              ) : (
                children
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

export { StoryContext, useStory } from '@/contexts/StoryContext';
export default Layout;
