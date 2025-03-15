
import React from 'react';
import { Volume2 } from "lucide-react";
import { VOICE_SAMPLES } from "@/hooks/character/voiceSamples";

interface CharacterVoiceDisplayProps {
  voiceId: string | undefined;
}

const CharacterVoiceDisplay: React.FC<CharacterVoiceDisplayProps> = ({ voiceId }) => {
  // Helper function to get voice name
  const getVoiceName = (voiceId: string | undefined) => {
    if (!voiceId) return "默认";
    const voice = VOICE_SAMPLES.find(v => v.id === voiceId);
    return voice ? voice.name : "未知";
  };
  
  if (voiceId) {
    return (
      <div className="flex items-center">
        <Volume2 className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
        <span>{getVoiceName(voiceId)}</span>
      </div>
    );
  }
  
  return <span className="text-muted-foreground">默认</span>;
};

export default CharacterVoiceDisplay;
