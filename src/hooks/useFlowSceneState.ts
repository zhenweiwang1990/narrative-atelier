
import { useState, useEffect } from "react";
import { useStory } from "@/components/Layout";
import { SceneType } from "@/utils/types";
import { useSceneManagementHook } from "@/hooks/useSceneManagementHook";

export const useFlowSceneState = () => {
  const { story, setStory } = useStory();
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState<string>("");

  const {
    selectedSceneId,
    setSelectedSceneId,
    activeTab,
    setActiveTab,
    selectedScene,
    handleAddScene,
    handleSceneSelect,
    updateSceneTitle,
    updateSceneType,
    updateSceneLocation,
    updateNextScene,
    updateRevivalPoint,
  } = useSceneManagementHook(story, setStory);

  useEffect(() => {
    if (activeTab === "flow") {
      setActiveTab("properties");
    }
  }, [activeTab, setActiveTab]);

  useEffect(() => {
    setSelectedElementId("");
  }, [selectedSceneId]);

  const handleAddSceneWithType = (type?: SceneType) => {
    handleAddScene(type || "normal");
  };

  const handleUpdateSceneTitle = (newTitle: string) => {
    if (selectedSceneId) {
      updateSceneTitle(selectedSceneId, newTitle);
    }
  };

  const handleUpdateSceneType = (newType: SceneType) => {
    if (selectedSceneId) {
      updateSceneType(selectedSceneId, newType);
    }
  };

  const handleUpdateSceneLocation = (locationId: string) => {
    if (selectedSceneId) {
      updateSceneLocation(selectedSceneId, locationId);
    }
  };

  const handleUpdateNextScene = (nextSceneId: string) => {
    if (selectedSceneId) {
      updateNextScene(selectedSceneId, nextSceneId);
    }
  };

  const handleUpdateRevivalPoint = (revivalPointId: string) => {
    if (selectedSceneId) {
      updateRevivalPoint(selectedSceneId, revivalPointId);
    }
  };

  return {
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
  };
};
