
import { Story } from '@/utils/types';
import { Session, User } from '@supabase/supabase-js';

export interface UserStory {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: string;
  updated_at: string;
  slug: string;
  cover_image?: string;
}

export interface AuthContextType {
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
  addSampleStory: () => Promise<UserStory | null>;
  currentStorySlug: string | null;
  setCurrentStorySlug: (slug: string | null) => void;
  currentStory: Story | null;
  setCurrentStory: (story: Story | null) => void;
  saveStoryToDatabase: (story: Story, slug: string) => Promise<void>;
  loadStoryFromDatabase: (slug: string) => Promise<Story | null>;
}
