
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StoryProvider } from '@/context/StoryContext';
import { StoryLoader } from './layout/StoryLoader';
import { Footer } from './layout/Footer';
import { StoryInitializer } from './layout/StoryInitializer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { 
    user, 
    currentStorySlug,
    setCurrentStory,
    saveStoryToDatabase,
    loadStoryFromDatabase
  } = useAuth();
  const location = useLocation();
  
  // Check if route starts with /editor/
  const isEditorRoute = location.pathname.startsWith('/editor/');

  return (
    <SidebarProvider>
      <StoryProvider
        onSaveToDatabase={saveStoryToDatabase}
        onLoadFromDatabase={loadStoryFromDatabase}
        currentStorySlug={currentStorySlug}
        setCurrentStory={setCurrentStory}
        user={user}
      >
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <AppSidebar />
          <div className="flex flex-col flex-1 w-full">
            <StoryInitializer>
              <main className="flex-1 px-3 py-3 md:px-4 md:py-4 animate-fade-up">
                {children}
              </main>
            </StoryInitializer>
            <Footer />
          </div>
        </div>
      </StoryProvider>
    </SidebarProvider>
  );
};

// Legacy context export for backward compatibility
// This makes sure existing imports like "import { useStory } from '@/components/Layout'" still work
export { useStory } from '@/context/StoryContext';

export default Layout;
