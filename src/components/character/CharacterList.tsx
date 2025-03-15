
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
import { Button } from "../ui/button";
import { Edit, Trash2, User } from "lucide-react";

interface CharacterListProps {
  characters: Character[];
  onEdit: (character: Character) => void;
  onDelete: (characterId: string) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>名称</TableHead>
            <TableHead>角色</TableHead>
            <TableHead>性别</TableHead>
            <TableHead className="hidden md:table-cell">简介</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center h-32 text-muted-foreground"
              >
                未找到角色。添加您的第一个角色以开始。
              </TableCell>
            </TableRow>
          ) : (
            characters.map((character) => (
              <TableRow key={character.id}>
                <TableCell>
                  {character.profilePicture ? (
                    <img
                      src={character.profilePicture}
                      alt={character.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
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
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[300px]">
                  {character.bio}
                </TableCell>
                <TableCell className="text-right">
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CharacterList;
