
import React from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Character } from "@/types";
import CharacterBadges from "./CharacterBadges";

interface CharacterCardInfoProps {
  character: Character;
}

const CharacterCardInfo: React.FC<CharacterCardInfoProps> = ({
  character
}) => {
  return (
    <>
      <CardHeader className="p-3">
        <CardTitle className="text-base truncate">{character.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 pt-0">
        <CharacterBadges 
          role={character.role} 
          gender={character.gender} 
        />
        <p className="text-sm text-muted-foreground line-clamp-2">{character.bio}</p>
      </CardContent>
    </>
  );
};

export default CharacterCardInfo;
