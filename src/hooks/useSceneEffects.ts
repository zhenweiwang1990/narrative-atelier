
import { Story } from "@/utils/types";

export const useSceneEffects = (
  selectedSceneId: string | null,
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null
) => {
  const handleUpdateSceneEntrance = (effect: string) => {
    if (!selectedSceneId || !story || !setStory) return;

    const updatedScenes = story.scenes.map((scene) =>
      scene.id === selectedSceneId
        ? { ...scene, entranceEffect: effect }
        : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };

  const handleUpdateSceneEnvironment = (effect: string) => {
    if (!selectedSceneId || !story || !setStory) return;

    const updatedScenes = story.scenes.map((scene) =>
      scene.id === selectedSceneId
        ? { ...scene, environmentEffect: effect }
        : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };

  const handleUpdateEndingName = (name: string) => {
    if (!selectedSceneId || !story || !setStory) return;

    const updatedScenes = story.scenes.map((scene) =>
      scene.id === selectedSceneId ? { ...scene, endingName: name } : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };
  
  const handleUpdateEndingPoster = (url: string) => {
    if (!selectedSceneId || !story || !setStory) return;

    const updatedScenes = story.scenes.map((scene) =>
      scene.id === selectedSceneId ? { ...scene, endingPoster: url } : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };

  const handleUpdateBackgroundMusic = (music: { id: string; name: string; url: string }) => {
    if (!selectedSceneId || !story || !setStory) return;

    const updatedScenes = story.scenes.map((scene) =>
      scene.id === selectedSceneId ? { ...scene, backgroundMusic: music } : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };
  
  const handleUpdateSceneUnlockPrice = (price: number | undefined) => {
    if (!selectedSceneId || !story || !setStory) return;

    const updatedScenes = story.scenes.map((scene) =>
      scene.id === selectedSceneId ? { ...scene, unlockPrice: price } : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };

  return {
    handleUpdateSceneEntrance,
    handleUpdateSceneEnvironment,
    handleUpdateEndingName,
    handleUpdateEndingPoster,
    handleUpdateBackgroundMusic,
    handleUpdateSceneUnlockPrice
  };
};
