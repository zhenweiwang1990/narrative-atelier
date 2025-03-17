
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogFooter } from "@/components/ui/dialog";
import { User, Mountain, Box } from "lucide-react";

// Mock data for media library
const MEDIA_LIBRARY = {
  characters: {
    female: [
      { id: "female-1", name: "青春少女", url: "https://via.placeholder.com/400x600?text=青春少女" },
      { id: "female-2", name: "职场女性", url: "https://via.placeholder.com/400x600?text=职场女性" },
      { id: "female-3", name: "优雅女士", url: "https://via.placeholder.com/400x600?text=优雅女士" },
    ],
    male: [
      { id: "male-1", name: "年轻男子", url: "https://via.placeholder.com/400x600?text=年轻男子" },
      { id: "male-2", name: "职场男性", url: "https://via.placeholder.com/400x600?text=职场男性" },
      { id: "male-3", name: "男性长者", url: "https://via.placeholder.com/400x600?text=男性长者" },
    ],
    other: [
      { id: "other-1", name: "少年", url: "https://via.placeholder.com/400x600?text=少年" },
      { id: "other-2", name: "少女", url: "https://via.placeholder.com/400x600?text=少女" },
    ]
  },
  backgrounds: {
    nature: [
      { id: "nature-1", name: "远山", url: "https://images.unsplash.com/photo-1501854140801-50d01698950b" },
      { id: "nature-2", name: "瀑布", url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716" },
      { id: "nature-3", name: "森林", url: "https://images.unsplash.com/photo-1472396961693-142e6e269027" },
    ],
    urban: [
      { id: "urban-1", name: "街道", url: "https://via.placeholder.com/600x400?text=街道" },
      { id: "urban-2", name: "城市", url: "https://via.placeholder.com/600x400?text=城市" },
    ],
    interior: [
      { id: "interior-1", name: "宫廷", url: "https://via.placeholder.com/600x400?text=宫廷" },
      { id: "interior-2", name: "客厅", url: "https://via.placeholder.com/600x400?text=客厅" },
      { id: "interior-3", name: "卧室", url: "https://via.placeholder.com/600x400?text=卧室" },
    ]
  },
  items: {
    accessories: [
      { id: "acc-1", name: "拐杖", url: "https://via.placeholder.com/300x300?text=拐杖" },
      { id: "acc-2", name: "雨伞", url: "https://via.placeholder.com/300x300?text=雨伞" },
    ],
    weapons: [
      { id: "weapon-1", name: "手枪", url: "https://via.placeholder.com/300x300?text=手枪" },
      { id: "weapon-2", name: "刀剑", url: "https://via.placeholder.com/300x300?text=刀剑" },
    ],
    daily: [
      { id: "daily-1", name: "书籍", url: "https://via.placeholder.com/300x300?text=书籍" },
      { id: "daily-2", name: "茶杯", url: "https://via.placeholder.com/300x300?text=茶杯" },
    ]
  }
};

interface MediaLibraryTabProps {
  onImageSelected: (imageUrl: string) => void;
  aspectRatio: number;
}

const MediaLibraryTab: React.FC<MediaLibraryTabProps> = ({
  onImageSelected,
  aspectRatio
}) => {
  const [mainCategory, setMainCategory] = useState<"characters" | "backgrounds" | "items">("characters");
  const [subCategory, setSubCategory] = useState<string>("female");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get subcategories based on main category
  const getSubCategories = () => {
    switch (mainCategory) {
      case "characters":
        return [
          { id: "female", name: "女性角色", icon: <User className="h-4 w-4 mr-2" /> },
          { id: "male", name: "男性角色", icon: <User className="h-4 w-4 mr-2" /> },
          { id: "other", name: "其他角色", icon: <User className="h-4 w-4 mr-2" /> }
        ];
      case "backgrounds":
        return [
          { id: "nature", name: "自然风景", icon: <Mountain className="h-4 w-4 mr-2" /> },
          { id: "urban", name: "城市街景", icon: <Mountain className="h-4 w-4 mr-2" /> },
          { id: "interior", name: "室内场景", icon: <Mountain className="h-4 w-4 mr-2" /> }
        ];
      case "items":
        return [
          { id: "accessories", name: "个人物品", icon: <Box className="h-4 w-4 mr-2" /> },
          { id: "weapons", name: "武器装备", icon: <Box className="h-4 w-4 mr-2" /> },
          { id: "daily", name: "日常用品", icon: <Box className="h-4 w-4 mr-2" /> }
        ];
      default:
        return [];
    }
  };

  // Get images based on selected categories
  const getImages = () => {
    return MEDIA_LIBRARY[mainCategory][subCategory] || [];
  };

  const handleMainCategoryChange = (category: string) => {
    setMainCategory(category as "characters" | "backgrounds" | "items");
    // Reset subcategory to first option when main category changes
    const firstSubCategory = Object.keys(MEDIA_LIBRARY[category as "characters" | "backgrounds" | "items"])[0];
    setSubCategory(firstSubCategory);
    setSelectedImage(null);
  };

  const handleSubCategoryChange = (category: string) => {
    setSubCategory(category);
    setSelectedImage(null);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={mainCategory} onValueChange={handleMainCategoryChange}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="characters">立绘</TabsTrigger>
          <TabsTrigger value="backgrounds">背景</TabsTrigger>
          <TabsTrigger value="items">物品</TabsTrigger>
        </TabsList>
        
        <div className="flex space-x-2 mb-4">
          {getSubCategories().map((category) => (
            <Button
              key={category.id}
              variant={subCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleSubCategoryChange(category.id)}
              className="flex items-center"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
        
        <ScrollArea className="max-h-[320px]">
          <div className="grid grid-cols-2 gap-2 pr-4">
            {getImages().map((image) => (
              <div
                key={image.id}
                className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                  selectedImage === image.url ? "ring-2 ring-primary" : "hover:opacity-80"
                }`}
                onClick={() => handleImageSelect(image.url)}
              >
                <AspectRatio ratio={aspectRatio}>
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="p-1 text-xs truncate text-center bg-muted/50">
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Tabs>
      
      <DialogFooter>
        <Button onClick={handleConfirm} disabled={!selectedImage}>
          确认选择
        </Button>
      </DialogFooter>
    </div>
  );
};

export default MediaLibraryTab;
