
import { supabase } from '@/integrations/supabase/client';
import { Story } from '@/utils/types';
import { createBlankStory } from '@/utils/storage';
import { toast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';
import { UserStory } from './types';

export const fetchUserStories = async (userId: string): Promise<UserStory[]> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('id, title, description, author, created_at, updated_at, slug')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data as UserStory[];
  } catch (error: any) {
    console.error('Error fetching stories:', error.message);
    return [];
  }
};

export const createNewStory = async (userId: string): Promise<UserStory | null> => {
  try {
    const blankStory = createBlankStory();
    
    const storyContent = blankStory as unknown as Json;
    
    const { data, error } = await supabase
      .from('stories')
      .insert({
        title: blankStory.title,
        description: blankStory.description,
        author: blankStory.author,
        user_id: userId,
        content: storyContent
      })
      .select('id, title, description, author, created_at, updated_at, slug')
      .single();

    if (error) throw error;
    
    return data as UserStory;
  } catch (error: any) {
    console.error('Error creating new story:', error.message);
    return null;
  }
};

export const createSampleStory = async (userId: string, userName: string): Promise<UserStory | null> => {
  try {
    // Fetch the sample story from the public directory
    const response = await fetch('/红衣如故.json');
    const sampleStoryData = await response.json() as Story;
    
    // Prepare story content
    const storyContent = sampleStoryData as unknown as Json;
    
    // Insert the sample story
    const { data, error } = await supabase
      .from('stories')
      .insert({
        title: sampleStoryData.title || "红衣如故(Demo)",
        description: sampleStoryData.description || "示例剧情，探索交互式剧情编辑器的功能",
        author: userName || "未知作者",
        user_id: userId,
        content: storyContent
      })
      .select('id, title, description, author, created_at, updated_at, slug')
      .single();

    if (error) throw error;
    
    return data as UserStory;
  } catch (error: any) {
    console.error('Error creating sample story:', error.message);
    toast({
      title: "创建示例剧情失败",
      description: "无法加载示例剧情，请尝试手动创建新剧情",
      variant: "destructive"
    });
    return null;
  }
};

export const saveStory = async (story: Story, slug: string, userId: string): Promise<void> => {
  try {
    const storyContent = story as unknown as Json;
    
    const { error } = await supabase
      .from('stories')
      .update({ 
        content: storyContent,
        title: story.title,
        description: story.description,
        author: story.author
      })
      .eq('slug', slug)
      .eq('user_id', userId);

    if (error) throw error;
    
    toast({
      title: "保存成功",
      description: "剧情已保存到云端"
    });
  } catch (error: any) {
    console.error('Error saving story:', error.message);
    toast({
      title: "保存失败",
      description: "无法将剧情保存到云端，请稍后重试",
      variant: "destructive"
    });
  }
};

export const loadStory = async (slug: string, userId: string): Promise<Story | null> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('content')
      .eq('slug', slug)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    
    if (data && data.content) {
      return data.content as unknown as Story;
    }
    
    return null;
  } catch (error: any) {
    console.error('Error loading story:', error.message);
    toast({
      title: "加载失败",
      description: "无法从云端加载剧情，请稍后重试",
      variant: "destructive"
    });
    return null;
  }
};
