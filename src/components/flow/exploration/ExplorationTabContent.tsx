
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wand2 } from "lucide-react";
import { ExplorationItem } from "@/utils/types";
import ExplorationItemForm from "./ExplorationItemForm";
import ExplorationItemsList from "./ExplorationItemsList";

interface ExplorationTabContentProps {
  type: "item" | "knowledge";
  items: ExplorationItem[];
  isEditing: boolean;
  editingItem: ExplorationItem | null;
  editName: string;
  editDescription: string;
  editIsCollectible: boolean;
  onAddNew: () => void;
  onEditItem: (item: ExplorationItem) => void;
  onDeleteItem: (id: string) => void;
  onCancel: () => void;
  onSave: () => void;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCollectibleChange: (value: boolean) => void;
}

const ExplorationTabContent: React.FC<ExplorationTabContentProps> = ({
  type,
  items,
  isEditing,
  editingItem,
  editName,
  editDescription,
  editIsCollectible,
  onAddNew,
  onEditItem,
  onDeleteItem,
  onCancel,
  onSave,
  onNameChange,
  onDescriptionChange,
  onCollectibleChange
}) => {
  return (
    <div className="space-y-4 mt-2">
      {!isEditing && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onAddNew}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          添加{type === "item" ? "物品" : "知识"}
        </Button>
      )}

      {isEditing && (
        <ExplorationItemForm
          type={type}
          editingItem={editingItem}
          name={editName}
          description={editDescription}
          isCollectible={editIsCollectible}
          onNameChange={onNameChange}
          onDescriptionChange={onDescriptionChange}
          onCollectibleChange={onCollectibleChange}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}

      {!isEditing && (
        <ExplorationItemsList
          items={items}
          isEditing={isEditing}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
        />
      )}
    </div>
  );
};

export default ExplorationTabContent;
