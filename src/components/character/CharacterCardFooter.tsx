
import React from "react";
import { Button } from "../ui/button";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface CharacterCardFooterProps {
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onConfirmEdit?: () => void;
  onCancelEdit?: () => void;
}

const CharacterCardFooter: React.FC<CharacterCardFooterProps> = ({
  isEditing,
  onEdit,
  onDelete,
  onConfirmEdit,
  onCancelEdit
}) => {
  return (
    <div className="p-3 pt-0 flex justify-between">
      {isEditing ? (
        <>
          <Button variant="outline" size="sm" onClick={onCancelEdit}>
            <X className="h-4 w-4 mr-1" /> 取消
          </Button>
          <Button size="sm" onClick={onConfirmEdit}>
            <Check className="h-4 w-4 mr-1" /> 确定
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default CharacterCardFooter;
