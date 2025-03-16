
import { useState } from "react";

export const useAudioPreview = () => {
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPreview = (url: string) => {
    // Stop any currently playing preview
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
      setIsPlaying(false);
    }

    // Create and play a new audio
    const audio = new Audio(url);
    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.play();
    setPreviewAudio(audio);
    setIsPlaying(true);
  };

  return {
    isPlaying,
    playPreview
  };
};

export default useAudioPreview;
