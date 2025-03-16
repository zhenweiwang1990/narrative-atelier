
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Story } from "@/utils/types";
import FloatingMobilePreview from "@/components/flow/FloatingMobilePreview";
import FloatingElementEditor from "@/components/flow/FloatingElementEditor";
import { StoryContext } from "@/contexts/StoryContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const Popup = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "preview";
  const sceneId = searchParams.get("sceneId") || "";
  const elementId = searchParams.get("elementId") || null;
  
  // Local state for the story data
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Functions to handle closing the popup
  const handleClose = () => {
    window.close();
  };
  
  // Function to handle scene selection
  const handleSceneChange = (id: string) => {
    // Just update local scene ID, no need to update parent window
    // as this is read-only in the popup
  };
  
  // Listen for messages from the parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin of the message
      if (event.origin !== window.location.origin) return;
      
      const { type, payload } = event.data;
      
      switch (type) {
        case 'STORY_DATA':
          try {
            const parsedStory = JSON.parse(payload.story);
            setStory(parsedStory);
            setLoading(false);
          } catch (error) {
            console.error("Failed to parse story data:", error);
          }
          break;
          
        case 'SCENE_CHANGE':
          // Update the displayed scene when parent window changes scene
          window.history.replaceState(
            {}, 
            '', 
            `/popup?mode=${mode}&sceneId=${payload.sceneId}${elementId ? `&elementId=${elementId}` : ''}`
          );
          break;
          
        case 'ELEMENT_CHANGE':
          // Update element selection when parent window changes element
          window.history.replaceState(
            {}, 
            '', 
            `/popup?mode=${mode}&sceneId=${sceneId}&elementId=${payload.elementId || ''}`
          );
          break;
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Notify parent window that popup is ready
    window.opener.postMessage({ type: 'POPUP_READY' }, window.location.origin);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [mode, sceneId, elementId]);
  
  // Provide mock functions for the StoryContext that are not used in popup
  const contextValue = {
    story,
    setStory,
    stories: [],
    setStories: () => {},
    handleSave: async () => false,
    handleImport: () => {},
    handleExport: () => {},
    createNewStory: () => {},
    deleteStory: () => {},
    loading: false,
    error: null
  };
  
  if (loading || !story) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p className="text-foreground">加载中...</p>
      </div>
    );
  }
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <StoryContext.Provider value={contextValue}>
        <div className="min-h-screen bg-background flex items-start justify-start p-6">
          {mode === "preview" && (
            <FloatingMobilePreview
              selectedSceneId={sceneId}
              setSelectedSceneId={handleSceneChange}
              isOpen={true}
              onToggle={handleClose}
            />
          )}
          
          {mode === "editor" && sceneId && (
            <FloatingElementEditor
              sceneId={sceneId}
              currentElementId={elementId}
              position={{ x: 20, y: 20 }}
              onClose={handleClose}
              isOpen={true}
              showSceneProperties={!elementId}
              isPopup={true}
            />
          )}
        </div>
        <Toaster />
        <Sonner />
      </StoryContext.Provider>
    </ThemeProvider>
  );
};

export default Popup;
