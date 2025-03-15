
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, ExternalLink } from "lucide-react";
import { useMusic } from "@/hooks/useMusic";

interface BackgroundMusicSelectorProps {
  backgroundMusic?: {
    url: string;
    name: string;
    isUploaded: boolean;
  };
  updateBackgroundMusic: (music: { url: string; name: string; isUploaded: boolean }) => void;
}

const BackgroundMusicSelector: React.FC<BackgroundMusicSelectorProps> = ({
  backgroundMusic,
  updateBackgroundMusic
}) => {
  const { musicLibrary } = useMusic();
  
  const handleSelectMusic = (musicId: string) => {
    const selectedMusic = musicLibrary.find(music => music.id === musicId);
    
    if (selectedMusic) {
      updateBackgroundMusic({
        url: selectedMusic.url,
        name: selectedMusic.name,
        isUploaded: selectedMusic.isUploaded
      });
    }
  };

  const handleRemoveMusic = () => {
    updateBackgroundMusic({
      url: "",
      name: "",
      isUploaded: false
    });
  };
  
  // Find the ID of the currently selected music if any
  const selectedMusicId = backgroundMusic?.url 
    ? musicLibrary.find(m => m.url === backgroundMusic.url)?.id 
    : undefined;

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="backgroundMusic">背景音乐</Label>
        {backgroundMusic?.url && (
          <div className="flex items-center space-x-2">
            <audio
              controls
              src={backgroundMusic.url}
              className="h-8 w-40"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(backgroundMusic.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Select value={selectedMusicId} onValueChange={handleSelectMusic}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择背景音乐" />
          </SelectTrigger>
          <SelectContent>
            {musicLibrary.map(music => (
              <SelectItem key={music.id} value={music.id}>
                <div className="flex items-center">
                  <Music className="h-3 w-3 mr-2" />
                  <span>{music.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {backgroundMusic?.url && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full"
            onClick={handleRemoveMusic}
          >
            移除背景音乐
          </Button>
        )}
        
        <div className="text-xs text-muted-foreground mt-1">
          您可以在侧边栏的音乐库中管理和添加更多音乐
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusicSelector;
