
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { Story } from '@/utils/types';
import { toast } from '@/components/ui/use-toast';
import { AuthContextType, UserStory } from './types';
import { 
  fetchUserStories, 
  createNewStory, 
  createSampleStory, 
  saveStory, 
  loadStory 
} from './storyService';
import { 
  signInWithPassword, 
  signUpWithPassword, 
  signInWithGoogle as googleSignIn, 
  signOut as supabaseSignOut 
} from './authService';

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
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          await refreshStories();
          
          // Check if user just signed up and has no stories
          if (event === 'SIGNED_IN') {
            const { data: stories } = await supabase
              .from('stories')
              .select('id')
              .eq('user_id', session.user.id)
              .limit(1);
              
            if (!stories || stories.length === 0) {
              // User has no stories, initialize sample story
              const sampleStory = await addSampleStory();
              if (sampleStory) {
                toast({
                  title: "示例剧情已创建",
                  description: "我们为您准备了一个示例剧情，点击左侧菜单中的剧情即可开始探索"
                });
              }
            }
          }
        } else {
          setUserStories([]);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const refreshStories = async () => {
    if (!user) return;
    const stories = await fetchUserStories(user.id);
    setUserStories(stories);
  };

  const addNewStory = async (): Promise<UserStory | null> => {
    if (!user) return null;
    const newStory = await createNewStory(user.id);
    if (newStory) {
      await refreshStories();
    }
    return newStory;
  };

  const addSampleStory = async (): Promise<UserStory | null> => {
    if (!user) return null;
    const userName = user.user_metadata?.full_name;
    const sampleStory = await createSampleStory(user.id, userName);
    if (sampleStory) {
      await refreshStories();
    }
    return sampleStory;
  };

  const saveStoryToDatabase = async (story: Story, slug: string) => {
    if (!user) return;
    await saveStory(story, slug, user.id);
    await refreshStories();
  };

  const loadStoryFromDatabase = async (slug: string): Promise<Story | null> => {
    if (!user) return null;
    return await loadStory(slug, user.id);
  };

  const signIn = async (email: string, password: string) => {
    return await signInWithPassword(email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    return await signUpWithPassword(email, password, name);
  };

  const signInWithGoogle = async () => {
    await googleSignIn();
  };

  const signOut = async () => {
    setCurrentStory(null);
    setCurrentStorySlug(null);
    await supabaseSignOut();
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
    addSampleStory,
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
