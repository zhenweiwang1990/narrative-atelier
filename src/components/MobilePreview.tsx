import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStory } from "./Layout";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PreviewElement from "./preview/PreviewElement";
import SceneEnding from "./preview/SceneEnding";
import { usePreviewState } from "./preview/usePreviewState";
import ValuesDisplay from "./preview/ValuesDisplay";
import { AspectRatio } from "./ui/aspect-ratio";

interface MobilePreviewProps {
  sceneId: string;
  onSceneChange: (sceneId: string) => void;
  onElementSelect?: (elementId: string | null) => void; // Updated to accept null
}

const MobilePreview = ({ 
  sceneId, 
  onSceneChange, 
  onElementSelect 
}: MobilePreviewProps) => {
  const { story } = useStory();
  const [currentElementId, setCurrentElementId] = useState<string | null>(null);

  if (!story) return null;

  const {
    scene,
    location,
    currentElement,
    currentElementIndex,
    isSceneEnding,
    handleNext,
    handlePrevious,
    handleChoiceSelect,
    handleRevival,
    getCharacter,
    globalValues,
    lastElementShown,
    setCurrentElementIndex,
    sortedElements
  } = usePreviewState(sceneId, story, onSceneChange);

  useEffect(() => {
    setCurrentElementId(currentElement?.id || null);
    if (onElementSelect) {
      onElementSelect(currentElement?.id || null);
    }
  }, [currentElement, onElementSelect]);

  useEffect(() => {
    if (!currentElement && onElementSelect) {
      onElementSelect(null); // Signal to show scene properties
    }
  }, [sceneId, currentElement, onElementSelect]);

  useEffect(() => {
    const handlePreviewElement = (event: CustomEvent) => {
      if (event.detail && event.detail.elementId && event.detail.sceneId === sceneId) {
        const elementIndex = sortedElements.findIndex(el => el.id === event.detail.elementId);
        if (elementIndex !== -1) {
          setCurrentElementIndex(elementIndex);
        }
      }
    };

    window.addEventListener('previewElement', handlePreviewElement as EventListener);
    
    return () => {
      window.removeEventListener('previewElement', handlePreviewElement as EventListener);
    };
  }, [sceneId, sortedElements, setCurrentElementIndex]);

  if (!scene) return null;

  const locationBackground = location?.background || "/placeholder.svg";

  const showUnlockPrice = scene.unlockPrice !== undefined && scene.unlockPrice > 0;
  
  const totalElements = sortedElements.length;
  const currentProgress = currentElementIndex + 1;
  const progressPercentage = totalElements > 0 ? Math.round((currentProgress / totalElements) * 100) : 0;

  return (
    <Card className="MobilePreview-container w-full h-full border overflow-hidden flex flex-col bg-white dark:bg-card">
      <div className="relative w-full flex-1 overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ 
            backgroundImage: `url(${locationBackground})`,
            opacity: 0.5,
            height: 'calc(100% - 60px)',
            zIndex: 0
          }}
        />
        
        <div className="relative flex flex-col h-full z-10">
          <div className="flex-1 overflow-auto p-4">
            {showUnlockPrice && (
              <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 p-2 rounded-md mb-3 flex items-center justify-between">
                <span className="text-xs">需要解锁此场景</span>
                <div className="flex items-center">
                  <span className="text-xs font-medium mr-1">{scene.unlockPrice}</span>
                  <span className="text-xs">钻石</span>
                </div>
              </div>
            )}

            {!currentElement && location && (
              <div className="text-center mb-4 bg-background/90 p-2 rounded-md">
                <p className="text-sm text-foreground">
                  地点: {location.name || "未知"}
                </p>
              </div>
            )}
            
            <div className="bg-background/90 rounded-md p-3">
              <PreviewElement
                currentElement={currentElement}
                handleNext={handleNext}
                handleChoiceSelect={handleChoiceSelect}
                getCharacter={getCharacter}
                globalValues={globalValues}
              />
              <SceneEnding 
                scene={scene} 
                handleRevival={handleRevival} 
                lastElementShown={lastElementShown}
              />
            </div>
            
            {story.globalValues && story.globalValues.length > 0 && (
              <div className="absolute bottom-16 left-0 right-0 px-4">
                <div className="bg-background/80 backdrop-blur-sm border border-border/30 rounded-md p-2 shadow-md">
                  <ValuesDisplay values={globalValues} compact={true} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-background/90 flex items-center gap-2 z-20">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={handlePrevious}
              disabled={currentElementIndex <= 0}
              title="上一步"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> 上一步
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="flex-1 h-9 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              onClick={handleNext}
              disabled={
                (lastElementShown &&
                  scene.type === "bad-ending" &&
                  !!scene.revivalPointId)
              }
            >
              下一步 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MobilePreview;
