
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { UserStory } from '@/hooks/auth/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Edit, 
  Trash2, 
  Plus, 
  Image, 
  Loader2 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';

export default function MyStories() {
  const navigate = useNavigate();
  const { user, userStories, refreshStories, addNewStory } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenStory = (slug: string) => {
    navigate(`/editor/${slug}`);
  };

  const handleEditClick = (story: UserStory) => {
    setSelectedStory(story);
    setEditTitle(story.title);
    setEditDescription(story.description || '');
    setEditAuthor(story.author || '');
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedStory || !user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('stories')
        .update({ 
          title: editTitle,
          description: editDescription,
          author: editAuthor
        })
        .eq('id', selectedStory.id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await refreshStories();
      setOpenDialog(false);
      toast({
        title: "已更新",
        description: "剧情信息已成功更新"
      });
    } catch (error: any) {
      console.error('Error updating story:', error);
      toast({
        title: "更新失败",
        description: error.message || "无法更新剧情信息",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!confirm('确定要删除这个剧情吗？此操作不可逆。')) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', storyId)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      await refreshStories();
      toast({
        title: "已删除",
        description: "剧情已成功删除"
      });
    } catch (error: any) {
      console.error('Error deleting story:', error);
      toast({
        title: "删除失败",
        description: error.message || "无法删除剧情",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStory = async () => {
    setIsLoading(true);
    try {
      const newStory = await addNewStory();
      if (newStory?.slug) {
        navigate(`/editor/${newStory.slug}`);
      }
    } catch (error: any) {
      console.error('Error creating story:', error);
      toast({
        title: "创建失败",
        description: error.message || "无法创建新剧情",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, storyId: string) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `cover_${storyId}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `story_covers/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('story_covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicURLData } = supabase.storage
        .from('story_covers')
        .getPublicUrl(filePath);

      // Update story with cover image URL
      const { error: updateError } = await supabase
        .from('stories')
        .update({ cover_image: publicURLData.publicUrl })
        .eq('id', storyId)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await refreshStories();
      toast({
        title: "封面已更新",
        description: "剧情封面图片已成功更新"
      });
    } catch (error: any) {
      console.error('Error uploading cover image:', error);
      toast({
        title: "上传失败",
        description: error.message || "无法上传封面图片",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">我的剧情</h1>
        <Button onClick={handleCreateStory} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              处理中...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              创建新剧情
            </>
          )}
        </Button>
      </div>

      {userStories?.length === 0 ? (
        <div className="text-center py-10">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">没有剧情</h3>
          <p className="text-muted-foreground mb-4">您还没有创建任何剧情。</p>
          <Button onClick={handleCreateStory} disabled={isLoading}>
            创建第一个剧情
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userStories?.map((story) => (
            <Card key={story.id} className="overflow-hidden flex flex-col">
              <div 
                className="h-40 bg-gray-100 relative flex items-center justify-center overflow-hidden"
                style={story.cover_image ? {
                  backgroundImage: `url(${story.cover_image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {}}
              >
                {!story.cover_image && (
                  <BookOpen className="h-12 w-12 text-gray-400" />
                )}
                <div className="absolute top-2 right-2">
                  <input
                    type="file"
                    id={`cover-upload-${story.id}`}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleCoverImageUpload(e, story.id)}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => document.getElementById(`cover-upload-${story.id}`)?.click()}
                    disabled={isUploading}
                    className="opacity-80 hover:opacity-100"
                  >
                    <Image className="h-4 w-4 mr-1" />
                    {isUploading ? '上传中...' : '设置封面'}
                  </Button>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{story.title}</CardTitle>
                <CardDescription>
                  {story.author ? `作者: ${story.author}` : '未设置作者'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {story.description || '暂无描述'}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  上次更新: {new Date(story.updated_at).toLocaleString('zh-CN')}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditClick(story)}>
                  <Edit className="h-4 w-4 mr-1" />
                  编辑信息
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteStory(story.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => handleOpenStory(story.slug as string)}
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    打开
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>编辑剧情信息</DialogTitle>
            <DialogDescription>
              更新剧情的基本信息。点击保存应用更改。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                标题
              </Label>
              <Input
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                作者
              </Label>
              <Input
                id="author"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                描述
              </Label>
              <Textarea
                id="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              取消
            </Button>
            <Button type="submit" onClick={handleSaveEdit} disabled={isLoading}>
              {isLoading ? "保存中..." : "保存更改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
