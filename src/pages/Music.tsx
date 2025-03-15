
import React, { useState } from "react";
import { useMusic } from "@/hooks/useMusic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, PlusCircle, Music as MusicIcon, Trash2, Edit, Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Music = () => {
  const { toast } = useToast();
  const { 
    music, 
    addMusic, 
    deleteMusic, 
    updateMusic, 
    isLoading 
  } = useMusic();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<{ id: string; name: string; description: string; url: string } | null>(null);
  const [newMusic, setNewMusic] = useState({ name: "", description: "", url: "" });
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const filteredMusic = music.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMusic = async () => {
    if (!newMusic.name || !newMusic.url) {
      toast({
        title: "请填写必要信息",
        description: "音乐名称和URL不能为空",
        variant: "destructive",
      });
      return;
    }

    try {
      await addMusic(newMusic);
      setNewMusic({ name: "", description: "", url: "" });
      setIsAddDialogOpen(false);
      toast({
        title: "添加成功",
        description: "已成功添加新音乐",
      });
    } catch (error) {
      toast({
        title: "添加失败",
        description: "无法添加音乐，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const handleEditMusic = async () => {
    if (!currentMusic || !currentMusic.name || !currentMusic.url) {
      toast({
        title: "请填写必要信息",
        description: "音乐名称和URL不能为空",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateMusic(currentMusic);
      setIsEditDialogOpen(false);
      toast({
        title: "更新成功",
        description: "已成功更新音乐信息",
      });
    } catch (error) {
      toast({
        title: "更新失败",
        description: "无法更新音乐，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMusic = async (id: string) => {
    try {
      await deleteMusic(id);
      if (currentlyPlaying === id) {
        setCurrentlyPlaying(null);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
      toast({
        title: "删除成功",
        description: "已成功删除音乐",
      });
    } catch (error) {
      toast({
        title: "删除失败",
        description: "无法删除音乐，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const togglePlay = (id: string, url: string) => {
    if (currentlyPlaying === id) {
      if (audioRef.current?.paused) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentlyPlaying(id);
      audioRef.current = new Audio(url);
      audioRef.current.play();
      audioRef.current.onended = () => {
        setCurrentlyPlaying(null);
      };
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">音乐库</h1>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          添加音乐
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索音乐..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">加载中...</p>
        </div>
      ) : filteredMusic.length === 0 ? (
        <div className="text-center py-10 border rounded-md bg-muted/30">
          <MusicIcon className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground mt-2">
            {searchTerm ? "没有找到匹配的音乐" : "音乐库中还没有音乐"}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsAddDialogOpen(true)}
          >
            添加第一个音乐
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-2">
            {filteredMusic.map((item) => (
              <div
                key={item.id}
                className="p-3 border rounded-md flex items-center justify-between hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePlay(item.id, item.url)}
                    aria-label={currentlyPlaying === item.id ? "暂停" : "播放"}
                  >
                    {currentlyPlaying === item.id ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.description || "无描述"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCurrentMusic(item);
                      setIsEditDialogOpen(true);
                    }}
                    aria-label="编辑"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteMusic(item.id)}
                    aria-label="删除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Add Music Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加新音乐</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                音乐名称<span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                value={newMusic.name}
                onChange={(e) =>
                  setNewMusic({ ...newMusic, name: e.target.value })
                }
                placeholder="输入音乐名称"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                描述
              </label>
              <Textarea
                id="description"
                value={newMusic.description}
                onChange={(e) =>
                  setNewMusic({ ...newMusic, description: e.target.value })
                }
                placeholder="输入音乐描述（可选）"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">
                音乐URL<span className="text-red-500">*</span>
              </label>
              <Input
                id="url"
                value={newMusic.url}
                onChange={(e) =>
                  setNewMusic({ ...newMusic, url: e.target.value })
                }
                placeholder="输入音乐URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              取消
            </Button>
            <Button onClick={handleAddMusic}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Music Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑音乐</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                音乐名称<span className="text-red-500">*</span>
              </label>
              <Input
                id="edit-name"
                value={currentMusic?.name || ""}
                onChange={(e) =>
                  setCurrentMusic(
                    currentMusic
                      ? { ...currentMusic, name: e.target.value }
                      : null
                  )
                }
                placeholder="输入音乐名称"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                描述
              </label>
              <Textarea
                id="edit-description"
                value={currentMusic?.description || ""}
                onChange={(e) =>
                  setCurrentMusic(
                    currentMusic
                      ? { ...currentMusic, description: e.target.value }
                      : null
                  )
                }
                placeholder="输入音乐描述（可选）"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-url" className="text-sm font-medium">
                音乐URL<span className="text-red-500">*</span>
              </label>
              <Input
                id="edit-url"
                value={currentMusic?.url || ""}
                onChange={(e) =>
                  setCurrentMusic(
                    currentMusic
                      ? { ...currentMusic, url: e.target.value }
                      : null
                  )
                }
                placeholder="输入音乐URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              取消
            </Button>
            <Button onClick={handleEditMusic}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Music;
