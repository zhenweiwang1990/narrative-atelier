
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SoundEffectCategory } from "@/utils/soundEffects";
import { Volume2 } from "lucide-react";

interface EffectsListProps {
  selectedCategory: SoundEffectCategory;
  onBack: () => void;
  onSelectEffect: (categoryName: string, effectName: string, effectUrl: string) => void;
  onPlayPreview: (url: string) => void;
}

const EffectsList: React.FC<EffectsListProps> = ({
  selectedCategory,
  onBack,
  onSelectEffect,
  onPlayPreview
}) => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="p-2">
        <Button
          variant="ghost"
          className="mb-2 text-sm"
          onClick={onBack}
        >
          ← 返回分类
        </Button>

        {selectedCategory.subcategories.map((subcategory) => (
          <div key={subcategory.id} className="mb-4">
            <h4 className="text-sm font-medium mb-2 px-2">
              {subcategory.name}
            </h4>
            <div className="space-y-1">
              {subcategory.effects.map((effect) => (
                <div
                  key={effect.id}
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                  onClick={() => 
                    onSelectEffect(
                      `${selectedCategory.name} > ${subcategory.name}`,
                      effect.name,
                      effect.url
                    )
                  }
                >
                  <span className="text-sm">{effect.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayPreview(effect.url);
                    }}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default EffectsList;
