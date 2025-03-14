
import React, { useState } from 'react';
import { useStory } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Image } from 'lucide-react';
import { Location } from '@/utils/types';
import { generateId } from '@/utils/storage';

const Locations = () => {
  const { story, setStory } = useStory();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({
    name: '',
    description: '',
    background: '',
    scenes: []
  });

  // 获取选中的场景用于编辑
  const selectedLocation = story?.locations.find(l => l.id === selectedLocationId) || null;

  // 根据搜索查询过滤场景
  const filteredLocations = story?.locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // 打开创建场景对话框
  const handleOpenCreateDialog = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      description: '',
      background: '',
      scenes: []
    });
    setIsDialogOpen(true);
  };

  // 打开编辑场景对话框
  const handleOpenEditDialog = (location: Location) => {
    setIsEditMode(true);
    setSelectedLocationId(location.id);
    setFormData({
      name: location.name,
      description: location.description,
      background: location.background || '',
      scenes: location.scenes
    });
    setIsDialogOpen(true);
  };

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 处理场景创建或更新
  const handleSaveLocation = () => {
    if (!story || !setStory) return;

    if (isEditMode && selectedLocationId) {
      // 更新现有场景
      const updatedLocations = story.locations.map(location => {
        if (location.id === selectedLocationId) {
          return {
            ...location,
            name: formData.name || location.name,
            description: formData.description || location.description,
            background: formData.background || location.background
          };
        }
        return location;
      });

      setStory({
        ...story,
        locations: updatedLocations
      });
    } else {
      // 创建新场景
      const newLocation: Location = {
        id: generateId('location'),
        name: formData.name || '新场景',
        description: formData.description || '',
        background: formData.background || undefined,
        scenes: []
      };

      setStory({
        ...story,
        locations: [...story.locations, newLocation]
      });
    }

    setIsDialogOpen(false);
  };

  // 处理场景删除
  const handleDeleteLocation = (locationId: string) => {
    if (!story || !setStory) return;

    // 检查场景是否在任何分支中使用
    const isUsed = story.scenes.some(scene => scene.locationId === locationId);

    if (isUsed) {
      // 显示警告
      alert("无法删除此场景，因为它在一个或多个分支中被使用。请先更新这些分支。");
      return;
    }

    setStory({
      ...story,
      locations: story.locations.filter(location => location.id !== locationId)
    });
  };

  // 计算使用此场景的分支数量
  const getSceneCount = (locationId: string) => {
    if (!story) return 0;
    return story.scenes.filter(scene => scene.locationId === locationId).length;
  };

  if (!story) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">场景</h1>
          <p className="text-sm text-muted-foreground">
            管理您故事的场景和背景。
          </p>
        </div>

        <Button size="sm" onClick={handleOpenCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> 添加场景
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索场景..."
            className="pl-9 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>名称</TableHead>
              <TableHead className="hidden md:table-cell">描述</TableHead>
              <TableHead>分支</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  未找到场景。添加您的第一个场景以开始。
                </TableCell>
              </TableRow>
            ) : (
              filteredLocations.map(location => (
                <TableRow key={location.id}>
                  <TableCell>
                    {location.background ? (
                      <img
                        src={location.background}
                        alt={location.name}
                        className="h-8 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="h-8 w-12 rounded bg-muted flex items-center justify-center">
                        <Image className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{location.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[300px]">
                    {location.description}
                  </TableCell>
                  <TableCell>{getSceneCount(location.id)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEditDialog(location)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteLocation(location.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? '编辑场景' : '创建场景'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">名称</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="background">背景图片URL</Label>
              <Input
                id="background"
                name="background"
                value={formData.background}
                onChange={handleInputChange}
                placeholder="https://example.com/background.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="描述这个场景..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={handleSaveLocation}>
              {isEditMode ? '更新场景' : '创建场景'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Locations;
