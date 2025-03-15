
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ExplorationItem } from "@/utils/types";

interface ExplorationItemCardProps {
  item: ExplorationItem;
  onEdit: (item: ExplorationItem) => void;
  onDelete: (id: string) => void;
}

const ExplorationItemCard: React.FC<ExplorationItemCardProps> = ({
  item,
  onEdit,
  onDelete
}) => {
  return (
    <Card key={item.id}>
      <CardHeader className="py-2 px-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center">
            {item.name}
            {item.type === "item" && item.isCollectible && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 dark:bg-blue-900 dark:text-blue-300">
                可收集
              </span>
            )}
          </CardTitle>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-3">
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ExplorationItemCard;
