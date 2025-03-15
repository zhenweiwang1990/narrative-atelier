
import React from "react";
import { Character } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CharacterTableRow from "./CharacterTableRow";
import EmptyCharacterState from "./EmptyCharacterState";

interface CharacterListProps {
  characters: Character[];
  onEdit: (character: Character) => void;
  onDelete: (characterId: string) => void;
  onImageChange?: (characterId: string, imageUrl: string, type: 'profilePicture' | 'fullBody') => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onEdit,
  onDelete,
  onImageChange
}) => {
  // Function to handle opening the image selector
  const handleOpenImageSelector = (character: Character, type: 'profilePicture' | 'fullBody') => {
    const event = new CustomEvent('openCharacterImageSelector', {
      detail: { 
        characterId: character.id,
        imageType: type
      }
    });
    window.dispatchEvent(event);
  };
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>名称</TableHead>
            <TableHead>角色</TableHead>
            <TableHead>性别</TableHead>
            <TableHead>音色</TableHead>
            <TableHead className="hidden md:table-cell">简介</TableHead>
            <TableHead>形象照</TableHead>
            <TableHead>立绘</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.length === 0 ? (
            <EmptyCharacterState />
          ) : (
            characters.map((character) => (
              <CharacterTableRow
                key={character.id}
                character={character}
                onEdit={onEdit}
                onDelete={onDelete}
                onImageChange={handleOpenImageSelector}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CharacterList;
