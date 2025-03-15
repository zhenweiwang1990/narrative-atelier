
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStory } from "./Layout";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PreviewElement from "./preview/PreviewElement";
import SceneEnding from "./preview/SceneEnding";
import { usePreviewState } from "./preview/usePreviewState";
import ValuesDisplay from "./preview/ValuesDisplay";

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
    lastElementShown
  } = usePreviewState(sceneId, story, onSceneChange);

  // Update currentElementId whenever currentElement changes
  useEffect(() => {
    setCurrentElementId(currentElement?.id || null);
    if (onElementSelect) {
      onElementSelect(currentElement?.id || null);
    }
  }, [currentElement, onElementSelect]);

  // When scene changes, ensure scene properties are shown if no element is selected
  useEffect(() => {
    if (!currentElement && onElementSelect) {
      onElementSelect(null); // Signal to show scene properties
    }
  }, [sceneId, currentElement, onElementSelect]);

  if (!scene) return null;

  const locationBackground = location?.background || "/placeholder.svg";

  return (
    <Card className="w-full h-full border overflow-hidden flex flex-col bg-white">
      <div
        className="h-[45%] bg-cover bg-center border-b"
        style={{ backgroundImage: `url(${locationBackground})` }}
      />

      <div className="flex-1 overflow-auto">
        <div>
          {!currentElement && location && (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                地点: {location.name || "未知"}
              </p>
            </div>
          )}
          <PreviewElement
            currentElement={currentElement}
            handleNext={handleNext}
            handleChoiceSelect={handleChoiceSelect}
            getCharacter={getCharacter}
          />
          <SceneEnding 
            scene={scene} 
            handleRevival={handleRevival} 
            lastElementShown={lastElementShown}
          />
        </div>

        {/* 添加全局变量显示 */}
        {story.globalValues && story.globalValues.length > 0 && (
          <ValuesDisplay values={globalValues} />
        )}
      </div>

      <div className="p-3 border-t flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={handlePrevious}
          disabled={
            currentElementIndex <= 0 ||
            currentElement?.type === "choice" ||
            currentElement?.type === "qte" ||
            currentElement?.type === "dialogueTask"
          }
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> 上一步
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={handleNext}
          disabled={
            currentElement?.type === "choice" ||
            currentElement?.type === "qte" ||
            currentElement?.type === "dialogueTask" ||
            (lastElementShown &&
              scene.type === "bad-ending" &&
              !!scene.revivalPointId)
          }
        >
          下一步 <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default MobilePreview;
