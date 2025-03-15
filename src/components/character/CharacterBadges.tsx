
import React from "react";
import { Badge } from "../ui/badge";

interface CharacterBadgesProps {
  role: "protagonist" | "supporting";
  gender: "male" | "female" | "other";
}

const CharacterBadges: React.FC<CharacterBadgesProps> = ({ role, gender }) => {
  // Get role and gender display text
  const roleText = role === "protagonist" ? "主角" : "配角";
  const genderText = 
    gender === "male" ? "男性" :
    gender === "female" ? "女性" : "其他";
    
  // Get badge colors based on character role
  const roleBadgeVariant = role === "protagonist" ? "default" : "secondary";
  
  return (
    <div className="flex gap-2 mb-2">
      <Badge variant={roleBadgeVariant}>{roleText}</Badge>
      <Badge variant="outline">{genderText}</Badge>
    </div>
  );
};

export default CharacterBadges;
