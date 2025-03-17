
import { useState } from "react";
import { ExplorationItem } from "@/utils/types";

// Mock initial data
const initialItems: ExplorationItem[] = [
  { 
    id: "item-1", 
    type: "item", 
    name: "古老的钥匙", 
    description: "一把锈迹斑斑的钥匙，似乎可以打开某处的门锁。", 
    isCollectible: true,
    image: "https://via.placeholder.com/300x300?text=古老的钥匙"
  },
  { 
    id: "item-2", 
    type: "item", 
    name: "破旧的信封", 
    description: "一个年代久远的信封，里面可能装着重要的信件。", 
    isCollectible: true 
  },
  { 
    id: "knowledge-1", 
    type: "knowledge", 
    name: "屋主的身世", 
    description: "据说这座房子的主人曾经是一位著名的探险家，他在一次远行中神秘失踪。" 
  }
];

export const useExplorationItems = (sceneId: string) => {
  const [items, setItems] = useState<ExplorationItem[]>(initialItems);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingItem, setEditingItem] = useState<ExplorationItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIsCollectible, setEditIsCollectible] = useState(false);
  const [editImage, setEditImage] = useState<string | undefined>(undefined);
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  // Filter items by type
  const getItemsByType = (type: "item" | "knowledge") => {
    return items.filter(item => item.type === type);
  };

  // Initialize new item form
  const initNewItem = (type: "item" | "knowledge") => {
    setEditingItem(null);
    setEditName("");
    setEditDescription("");
    setEditIsCollectible(type === "item");
    setEditImage(undefined);
    setIsEditing(true);
  };

  // Initialize edit form with existing item
  const initEditItem = (item: ExplorationItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditDescription(item.description);
    setEditIsCollectible(item.isCollectible || false);
    setEditImage(item.image);
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  // Open image selector
  const openImageSelector = () => {
    setIsImageSelectorOpen(true);
  };

  // Handle image selection
  const handleImageSelected = (imageUrl: string) => {
    setEditImage(imageUrl);
    setIsImageSelectorOpen(false);
  };

  // Save item (new or edited)
  const saveItem = (activeTab: "item" | "knowledge") => {
    if (!editName.trim() || !editDescription.trim()) return;

    const newItem: ExplorationItem = {
      id: editingItem ? editingItem.id : `${activeTab}-${Date.now()}`,
      type: activeTab,
      name: editName.trim(),
      description: editDescription.trim(),
      ...(activeTab === "item" && { 
        isCollectible: editIsCollectible,
        ...(editImage && { image: editImage })
      })
    };

    if (editingItem) {
      // Update existing item
      setItems(items.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      // Add new item
      setItems([...items, newItem]);
    }

    setIsEditing(false);
    setEditingItem(null);
  };

  // Delete item
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Generate items with AI
  const generateWithAI = () => {
    setIsGenerating(true);
    
    // TODO: Call the server API to generate exploration items
    // Mock AI generation after a delay
    setTimeout(() => {
      const newGeneratedItems: ExplorationItem[] = [
        {
          id: `item-${Date.now()}-1`,
          type: "item",
          name: "神秘的日记本",
          description: "一本泛黄的日记本，记载着主人公的秘密。翻开后可以了解更多剧情背景。",
          isCollectible: true,
          image: "https://via.placeholder.com/300x300?text=神秘日记本"
        },
        {
          id: `knowledge-${Date.now()}-1`,
          type: "knowledge",
          name: "古代遗迹的传说",
          description: "关于这片区域古代遗迹的传说，据说这里曾经是一个强大文明的中心。"
        }
      ];
      
      setItems([...items, ...newGeneratedItems]);
      setIsGenerating(false);
    }, 2000);
  };

  return {
    items,
    isGenerating,
    editingItem,
    isEditing,
    editName,
    editDescription,
    editIsCollectible,
    editImage,
    isImageSelectorOpen,
    getItemsByType,
    initNewItem,
    initEditItem,
    cancelEdit,
    saveItem,
    deleteItem,
    generateWithAI,
    setEditName,
    setEditDescription,
    setEditIsCollectible,
    setEditImage,
    openImageSelector,
    closeImageSelector: () => setIsImageSelectorOpen(false),
    handleImageSelected
  };
};
