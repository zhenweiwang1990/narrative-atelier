
import React from "react";
import FlowEmptyAlert from "@/components/flow/FlowEmptyAlert";
import FloatingMobilePreview from "@/components/flow/FloatingMobilePreview";
import FlowContent from "@/components/flow/FlowContent";
import FloatingEditorContainer from "@/components/flow/FloatingEditorContainer";
import { useFlowSceneState } from "@/hooks/useFlowSceneState";
import { useSceneEffects } from "@/hooks/useSceneEffects";

const Flow = () => {
  const {
    story,
    setStory,
    isPreviewOpen,
    setIsPreviewOpen,
    isEditorOpen,
    setIsEditorOpen,
    selectedElementId,
    setSelectedElementId,
    selectedSceneId,
    setSelectedSceneId,
    activeTab,
    setActiveTab,
    selectedScene,
    handleAddSceneWithType,
    handleSceneSelect,
    handleUpdateSceneTitle,
    handleUpdateSceneType,
    handleUpdateSceneLocation,
    handleUpdateNextScene,
    handleUpdateRevivalPoint
  } = useFlowSceneState();

  const {
    handleUpdateSceneEntrance,
    handleUpdateSceneEnvironment,
    handleUpdateEndingName,
    handleUpdateEndingPoster,
    handleUpdateBackgroundMusic,
    handleUpdateSceneUnlockPrice
  } = useSceneEffects(selectedSceneId, story, setStory);

  if (!story) return null;

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-3">
      {story.scenes.length === 0 ? (
        <FlowEmptyAlert />
      ) : (
        <FlowContent 
          onSceneSelect={handleSceneSelect}
          onPreviewToggle={() => setIsPreviewOpen(!isPreviewOpen)}
          onAddSceneWithType={handleAddSceneWithType}
        />
      )}

      {/* Floating Editor Panel */}
      <FloatingEditorContainer 
        isEditorOpen={isEditorOpen}
        selectedSceneId={selectedSceneId}
        selectedScene={selectedScene}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        story={story}
        selectedElementId={selectedElementId}
        setSelectedElementId={setSelectedElementId}
        handleUpdateSceneTitle={handleUpdateSceneTitle}
        handleUpdateSceneType={handleUpdateSceneType}
        handleUpdateSceneLocation={handleUpdateSceneLocation}
        handleUpdateNextScene={handleUpdateNextScene}
        handleUpdateRevivalPoint={handleUpdateRevivalPoint}
        handleUpdateSceneEntrance={handleUpdateSceneEntrance}
        handleUpdateSceneEnvironment={handleUpdateSceneEnvironment}
        handleUpdateEndingName={handleUpdateEndingName}
        handleUpdateEndingPoster={handleUpdateEndingPoster}
        handleUpdateBackgroundMusic={handleUpdateBackgroundMusic}
        handleUpdateSceneUnlockPrice={handleUpdateSceneUnlockPrice}
      />

      <FloatingMobilePreview
        selectedSceneId={selectedSceneId}
        setSelectedSceneId={setSelectedSceneId}
        isOpen={isPreviewOpen}
        onToggle={() => setIsPreviewOpen(!isPreviewOpen)}
      />
    </div>
  );
};

export default Flow;
