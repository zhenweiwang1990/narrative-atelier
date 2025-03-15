
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { UserStory } from '@/hooks/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const useStoryManagement = () => {
  const navigate = useNavigate();
  const { user, userStories, refreshStories, addNewStory } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Clear initial loading state after a timeout if still loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInitialLoading) {
        console.log('Forcing end of initial loading state after timeout');
        setIsInitialLoading(false);
      }
    }, 5000); // 5 second safety timeout
    
    return () => clearTimeout(timer);
  }, [isInitialLoading]);

  // Set initial loading to false when userStories is loaded
  useEffect(() => {
    if (userStories) {
      console.log('User stories loaded, ending initial loading state', userStories.length);
      setIsInitialLoading(false);
    }
  }, [userStories]);

  const loadStories = async () => {
    console.log('loadStories called, setting initial loading state');
    setIsInitialLoading(true);
    setLoadError(null);
    
    try {
      if (user) {
        console.log('User exists, refreshing stories');
        await refreshStories();
      }
    } catch (error: any) {
      console.error('Error loading stories:', error);
      setLoadError(error.message || '加载剧情数据失败');
    } finally {
      // Always end loading state after a reasonable timeout
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 1000);
    }
  };

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

  return {
    isLoading,
    isInitialLoading,
    loadError,
    selectedStory,
    openDialog,
    setOpenDialog,
    loadStories,
    handleEditClick,
    handleSaveEdit,
    handleDeleteStory,
    handleCreateStory
  };
};
