
import React from "react";
import FloatingEditorWrapper from "@/components/flow/editor/FloatingEditorWrapper";
import EditorPanel from "@/components/flow/EditorPanel";
import { Story, Scene, SceneType } from "@/utils/types";

interface FloatingEditorContainerProps {
  isEditorOpen: boolean;
  selectedSceneId: string | null;
  selectedScene: Scene | undefined;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  story: Story;
  selectedElementId: string;
  setSelectedElementId: (id: string) => void;
  handleUpdateSceneTitle: (title: string) => void;
  handleUpdateSceneType: (type: SceneType) => void;
  handleUpdateSceneLocation: (locationId: string) => void;
  handleUpdateNextScene: (nextSceneId: string) => void;
  handleUpdateRevivalPoint: (revivalPointId: string) => void;
  handleUpdateSceneEntrance: (effect: string) => void;
  handleUpdateSceneEnvironment: (effect: string) => void;
  handleUpdateEndingName: (name: string) => void;
  handleUpdateEndingPoster: (url: string) => void;
  handleUpdateBackgroundMusic: (music: { id: string; name: string; url: string }) => void;
  handleUpdateSceneUnlockPrice: (price: number | undefined) => void;
}

const FloatingEditorContainer: React.FC<FloatingEditorContainerProps> = ({
  isEditorOpen,
  selectedSceneId,
  selectedScene,
  activeTab,
  setActiveTab,
  story,
  selectedElementId,
  setSelectedElementId,
  handleUpdateSceneTitle,
  handleUpdateSceneType,
  handleUpdateSceneLocation,
  handleUpdateNextScene,
  handleUpdateRevivalPoint,
  handleUpdateSceneEntrance,
  handleUpdateSceneEnvironment,
  handleUpdateEndingName,
  handleUpdateEndingPoster,
  handleUpdateBackgroundMusic,
  handleUpdateSceneUnlockPrice
}) => {
  if (!selectedSceneId) return null;
  
  return (
    <FloatingEditorWrapper
      isOpen={isEditorOpen && !!selectedSceneId}
      position={{ x: 0, y: 0 }}
      isPopup={true}
    >
      <EditorPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSceneId={selectedSceneId}
        selectedScene={selectedScene}
        story={story}
        updateSceneTitle={handleUpdateSceneTitle}
        updateSceneType={handleUpdateSceneType}
        updateSceneLocation={handleUpdateSceneLocation}
        updateNextScene={handleUpdateNextScene}
        updateRevivalPoint={handleUpdateRevivalPoint}
        selectedElementId={selectedElementId}
        setSelectedElementId={setSelectedElementId}
        updateSceneEntrance={handleUpdateSceneEntrance}
        updateSceneEnvironment={handleUpdateSceneEnvironment}
        updateEndingName={handleUpdateEndingName}
        updateEndingPoster={handleUpdateEndingPoster}
        updateBackgroundMusic={handleUpdateBackgroundMusic}
        updateSceneUnlockPrice={handleUpdateSceneUnlockPrice}
      />
    </FloatingEditorWrapper>
  );
};

export default FloatingEditorContainer;
