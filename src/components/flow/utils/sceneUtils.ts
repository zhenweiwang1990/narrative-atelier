
import { Scene } from "@/utils/types";

export const checkSceneCompletion = (scene: Scene): boolean => {
  const isEndingType =
    scene.type === "ending" || scene.type === "bad-ending";
  
  // If there's a direct next scene connection or it's an ending type, it's considered complete
  if (scene.nextSceneId || isEndingType) {
    return false;
  }
  
  // If there are no elements, consider it incomplete
  if (scene.elements.length === 0) {
    return true;
  }
  
  // Get the last element in the scene to check if it has branching logic
  const lastElement = scene.elements[scene.elements.length - 1];
  
  // Check if the last element is a branching element (choice, QTE, dialogue task)
  if (lastElement) {
    if (lastElement.type === "choice") {
      // For choice elements, check if all options have nextSceneId
      const allOptionsHaveNextScene = lastElement.options.length > 0 && 
        lastElement.options.every(option => option.nextSceneId);
      
      // If all options have next scenes defined, the scene is complete
      if (allOptionsHaveNextScene) {
        return false;
      }
    } else if (lastElement.type === "qte") {
      // For QTE elements, check if both success and failure outcomes have sceneId
      const qteElement = lastElement as any; // Type assertion for TypeScript
      const successHasScene = qteElement.success?.sceneId;
      const failureHasScene = qteElement.failure?.sceneId;
      
      // If both outcomes have next scenes defined, the scene is complete
      if (successHasScene && failureHasScene) {
        return false;
      }
    } else if (lastElement.type === "dialogueTask") {
      // For dialogue task elements, check if both success and failure outcomes have sceneId
      const dialogueElement = lastElement as any; // Type assertion for TypeScript
      const successHasScene = dialogueElement.success?.sceneId;
      const failureHasScene = dialogueElement.failure?.sceneId;
      
      // If both outcomes have next scenes defined, the scene is complete
      if (successHasScene && failureHasScene) {
        return false;
      }
    }
  }
  
  // Check if any element has a connection to a next scene
  const hasElementWithNextScene = scene.elements.some(element => {
    if (element.type === "choice") {
      return element.options.some(option => option.nextSceneId);
    }
    if (element.type === "qte") {
      return (element as any).success?.sceneId || (element as any).failure?.sceneId;
    }
    if (element.type === "dialogueTask") {
      return (element as any).success?.sceneId || (element as any).failure?.sceneId;
    }
    return false;
  });
  
  // The scene is incomplete only if it's a normal type, has no next scene,
  // and doesn't have properly defined branching elements
  return scene.type === "normal" && !hasElementWithNextScene;
};

export const isEndingType = (scene: Scene): boolean => {
  return scene.type === "ending" || scene.type === "bad-ending";
};
