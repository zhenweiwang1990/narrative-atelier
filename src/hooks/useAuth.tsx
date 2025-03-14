
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { loadStory, createBlankStory } from '@/utils/storage';
import { Story } from '@/utils/types';
import { toast } from '@/components/ui/use-toast';

export interface UserStory {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: string;
  updated_at: string;
  slug: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any, data: any }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  userStories: UserStory[];
  refreshStories: () => Promise<void>;
  addNewStory: () => Promise<UserStory | null>;
  currentStorySlug: string | null;
  setCurrentStorySlug: (slug: string | null) => void;
  currentStory: Story | null;
  setCurrentStory: (story: Story | null) => void;
  saveStoryToDatabase: (story: Story, slug: string) => Promise<void>;
  loadStoryFromDatabase: (slug: string) => Promise<Story | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [currentStorySlug, setCurrentStorySlug] = useState<string | null>(null);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
      }
      
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        await refreshStories();
      }
      
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        if (session?.user) {
          refreshStories();
        } else {
          setUserStories([]);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const refreshStories = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('stories')
        .select('id, title, description, author, created_at, updated_at, slug')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setUserStories(data as UserStory[]);
    } catch (error: any) {
      console.error('Error fetching stories:', error.message);
    }
  };

  const addNewStory = async (): Promise<UserStory | null> => {
    if (!user) return null;

    try {
      const blankStory = createBlankStory();
      
      const { data, error } = await supabase
        .from('stories')
        .insert({
          title: blankStory.title,
          description: blankStory.description,
          author: blankStory.author,
          user_id: user.id,
          content: blankStory
        })
        .select('id, title, description, author, created_at, updated_at, slug')
        .single();

      if (error) throw error;
      
      await refreshStories();
      return data as UserStory;
    } catch (error: any) {
      console.error('Error creating new story:', error.message);
      return null;
    }
  };

  const saveStoryToDatabase = async (story: Story, slug: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('stories')
        .update({ 
          content: story,
          title: story.title,
          description: story.description,
          author: story.author
        })
        .eq('slug', slug)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "保存成功",
        description: "剧情已保存到云端"
      });
      
      await refreshStories();
    } catch (error: any) {
      console.error('Error saving story:', error.message);
      toast({
        title: "保存失败",
        description: "无法将剧情保存到云端，请稍后重试",
        variant: "destructive"
      });
    }
  };

  const loadStoryFromDatabase = async (slug: string): Promise<Story | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('stories')
        .select('content')
        .eq('slug', slug)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      if (data && data.content) {
        return data.content as Story;
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

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    setCurrentStory(null);
    setCurrentStorySlug(null);
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const value = {
    session,
    user,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    loading,
    userStories,
    refreshStories,
    addNewStory,
    currentStorySlug,
    setCurrentStorySlug,
    currentStory,
    setCurrentStory,
    saveStoryToDatabase,
    loadStoryFromDatabase
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
