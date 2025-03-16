
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SoundEffectCategory } from "@/utils/soundEffects";

interface CategoryListProps {
  categories: SoundEffectCategory[];
  onSelectCategory: (category: SoundEffectCategory) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelectCategory
}) => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="grid grid-cols-1 gap-1 p-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="justify-start h-auto py-2"
            onClick={() => onSelectCategory(category)}
          >
            <div className="text-left">
              <div className="font-medium">{category.name}</div>
              <div className="text-xs text-muted-foreground">
                {category.subcategories.length} 个子分类
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategoryList;
