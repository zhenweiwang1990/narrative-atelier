
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogueTaskElement } from '@/utils/types';
import { useStory } from '@/components/Layout';
import { User } from 'lucide-react';

interface DialogueTaskPreviewProps {
  element: DialogueTaskElement;
  onSuccess: () => void;
  onFailure: () => void;
}

const DialogueTaskPreview: React.FC<DialogueTaskPreviewProps> = ({ 
  element, 
  onSuccess,
  onFailure
}) => {
  const [userInput, setUserInput] = useState('');
  const { story } = useStory();
  
  const targetCharacter = story?.characters.find(c => c.id === element.targetCharacterId);
  if (!targetCharacter) return null;
  
  // Check for profile picture - update from portrait to profilePicture
  const hasProfileImage = !!targetCharacter.profilePicture;
  const profileImageUrl = targetCharacter.profilePicture || "https://via.placeholder.com/200?text=No+Image";
  
  // This is a mock implementation - in a real app, you would have more complex dialogue matching
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock success criteria (any input of 5+ characters)
    if (userInput.trim().length >= 5) {
      onSuccess();
    } else {
      onFailure();
    }
  };
  
  return (
    <Card className="animate-in fade-in-0 duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Avatar className="h-8 w-8 border">
            {hasProfileImage ? (
              <AvatarImage src={profileImageUrl} alt={targetCharacter.name} />
            ) : (
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
          {targetCharacter.name}
        </CardTitle>
        <CardDescription>{element.openingLine || '...'}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm mb-4">{element.goal}</div>
        
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input 
              placeholder="输入你的对话..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">发送</Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        提示：尝试回答NPC的问题或满足他们的请求
      </CardFooter>
    </Card>
  );
};

export default DialogueTaskPreview;
