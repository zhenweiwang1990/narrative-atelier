
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import MobilePreview from "@/components/MobilePreview";
import FloatingElementEditor from "./FloatingElementEditor";
import { useStory } from "@/components/Layout";
import { useElementManagement } from "@/hooks/useElementManagement";
import { cn } from "@/lib/utils";
import { useDraggable } from "./hooks/useDraggable";
import { useElementSelection } from "./hooks/useElementSelection";
import FloatingPreviewHeader from "./preview/FloatingPreviewHeader";

interface FloatingMobilePreviewProps {
  selectedSceneId: string | null;
  setSelectedSceneId: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Create a custom event for scene selection that works across windows
const broadcastSceneSelection = (sceneId: string) => {
  const event = new CustomEvent('sceneSelected', { detail: { sceneId } });
  window.dispatchEvent(event);
  
  // If this is a popup window, also try to send to the opener
  if (window.opener && !window.opener.closed) {
    try {
      window.opener.dispatchEvent(new CustomEvent('sceneSelected', { detail: { sceneId } }));
    } catch (e) {
      console.error('Failed to send event to opener:', e);
    }
  }
};

const FloatingMobilePreview = ({
  selectedSceneId,
  setSelectedSceneId,
  isOpen,
  onToggle,
}: FloatingMobilePreviewProps) => {
  const [minimized, setMinimized] = useState(false);
  const { story } = useStory();
  const { currentElementId, setCurrentElementId } = useElementSelection(selectedSceneId);
  
  const { validateTimeLimit, validateKeySequence } = useElementManagement(
    selectedSceneId || "", 
    story, 
    null
  );

  // Use draggable hook for preview window
  const { position, isDragging, elementRef, handleMouseDown } = useDraggable({
    x: window.innerWidth - 700,
    y: 80,
  });

  // Calculate editor position relative to preview position
  const editorPosition = {
    x: position.x + 352, // Width of the preview
    y: position.y,
  };

  const handleElementSelect = (elementId: string | null) => {
    setCurrentElementId(elementId);
  };

  const selectedScene = selectedSceneId ? story?.scenes.find(s => s.id === selectedSceneId) : null;
  const sceneTitle = selectedScene?.title;

  // Listen for scene selection events from other windows
  useEffect(() => {
    const handleSceneSelected = (e: CustomEvent) => {
      if (e.detail && e.detail.sceneId) {
        setSelectedSceneId(e.detail.sceneId);
      }
    };
    
    window.addEventListener('sceneSelected', handleSceneSelected as EventListener);
    
    return () => {
      window.removeEventListener('sceneSelected', handleSceneSelected as EventListener);
    };
  }, [setSelectedSceneId]);

  // Intercept setSelectedSceneId to broadcast the event
  const handleSceneChange = (sceneId: string) => {
    setSelectedSceneId(sceneId);
    broadcastSceneSelection(sceneId);
  };

  // Handler for pop-out functionality
  const handlePopOut = () => {
    const url = new URL('/popup', window.location.origin);
    url.searchParams.append('type', 'preview');
    if (selectedSceneId) {
      url.searchParams.append('sceneId', selectedSceneId);
    }
    
    // Open the popup window
    const popup = window.open(
      url.toString(),
      'PreviewPopup',
      'width=950,height=700,toolbar=0,location=0,menubar=0'
    );
    
    // Transfer current story data to popup
    if (popup) {
      popup.addEventListener('load', () => {
        popup.postMessage({
          type: 'storyData',
          story: story,
          currentElementId: currentElementId
        }, window.location.origin);
      });
    }
  };

  if (!isOpen) return null;

  const previewHeight = minimized ? "40px" : "625px";
  const previewWidth = minimized ? "64px" : "352px";

  return (
    <>
      <Card
        ref={elementRef}
        className={cn(
          "fixed shadow-lg border rounded-md overflow-hidden z-40",
          minimized ? "w-16 h-10" : ""
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          height: previewHeight,
          width: previewWidth,
          transition: isDragging ? "none" : "height 0.3s ease, width 0.3s ease",
        }}
      >
        <FloatingPreviewHeader
          title="手机预览"
          sceneTitle={sceneTitle}
          minimized={minimized}
          onToggleMinimize={() => setMinimized(!minimized)}
          onClose={onToggle}
          onMouseDown={handleMouseDown}
          onPopOut={handlePopOut}
        />

        {!minimized && (
          <div className="h-[calc(100%-35px)] overflow-hidden">
            {selectedSceneId ? (
              <MobilePreview
                sceneId={selectedSceneId}
                onSceneChange={handleSceneChange}
                onElementSelect={handleElementSelect}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  选择一个场景来预览
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      {selectedSceneId && (
        <FloatingElementEditor
          sceneId={selectedSceneId}
          currentElementId={currentElementId}
          position={editorPosition}
          onClose={() => setCurrentElementId(null)}
          isOpen={true}
          validateTimeLimit={validateTimeLimit}
          validateKeySequence={validateKeySequence}
          showSceneProperties={currentElementId === null}
        />
      )}
    </>
  );
};

export default FloatingMobilePreview;
