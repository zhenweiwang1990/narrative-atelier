
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExplorationItem } from "@/utils/types";
import ExplorationItemCard from "./ExplorationItemCard";

interface ExplorationItemsListProps {
  items: ExplorationItem[];
  isEditing: boolean;
  onEditItem: (item: ExplorationItem) => void;
  onDeleteItem: (id: string) => void;
}

const ExplorationItemsList: React.FC<ExplorationItemsListProps> = ({
  items,
  isEditing,
  onEditItem,
  onDeleteItem
}) => {
  if (items.length === 0 && !isEditing) {
    return (
      <Alert>
        <AlertDescription>
          此场景暂无可探索{items[0]?.type === "item" ? "物品" : "知识"}，点击上方按钮添加{items[0]?.type === "item" ? "物品" : "知识"}，或使用AI自动生成。
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <ExplorationItemCard 
          key={item.id}
          item={item}
          onEdit={onEditItem}
          onDelete={onDeleteItem}
        />
      ))}
    </div>
  );
};

export default ExplorationItemsList;
