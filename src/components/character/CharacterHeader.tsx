
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface CharacterHeaderProps {
  onAddCharacter: () => void;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({
  onAddCharacter,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">角色</h1>
        <p className="text-sm text-muted-foreground">
          管理您剧情中的角色及其属性。
        </p>
      </div>

      <Button size="sm" onClick={onAddCharacter}>
        <Plus className="h-4 w-4 mr-2" /> 添加角色
      </Button>
    </div>
  );
};

export default CharacterHeader;
