
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { useStory } from '@/context/StoryContext';
import { loadStory, createBlankStory } from '@/utils/storage';
import { toast } from '@/components/ui/use-toast';
import { Story } from '@/utils/types';

interface StoryInitializerProps {
  children: React.ReactNode;
}

export const StoryInitializer: React.FC<StoryInitializerProps> = ({ children }) => {
  const { story, setStory } = useStory();
  const { 
    user, 
    currentStorySlug, 
    setCurrentStorySlug,
    setCurrentStory,
    loadStoryFromDatabase
  } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
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
  }, [isEditorRoute, urlSlug, user, setCurrentStorySlug, navigate, setCurrentStory, loadStoryFromDatabase, setStory]);

  // Redirect to auth if not logged in and trying to access editor
  useEffect(() => {
    if (isEditorRoute && !user) {
      navigate('/auth');
    }
  }, [isEditorRoute, user, navigate]);

  // Auto-save story changes
  useEffect(() => {
    if (story && currentStorySlug && user && isEditorRoute) {
      const saveTimer = setTimeout(() => {
        // This will be handled by the StoryProvider
      }, 5000); // Auto-save after 5 seconds of inactivity
      
      return () => clearTimeout(saveTimer);
    }
  }, [story, currentStorySlug, user, isEditorRoute]);

  return <>{children}</>;
};
