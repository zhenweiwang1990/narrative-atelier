
import { useState, useEffect, useCallback } from 'react';
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
  const [lastLoadAttempt, setLastLoadAttempt] = useState(0);

  // Debug logging for better visibility into state changes
  useEffect(() => {
    console.log('useStoryManagement state update:', { 
      hasUser: !!user, 
      storiesCount: userStories?.length || 0,
      isInitialLoading,
      lastLoadAttempt
    });
  }, [user, userStories, isInitialLoading, lastLoadAttempt]);

  // Always end initial loading state when we have stories data or after a delay
  useEffect(() => {
    // Either we have stories data or we can end loading after user is available
    if (userStories !== undefined) {
      console.log('Stories data available, ending initial loading state');
      setIsInitialLoading(false);
    } else if (user === null) {
      console.log('No user, ending initial loading state');
      setIsInitialLoading(false);
      setLoadError('请先登录以查看您的剧情');
    }
  }, [userStories, user]);

  // Clear initial loading state after a safety timeout even if nothing happens
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInitialLoading) {
        console.log('Forcing end of initial loading state after safety timeout');
        setIsInitialLoading(false);
        // Only set error if we don't have stories and we should have loaded by now
        if (!userStories && lastLoadAttempt > 0 && Date.now() - lastLoadAttempt > 3000) {
          setLoadError('加载故事超时，请刷新页面重试');
        }
      }
    }, 8000); // 8 second safety timeout
    
    return () => clearTimeout(timer);
  }, [isInitialLoading, userStories, lastLoadAttempt]);

  // Auto-load stories when dependencies change
  useEffect(() => {
    // Attempt to load stories as soon as we have a user
    if (user && (lastLoadAttempt === 0 || Date.now() - lastLoadAttempt > 5000)) {
      console.log('Auto-loading stories for user:', user?.id);
      loadStories();
    }
  }, [user]);

  const loadStories = useCallback(async () => {
    console.log('loadStories called, setting initial loading state');
    setIsInitialLoading(true);
    setLoadError(null);
    setLastLoadAttempt(Date.now());
    
    try {
      if (user) {
        console.log('User exists, refreshing stories for:', user.id);
        await refreshStories();
        console.log('Stories refresh completed');
      } else {
        console.log('No user found when trying to load stories');
        setLoadError('未登录或会话已过期');
      }
    } catch (error: any) {
      console.error('Error loading stories:', error);
      setLoadError(error.message || '加载剧情数据失败');
    } finally {
      // End loading state after a short delay to prevent UI flashing
      setTimeout(() => {
        console.log('Ending initial loading state after loadStories');
        setIsInitialLoading(false);
      }, 300);
    }
  }, [user, refreshStories]);

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
