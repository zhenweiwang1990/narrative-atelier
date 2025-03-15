
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { NarrationElement as NarrationElementType } from '@/utils/types';
import { Volume2, Search } from 'lucide-react';
import { soundEffectsLibrary } from '@/utils/soundEffects';

interface NarrationElementProps {
  element: NarrationElementType;
  onUpdate: (id: string, updates: Partial<NarrationElementType>) => void;
}

export const NarrationElement: React.FC<NarrationElementProps> = ({ element, onUpdate }) => {
  const [soundEffectDialogOpen, setSoundEffectDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleSelectSoundEffect = (category: string, subcategory: string, effect: { id: string, name: string, url: string }) => {
    onUpdate(element.id, {
      soundEffect: {
        category,
        name: effect.name,
        url: effect.url
      }
    });
    setSoundEffectDialogOpen(false);
  };

  const handleRemoveSoundEffect = () => {
    onUpdate(element.id, { soundEffect: undefined });
  };

  // Filter categories based on search query
  const filteredCategories = soundEffectsLibrary.filter(category => {
    if (!searchQuery) return true;
    
    // Check if category name matches
    if (category.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    
    // Check if any subcategory or effect names match
    return category.subcategories.some(subcategory => {
      if (subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
      return subcategory.effects.some(effect => 
        effect.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  });

  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">文本</Label>
        <Textarea
          value={element.text}
          onChange={(e) => onUpdate(element.id, { text: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <Volume2 className="h-3 w-3 mr-1 text-muted-foreground" />
          <span>旁白可添加音效增强场景沉浸感</span>
        </div>
        
        {element.soundEffect ? (
          <div className="flex items-center space-x-2">
            <div className="text-xs bg-muted px-2 py-1 rounded-md flex items-center">
              <Volume2 className="h-3 w-3 mr-1" />
              <span>{element.soundEffect.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={handleRemoveSoundEffect}
            >
              ×
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7" 
            onClick={() => setSoundEffectDialogOpen(true)}
          >
            <Volume2 className="h-3 w-3 mr-1" />
            添加音效
          </Button>
        )}
      </div>
      
      <Dialog open={soundEffectDialogOpen} onOpenChange={setSoundEffectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>选择音效</DialogTitle>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索音效..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {selectedCategory ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCategory(null)}
                >
                  返回分类
                </Button>
              </div>
              
              {filteredCategories
                .find(cat => cat.id === selectedCategory)
                ?.subcategories.map(subcategory => (
                  <div key={subcategory.id} className="space-y-2">
                    <h3 className="text-sm font-medium">{subcategory.name}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {subcategory.effects.map(effect => (
                        <Button 
                          key={effect.id} 
                          variant="outline" 
                          className="justify-start h-auto py-2 px-3"
                          onClick={() => handleSelectSoundEffect(
                            filteredCategories.find(cat => cat.id === selectedCategory)?.name || "", 
                            subcategory.name, 
                            effect
                          )}
                        >
                          <Volume2 className="h-3 w-3 mr-2" />
                          <span className="text-xs">{effect.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredCategories.map(category => (
                <Button 
                  key={category.id} 
                  variant="outline" 
                  className="h-20 flex flex-col justify-center items-center"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Volume2 className="h-6 w-6 mb-2" />
                  <span>{category.name}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {category.subcategories.reduce(
                      (count, subcat) => count + subcat.effects.length, 
                      0
                    )} 种音效
                  </span>
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
