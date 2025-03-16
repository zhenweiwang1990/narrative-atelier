
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SoundEffectCategory, soundEffectsLibrary } from "@/utils/soundEffects";
import { Music } from "lucide-react";
import useAudioPreview from "@/hooks/useAudioPreview";
import SelectedEffect from "./sound/SelectedEffect";
import CategoryList from "./sound/CategoryList";
import EffectsList from "./sound/EffectsList";

interface SoundEffectSelectorProps {
  selectedEffect?: {
    category: string;
    name: string;
    url: string;
  };
  onSelect: (effect: { category: string; name: string; url: string } | undefined) => void;
  disabled?: boolean;
}

const SoundEffectSelector: React.FC<SoundEffectSelectorProps> = ({
  selectedEffect,
  onSelect,
  disabled = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SoundEffectCategory | null>(null);
  const { playPreview } = useAudioPreview();

  const handleCategorySelect = (category: SoundEffectCategory) => {
    setSelectedCategory(category);
  };

  const handleEffectSelect = (categoryName: string, effectName: string, effectUrl: string) => {
    onSelect({
      category: categoryName,
      name: effectName,
      url: effectUrl
    });
  };

  const handleRemoveEffect = () => {
    onSelect(undefined);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>音效</Label>
      </div>

      {selectedEffect ? (
        <SelectedEffect 
          effect={selectedEffect} 
          onPlayPreview={playPreview} 
          onRemove={handleRemoveEffect} 
        />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              disabled={disabled}
            >
              <Music className="mr-2 h-4 w-4" />
              {selectedEffect ? selectedEffect.name : "选择音效"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[300px]" align="start">
            <Tabs defaultValue="categories">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="categories">音效分类</TabsTrigger>
                <TabsTrigger value="effects" disabled={!selectedCategory}>
                  {selectedCategory?.name || "音效列表"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="categories" className="p-0">
                <CategoryList 
                  categories={soundEffectsLibrary} 
                  onSelectCategory={handleCategorySelect} 
                />
              </TabsContent>

              <TabsContent value="effects" className="p-0">
                {selectedCategory && (
                  <EffectsList
                    selectedCategory={selectedCategory}
                    onBack={() => setSelectedCategory(null)}
                    onSelectEffect={handleEffectSelect}
                    onPlayPreview={playPreview}
                  />
                )}
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SoundEffectSelector;
