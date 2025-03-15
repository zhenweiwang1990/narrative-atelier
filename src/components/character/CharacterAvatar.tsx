
import React from 'react';
import { User } from "lucide-react";

interface CharacterAvatarProps {
  profilePicture: string | undefined;
  name: string;
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ profilePicture, name }) => {
  if (profilePicture) {
    return (
      <img
        src={profilePicture}
        alt={name}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }
  
  return (
    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
      <User className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default CharacterAvatar;
