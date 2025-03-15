
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { UserStory } from '@/hooks/auth/types';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoryCard, EditStoryDialog, EmptyStoryState } from '@/components/stories';

export default function MyStories() {
  const navigate = useNavigate();
  const { user, userStories, refreshStories, addNewStory } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = (story: UserStory) => {
    setSelectedStory(story);
    setOpenDialog(true);
  };

  const handleSaveEdit = async (title: string, description: string, author: string) => {
    if (!selectedStory || !user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('stories')
        .update({ 
          title,
          description,
          author
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
        <EmptyStoryState 
          onCreate={handleCreateStory} 
          isLoading={isLoading} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userStories?.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              userId={user?.id || ''}
              onEdit={handleEditClick}
              onDelete={handleDeleteStory}
              refreshStories={refreshStories}
            />
          ))}
        </div>
      )}

      <EditStoryDialog
        open={openDialog}
        setOpen={setOpenDialog}
        selectedStory={selectedStory}
        onSave={handleSaveEdit}
        isLoading={isLoading}
      />
    </div>
  );
}
