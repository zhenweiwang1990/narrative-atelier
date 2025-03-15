
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SoundEffectCategory, soundEffectsLibrary } from "@/utils/soundEffects";
import { Music, X, Volume2 } from "lucide-react";

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
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const playPreview = (url: string) => {
    // Stop any currently playing preview
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
      setIsPlaying(false);
    }

    // Create and play a new audio
    const audio = new Audio(url);
    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.play();
    setPreviewAudio(audio);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>音效</Label>
        {selectedEffect && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => playPreview(selectedEffect.url)}
            >
              <Volume2 className="h-3 w-3 mr-1" />
              试听
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-100"
              onClick={handleRemoveEffect}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {selectedEffect ? (
        <div className="text-sm p-2 border rounded flex justify-between items-center bg-muted/30">
          <div>
            <span className="font-medium">{selectedEffect.name}</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({selectedEffect.category})
            </span>
          </div>
        </div>
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
                <ScrollArea className="h-[300px]">
                  <div className="grid grid-cols-1 gap-1 p-2">
                    {soundEffectsLibrary.map((category) => (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className="justify-start h-auto py-2"
                        onClick={() => handleCategorySelect(category)}
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
              </TabsContent>

              <TabsContent value="effects" className="p-0">
                {selectedCategory && (
                  <ScrollArea className="h-[300px]">
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        className="mb-2 text-sm"
                        onClick={() => setSelectedCategory(null)}
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
                                  handleEffectSelect(
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
                                    playPreview(effect.url);
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
