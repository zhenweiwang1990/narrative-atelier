
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Character, DialogueElement } from '@/utils/types';
import { useStory } from '@/components/Layout';
import { User } from 'lucide-react';

interface DialoguePreviewProps {
  element: DialogueElement;
  onNext?: () => void;
}

const DialoguePreview: React.FC<DialoguePreviewProps> = ({ element, onNext }) => {
  const { story } = useStory();
  const character = story?.characters.find(c => c.id === element.characterId);
  
  if (!character) return null;
  
  // Check for profile picture - update from portrait to profilePicture
  const hasProfileImage = !!character.profilePicture;
  const profileImageUrl = character.profilePicture || "https://via.placeholder.com/200?text=No+Image";
  
  return (
    <Card className="animate-in fade-in-0 duration-300 cursor-pointer" onClick={onNext}>
      <CardContent className="pt-6 pb-4 flex items-start gap-3">
        <Avatar className="h-10 w-10 border">
          {hasProfileImage ? (
            <AvatarImage src={profileImageUrl} alt={character.name} />
          ) : (
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1 space-y-1.5">
          <div className="text-sm font-medium">{character.name}</div>
          <div className="text-sm">{element.text}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DialoguePreview;
