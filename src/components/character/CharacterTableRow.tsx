
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Character } from "@/utils/types";
import CharacterAvatar from './CharacterAvatar';
import CharacterVoiceDisplay from './CharacterVoiceDisplay';
import CharacterImageControls from './CharacterImageControls';
import CharacterRowActions from './CharacterRowActions';

interface CharacterTableRowProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (characterId: string) => void;
  onImageChange: (character: Character, type: 'profilePicture' | 'fullBody') => void;
}

const CharacterTableRow: React.FC<CharacterTableRowProps> = ({
  character,
  onEdit,
  onDelete,
  onImageChange
}) => {
  return (
    <TableRow key={character.id}>
      <TableCell>
        <CharacterAvatar 
          profilePicture={character.profilePicture} 
          name={character.name} 
        />
      </TableCell>
      <TableCell className="font-medium">
        {character.name}
      </TableCell>
      <TableCell className="capitalize">
        {character.role === "protagonist" ? "主角" : "配角"}
      </TableCell>
      <TableCell className="capitalize">
        {character.gender === "male"
          ? "男"
          : character.gender === "female"
          ? "女"
          : "其他"}
      </TableCell>
      <TableCell>
        <CharacterVoiceDisplay voiceId={character.voice} />
      </TableCell>
      <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[200px]">
        {character.bio}
      </TableCell>
      <TableCell>
        <CharacterImageControls 
          character={character} 
          type="profilePicture" 
          onImageChange={onImageChange} 
        />
      </TableCell>
      <TableCell>
        <CharacterImageControls 
          character={character} 
          type="fullBody" 
          onImageChange={onImageChange} 
        />
      </TableCell>
      <TableCell className="text-right">
        <CharacterRowActions 
          character={character} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      </TableCell>
    </TableRow>
  );
};

export default CharacterTableRow;
