
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X, Minimize, Maximize } from "lucide-react";
import MobilePreview from "@/components/MobilePreview";
import FloatingElementEditor from "./FloatingElementEditor";
import { useStory } from "@/components/Layout";
import { useElementManagement } from "@/hooks/useElementManagement";

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
  const [position, setPosition] = useState({
    x: window.innerWidth - 700, // Adjusted for wider combined width
    y: 80,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [minimized, setMinimized] = useState(false);
  const [currentElementId, setCurrentElementId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { story } = useStory();

  const { validateTimeLimit, validateKeySequence } = useElementManagement(
    selectedSceneId || "", 
    story, 
    null
  );

  // Handle mouse down for drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (previewRef.current) {
      setIsDragging(true);
      const rect = previewRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(
          0,
          Math.min(window.innerWidth - 700, e.clientX - dragOffset.x) // Adjusted for wider combined width
        );
        const newY = Math.max(
          0,
          Math.min(window.innerHeight - 100, e.clientY - dragOffset.y)
        );
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 700), // Adjusted for wider combined width
        y: Math.min(prev.y, window.innerHeight - 100),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleElementSelect = (elementId: string | null) => {
    setCurrentElementId(elementId);
  };

  // Reset element selection when scene changes
  useEffect(() => {
    setCurrentElementId(null);
  }, [selectedSceneId]);

  if (!isOpen) return null;

  // Calculate preview height (125% of original)
  const previewHeight = minimized ? "40px" : "625px"; // 500px * 1.25 = 625px

  return (
    <>
      <Card
        ref={previewRef}
        className={cn(
          "fixed shadow-lg border rounded-md overflow-hidden z-50",
          minimized ? "w-64 h-10" : "w-72"
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          height: previewHeight,
          transition: isDragging ? "none" : "height 0.3s ease",
        }}
      >
        <div
          className="px-3 py-2 border-b bg-muted/50 flex items-center cursor-move"
          onMouseDown={handleMouseDown}
        >
          <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
          <h3 className="text-sm font-medium flex-1">手机预览</h3>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setMinimized(!minimized)}
            >
              {minimized ? (
                <Maximize className="h-3 w-3" />
              ) : (
                <Minimize className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onToggle}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {!minimized && (
          <div className="h-[calc(100%-35px)]">
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

// Helper function for className conditionals
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
