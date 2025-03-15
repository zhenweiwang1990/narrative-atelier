
import { Scene } from "@/utils/types";

export const checkSceneCompletion = (scene: Scene): boolean => {
  const isEndingType =
    scene.type === "ending" || scene.type === "bad-ending";
  
  const hasNextSceneConnection = 
    scene.nextSceneId || 
    isEndingType ||
    scene.elements.some(element => {
      if (element.type === "choice") {
        return element.options.some(option => option.nextSceneId);
      }
      if (element.type === "qte") {
        return element.successSceneId || element.failureSceneId;
      }
      if (element.type === "dialogueTask") {
        return element.successSceneId || element.failureSceneId;
      }
      return false;
    });
  
  return scene.type === "normal" && !hasNextSceneConnection;
};

export const isEndingType = (scene: Scene): boolean => {
  return scene.type === "ending" || scene.type === "bad-ending";
};
