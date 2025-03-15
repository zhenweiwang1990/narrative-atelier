
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";
import { VOICE_SAMPLES } from "@/hooks/character/useCharacterForm";

interface VoiceSelectorProps {
  selectedVoice: string;
  gender: string;
  currentPlayingVoice: string | null;
  onSelectChange: (name: string, value: string) => void;
  onPlayVoiceSample: (voiceId: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoice,
  gender,
  currentPlayingVoice,
  onSelectChange,
  onPlayVoiceSample,
}) => {
  // 基于角色性别筛选音色
  const filteredVoices = gender
    ? VOICE_SAMPLES.filter(voice => voice.gender === gender || voice.gender === 'other')
    : VOICE_SAMPLES;

  return (
    <div className="space-y-2">
      <Label htmlFor="voice">音色</Label>
      <Select
        value={selectedVoice || "none"}
        onValueChange={(value) => onSelectChange("voice", value === "none" ? "" : value)}
      >
        <SelectTrigger id="voice">
          <SelectValue placeholder="选择角色音色" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">默认音色</SelectItem>
          {filteredVoices.map(voice => (
            <SelectItem key={voice.id} value={voice.id}>
              <div className="flex items-center justify-between w-full">
                <span>{voice.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onPlayVoiceSample(voice.id);
                  }}
                >
                  {currentPlayingVoice === voice.id ? (
                    <Square className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VoiceSelector;
