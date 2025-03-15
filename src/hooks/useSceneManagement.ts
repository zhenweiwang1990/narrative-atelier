import { useState } from "react";
import { useStory } from "@/contexts/StoryContext";
import { Scene, SceneType } from "@/utils/types";
import { generateId } from "@/utils/storage";

export const useSceneManagement = (
  story: any,
  setStory: any,
  nodes: any,
  setNodes: any,
  setEdges: any,
  selectedNode: any,
  setSelectedNode: any,
  onSceneSelect: any
) => {
  const addScene = (type: SceneType = "normal") => {
    if (!story || !setStory) return;

    const newScene: Scene = {
      id: generateId("scene"),
      title: "新分支",
      type: type,
      locationId: story.locations[0]?.id || null,
      elements: [],
      nextSceneId: null,
      revivalPointId: null,
      position: { x: 0, y: 0 },
    };

    setStory({
      ...story,
      scenes: [...story.scenes, newScene],
    });

    const newNode = {
      id: newScene.id,
      data: {
        label: newScene.title,
        sceneType: newScene.type,
        hasNextScene: !!newScene.nextSceneId,
      },
      position: { x: 0, y: 0 },
      type: "sceneNode",
    };

    setNodes((prevNodes: any) => [...prevNodes, newNode]);
  };

  const deleteSelectedScene = () => {
    if (!story || !setStory || !selectedNode) return;

    const sceneIdToDelete = selectedNode.id;

    // 检查是否有其他场景指向要删除的场景
    const updatedScenes = story.scenes.map((scene: Scene) => {
      if (scene.nextSceneId === sceneIdToDelete) {
        return { ...scene, nextSceneId: null };
      }
      return scene;
    });

    setStory({
      ...story,
      scenes: updatedScenes.filter((scene: Scene) => scene.id !== sceneIdToDelete),
    });

    setNodes((prevNodes: any) =>
      prevNodes.filter((node: any) => node.id !== sceneIdToDelete)
    );
    setEdges((prevEdges: any) =>
      prevEdges.filter(
        (edge: any) =>
          edge.source !== sceneIdToDelete && edge.target !== sceneIdToDelete
      )
    );
    setSelectedNode(null);
    onSceneSelect(null);
  };

  return { addScene, deleteSelectedScene };
};
