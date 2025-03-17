
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wand2 } from "lucide-react";
import { ExplorationItem } from "@/utils/types";
import ExplorationItemForm from "./ExplorationItemForm";
import ExplorationItemsList from "./ExplorationItemsList";
import ImageSelectorDialog from "@/components/ai-story/ImageSelectorDialog";

interface ExplorationTabContentProps {
  type: "item" | "knowledge";
  items: ExplorationItem[];
  isEditing: boolean;
  editingItem: ExplorationItem | null;
  editName: string;
  editDescription: string;
  editIsCollectible: boolean;
  editImage?: string;
  isImageSelectorOpen: boolean;
  onAddNew: () => void;
  onEditItem: (item: ExplorationItem) => void;
  onDeleteItem: (id: string) => void;
  onCancel: () => void;
  onSave: () => void;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCollectibleChange: (value: boolean) => void;
  onOpenImageSelector: () => void;
  onCloseImageSelector: () => void;
  onImageSelected: (imageUrl: string) => void;
}

const ExplorationTabContent: React.FC<ExplorationTabContentProps> = ({
  type,
  items,
  isEditing,
  editingItem,
  editName,
  editDescription,
  editIsCollectible,
  editImage,
  isImageSelectorOpen,
  onAddNew,
  onEditItem,
  onDeleteItem,
  onCancel,
  onSave,
  onNameChange,
  onDescriptionChange,
  onCollectibleChange,
  onOpenImageSelector,
  onCloseImageSelector,
  onImageSelected
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
          itemImage={editImage}
          onNameChange={onNameChange}
          onDescriptionChange={onDescriptionChange}
          onCollectibleChange={onCollectibleChange}
          onOpenImageSelector={onOpenImageSelector}
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

      <ImageSelectorDialog
        open={isImageSelectorOpen}
        onOpenChange={onCloseImageSelector}
        onImageSelected={onImageSelected}
        aspectRatio={1}
        title="选择物品图片"
      />
    </div>
  );
};

export default ExplorationTabContent;
