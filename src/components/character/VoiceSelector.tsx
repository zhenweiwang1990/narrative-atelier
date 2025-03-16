
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Square, Search } from "lucide-react";
import { VOICE_SAMPLES } from "@/hooks/character/voiceSamples";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);
  
  // 基于角色性别筛选音色
  const filteredVoices = gender
    ? VOICE_SAMPLES.filter(voice => voice.gender === gender || voice.gender === 'other')
    : VOICE_SAMPLES;

  const selectedVoiceName = selectedVoice 
    ? filteredVoices.find(voice => voice.id === selectedVoice)?.name || "默认音色"
    : "默认音色";

  return (
    <div className="space-y-2">
      <Label htmlFor="voice">音色</Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedVoiceName}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="搜索音色..." />
            <CommandEmpty>没有找到音色</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="none"
                onSelect={() => {
                  onSelectChange("voice", "");
                  setOpen(false);
                }}
              >
                默认音色
              </CommandItem>
              {filteredVoices.map(voice => (
                <CommandItem
                  key={voice.id}
                  value={voice.id}
                  onSelect={() => {
                    onSelectChange("voice", voice.id);
                    setOpen(false);
                  }}
                >
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
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default VoiceSelector;
