
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink, Play, Pause } from "lucide-react";
import { useMusic } from "@/hooks/useMusic";
import { Link } from "react-router-dom";

interface BackgroundMusicSelectorProps {
  backgroundMusic?: {
    id: string;
    name: string;
    url: string;
  };
  updateBackgroundMusic: (music: { id: string; name: string; url: string }) => void;
}

const BackgroundMusicSelector: React.FC<BackgroundMusicSelectorProps> = ({
  backgroundMusic,
  updateBackgroundMusic,
}) => {
  const { music, isLoading } = useMusic();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleMusicChange = (musicId: string) => {
    if (musicId === "none") {
      // Set to no music
      updateBackgroundMusic({ id: "", name: "", url: "" });
      return;
    }
    
    const selectedMusic = music.find((m) => m.id === musicId);
    if (selectedMusic) {
      updateBackgroundMusic({
        id: selectedMusic.id,
        name: selectedMusic.name,
        url: selectedMusic.url,
      });
    }

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!backgroundMusic?.url) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(backgroundMusic.url);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="backgroundMusic">背景音乐</Label>
        {backgroundMusic?.url && (
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-8 w-8"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Select
          value={backgroundMusic?.id || "none"}
          onValueChange={handleMusicChange}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择背景音乐" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">无背景音乐</SelectItem>
            {music.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex justify-between text-xs pt-1">
          <span className="text-muted-foreground">
            <Music className="h-3 w-3 inline mr-1" />
            背景音乐可增强场景沉浸感
          </span>
          <Link 
            to="/music" 
            className="text-primary hover:underline"
          >
            管理音乐
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusicSelector;
