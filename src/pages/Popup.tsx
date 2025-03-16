
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FloatingMobilePreview from "@/components/flow/FloatingMobilePreview";
import FloatingElementEditor from "@/components/flow/FloatingElementEditor";
import { StoryContext } from "@/contexts/StoryContext";
import { Story } from "@/utils/types";

const Popup = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "preview";
  const sceneId = searchParams.get("sceneId");
  const elementId = searchParams.get("elementId");
  
  const [story, setStory] = useState<Story | null>(null);
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(sceneId);
  const [currentElementId, setCurrentElementId] = useState<string | null>(elementId);
  
  // Listen for story data from the parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data && event.data.type === 'storyData') {
        setStory(event.data.story);
        if (event.data.currentElementId) {
          setCurrentElementId(event.data.currentElementId);
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Set window title
    document.title = type === 'preview' ? '故事预览' : '元素编辑器';
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [type]);
  
  // Handle element selection
  const handleElementSelect = (id: string | null) => {
    setCurrentElementId(id);
  };
  
  if (!story) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }
  
  // Use position that centers both components in the popup window
  const previewPosition = {
    x: window.innerWidth / 2 - 400,
    y: 40
  };
  
  const editorPosition = {
    x: window.innerWidth / 2 + 40,
    y: 40
  };
  
  // Provide all required properties for StoryContext
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
  
  return (
    <StoryContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background p-8">
        {type === 'preview' && selectedSceneId && (
          <FloatingMobilePreview
            selectedSceneId={selectedSceneId}
            setSelectedSceneId={setSelectedSceneId}
            isOpen={true}
            onToggle={() => {}}
          />
        )}
        
        {type === 'editor' && selectedSceneId && (
          <FloatingElementEditor
            sceneId={selectedSceneId}
            currentElementId={currentElementId}
            position={editorPosition}
            onClose={() => setCurrentElementId(null)}
            isOpen={true}
            showSceneProperties={currentElementId === null}
          />
        )}
      </div>
    </StoryContext.Provider>
  );
};

export default Popup;
