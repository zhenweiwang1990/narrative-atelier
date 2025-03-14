
import React, { useState } from "react";
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

  // Original position for the preview window
  const { position, isDragging, elementRef, handleMouseDown } = useDraggable({
    x: window.innerWidth - 700,
    y: 80,
  });

  // Handle element selection from MobilePreview
  const handleElementSelect = (elementId: string | null) => {
    setCurrentElementId(elementId);
  };

  // Get the current scene title
  const selectedScene = selectedSceneId ? story?.scenes.find(s => s.id === selectedSceneId) : null;
  const sceneTitle = selectedScene?.title;

  if (!isOpen) return null;

  // Using aspect ratio of 9:16 for mobile preview
  const previewHeight = minimized ? "40px" : "625px";
  const previewWidth = minimized ? "64px" : "352px"; // 9:16 ratio means width should be 9/16 * height

  return (
    <>
      <Card
        ref={elementRef}
        className={cn(
          "fixed shadow-lg border rounded-md overflow-hidden z-50",
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
        />

        {!minimized && (
          <div className="h-[calc(100%-35px)] overflow-hidden">
            {selectedSceneId ? (
              <MobilePreview
                sceneId={selectedSceneId}
                onSceneChange={setSelectedSceneId}
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
          position={position}
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
