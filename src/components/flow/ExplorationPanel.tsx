
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2, Wand2, Pencil, Save, X } from "lucide-react";
import { Story } from "@/utils/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define exploration item types
interface ExplorationItem {
  id: string;
  type: "item" | "knowledge";
  name: string;
  description: string;
  isCollectible?: boolean;
}

interface ExplorationPanelProps {
  sceneId: string;
  story: Story;
}

const ExplorationPanel: React.FC<ExplorationPanelProps> = ({ sceneId, story }) => {
  // Mock data - in real implementation this would come from the scene
  const [items, setItems] = useState<ExplorationItem[]>([
    { 
      id: "item-1", 
      type: "item", 
      name: "古老的钥匙", 
      description: "一把锈迹斑斑的钥匙，似乎可以打开某处的门锁。", 
      isCollectible: true 
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
  ]);

  const [activeTab, setActiveTab] = useState<"item" | "knowledge">("item");
  const [editingItem, setEditingItem] = useState<ExplorationItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Local state for new/edited item
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIsCollectible, setEditIsCollectible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Filter items by type
  const itemsOfType = items.filter(item => item.type === activeTab);

  // Initialize new item form
  const initNewItem = () => {
    setEditingItem(null);
    setEditName("");
    setEditDescription("");
    setEditIsCollectible(activeTab === "item");
    setIsEditing(true);
  };

  // Initialize edit form with existing item
  const initEditItem = (item: ExplorationItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditDescription(item.description);
    setEditIsCollectible(item.isCollectible || false);
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  // Save item (new or edited)
  const saveItem = () => {
    if (!editName.trim() || !editDescription.trim()) return;

    const newItem: ExplorationItem = {
      id: editingItem ? editingItem.id : `${activeTab}-${Date.now()}`,
      type: activeTab,
      name: editName.trim(),
      description: editDescription.trim(),
      ...(activeTab === "item" && { isCollectible: editIsCollectible })
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
          isCollectible: true
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">场景探索项</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={generateWithAI}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Wand2 className="h-4 w-4 mr-2 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              AI 生成探索项
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "item" | "knowledge")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="item">物品</TabsTrigger>
          <TabsTrigger value="knowledge">知识</TabsTrigger>
        </TabsList>

        <TabsContent value="item" className="space-y-4 mt-2">
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={initNewItem}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              添加物品
            </Button>
          )}

          {isEditing && activeTab === "item" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{editingItem ? "编辑物品" : "添加物品"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="item-name">物品名称</Label>
                  <Input 
                    id="item-name" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="输入物品名称" 
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="item-description">物品描述</Label>
                  <Textarea 
                    id="item-description" 
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="输入物品的详细描述"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch 
                    id="item-collectible"
                    checked={editIsCollectible}
                    onCheckedChange={setEditIsCollectible}
                  />
                  <Label htmlFor="item-collectible">允许收集</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  取消
                </Button>
                <Button size="sm" onClick={saveItem}>
                  <Save className="h-4 w-4 mr-2" />
                  保存
                </Button>
              </CardFooter>
            </Card>
          )}

          {itemsOfType.length === 0 && !isEditing ? (
            <Alert>
              <AlertDescription>
                此场景暂无可探索物品，点击上方按钮添加物品，或使用AI自动生成。
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-2">
              {itemsOfType.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="py-2 px-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm flex items-center">
                        {item.name}
                        {item.isCollectible && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 dark:bg-blue-900 dark:text-blue-300">
                            可收集
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => initEditItem(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 px-3">
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4 mt-2">
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={initNewItem}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              添加知识
            </Button>
          )}

          {isEditing && activeTab === "knowledge" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{editingItem ? "编辑知识" : "添加知识"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="knowledge-name">知识名称</Label>
                  <Input 
                    id="knowledge-name" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="输入知识名称" 
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="knowledge-description">知识描述</Label>
                  <Textarea 
                    id="knowledge-description" 
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="输入知识的详细内容"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="ghost" size="sm" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  取消
                </Button>
                <Button size="sm" onClick={saveItem}>
                  <Save className="h-4 w-4 mr-2" />
                  保存
                </Button>
              </CardFooter>
            </Card>
          )}

          {itemsOfType.length === 0 && !isEditing ? (
            <Alert>
              <AlertDescription>
                此场景暂无可探索知识，点击上方按钮添加知识，或使用AI自动生成。
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-2">
              {itemsOfType.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="py-2 px-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm">{item.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => initEditItem(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 px-3">
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorationPanel;
