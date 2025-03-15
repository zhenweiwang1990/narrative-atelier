
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Character } from "@/utils/types";

interface CharacterRowActionsProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (characterId: string) => void;
}

const CharacterRowActions: React.FC<CharacterRowActionsProps> = ({
  character,
  onEdit,
  onDelete
}) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(character)}
        className="h-8 w-8"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(character.id)}
        className="h-8 w-8 text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );
};

export default CharacterRowActions;
