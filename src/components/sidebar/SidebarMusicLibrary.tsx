
import React, { useState } from 'react';
import { Music, Plus, Search, Trash2, Upload, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarGroupLabel, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { uploadMusic } from '@/utils/soundEffects';
import { toast } from 'sonner';
import { useMusic } from '@/hooks/useMusic';

export function SidebarMusicLibrary() {
  const { musicLibrary, addMusic, removeMusic } = useMusic();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMusicName, setNewMusicName] = useState('');
  const [newMusicUrl, setNewMusicUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Filter music based on search query
  const filteredMusic = musicLibrary.filter(music => 
    music.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMusic = () => {
    if (!newMusicName.trim()) {
      toast.error('请输入音乐名称');
      return;
    }

    if (!newMusicUrl.trim()) {
      toast.error('请输入音乐URL或上传文件');
      return;
    }

    addMusic({
      id: Date.now().toString(),
      name: newMusicName,
      url: newMusicUrl,
      isUploaded: false
    });

    setNewMusicName('');
    setNewMusicUrl('');
    setIsAddDialogOpen(false);
    toast.success('音乐已添加到库中');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is audio
    if (!file.type.startsWith('audio/')) {
      toast.error('请上传音频文件');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const result = await uploadMusic(file);
      setNewMusicUrl(result.url);
      if (!newMusicName) {
        setNewMusicName(result.name);
      }
      toast.success('音乐上传成功');
    } catch (error) {
      toast.error('上传失败，请重试');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel>
          <Music className="mr-2 h-4 w-4" />
          音乐库
        </SidebarGroupLabel>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <SidebarGroupContent>
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索音乐..."
              className="pl-8 h-9 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="max-h-[200px] overflow-y-auto pr-1 space-y-1">
            {filteredMusic.length === 0 ? (
              <div className="text-xs text-muted-foreground p-2 text-center">
                未找到音乐
              </div>
            ) : (
              filteredMusic.map((music) => (
                <div 
                  key={music.id} 
                  className="flex items-center justify-between p-2 text-xs rounded-md hover:bg-muted group"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Volume2 className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{music.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100"
                    onClick={() => removeMusic(music.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </SidebarGroupContent>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>添加背景音乐</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">音乐名称</Label>
              <Input
                id="name"
                value={newMusicName}
                onChange={(e) => setNewMusicName(e.target.value)}
                placeholder="输入音乐名称"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="url">音乐URL</Label>
              <Input
                id="url"
                value={newMusicUrl}
                onChange={(e) => setNewMusicUrl(e.target.value)}
                placeholder="输入音乐URL链接"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>或上传音乐文件</Label>
              <div className="border border-dashed rounded-md p-4 text-center">
                <Label 
                  htmlFor="musicUpload" 
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">点击上传音乐文件</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    支持 MP3, WAV, OGG 格式
                  </span>
                </Label>
                <Input
                  id="musicUpload"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    上传中，请稍候...
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddMusic}>
              添加音乐
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  );
}
