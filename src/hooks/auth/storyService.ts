import { supabase } from '@/integrations/supabase/client';
import { Story } from '@/utils/types';
import { createBlankStory } from '@/utils/storage';
import { toast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';
import { UserStory } from './types';

export const fetchUserStories = async (userId: string): Promise<UserStory[]> => {
  try {
    console.log('Fetching stories for user:', userId);
    const { data, error } = await supabase
      .from('stories')
      .select('id, title, description, author, created_at, updated_at, slug, cover_image')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error.message);
      throw error;
    }
    
    console.log('Fetched stories:', data?.length || 0);
    return data || [];
  } catch (error: any) {
    console.error('Exception fetching stories:', error.message);
    throw error;
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
      .select('id, title, description, author, created_at, updated_at, slug, cover_image')
      .single();

    if (error) throw error;
    
    return data as UserStory;
  } catch (error: any) {
    console.error('Error creating new story:', error.message);
    throw error;
  }
};

export const createSampleStory = async (userId: string, userName: string): Promise<UserStory | null> => {
  try {
    // Fetch the sample story from the public directory
    const response = await fetch('/红衣如故.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch sample story: ${response.status}`);
    }
    
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
      .select('id, title, description, author, created_at, updated_at, slug, cover_image')
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
    throw error;
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
    throw error;
  }
};

// Add caching for loaded stories to prevent repeated database queries
// Increased the TTL for better performance
const storyCache = new Map<string, {story: Story, timestamp: number}>();
const CACHE_TTL = 300000; // 5 minutes cache validity (increased from 60 seconds)

export const loadStory = async (slug: string, userId: string): Promise<Story | null> => {
  try {
    // Check if we have a valid cached version
    const cacheKey = `${userId}-${slug}`;
    const cachedData = storyCache.get(cacheKey);
    const now = Date.now();
    
    if (cachedData && (now - cachedData.timestamp < CACHE_TTL)) {
      console.log('Using cached story data for', slug);
      return cachedData.story;
    }
    
    console.log(`Loading story with slug: ${slug} for user: ${userId}`);
    
    // Using maybeSingle() instead of single() to avoid errors when no data is found
    const { data, error } = await supabase
      .from('stories')
      .select('content')
      .eq('slug', slug)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error in database query:', error);
      throw error;
    }
    
    if (data && data.content) {
      console.log('Story loaded successfully');
      const story = data.content as unknown as Story;
      
      // Cache the result
      storyCache.set(cacheKey, {story, timestamp: now});
      
      return story;
    }
    
    console.log('No story found with the given slug');
    return null;
  } catch (error: any) {
    console.error('Exception loading story:', error.message);
    toast({
      title: "加载失败",
      description: "无法从云端加载剧情，请稍后重试",
      variant: "destructive"
    });
    throw error;
  }
};

// Add method to clear cache when needed
export const clearStoryCache = (userId?: string, slug?: string) => {
  if (userId && slug) {
    // Clear specific story
    storyCache.delete(`${userId}-${slug}`);
  } else {
    // Clear all cache
    storyCache.clear();
  }
};
