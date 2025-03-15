
import { useState, useEffect } from "react";
import { generateId } from "@/utils/storage";

export interface MusicItem {
  id: string;
  name: string;
  description: string;
  url: string;
}

// Initial mock data
const initialMusic: MusicItem[] = [
  {
    id: "music-1",
    name: "平静的森林",
    description: "适合冒险场景或安静的对话",
    url: "https://example.com/music/peaceful-forest.mp3",
  },
  {
    id: "music-2",
    name: "紧张战斗",
    description: "适合紧张的战斗场景",
    url: "https://example.com/music/battle-tension.mp3",
  },
  {
    id: "music-3",
    name: "悲伤乐章",
    description: "适合感伤场景",
    url: "https://example.com/music/sad-melody.mp3",
  },
  {
    id: "music-4",
    name: "欢快旋律",
    description: "适合喜剧或轻松场景",
    url: "https://example.com/music/happy-tune.mp3",
  },
];

// Mock local storage key
const MUSIC_STORAGE_KEY = "story_engine_music";

export const useMusic = () => {
  const [music, setMusic] = useState<MusicItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load music from local storage or use initial data
  useEffect(() => {
    const fetchMusic = async () => {
      setIsLoading(true);
      try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storedMusic = localStorage.getItem(MUSIC_STORAGE_KEY);
        if (storedMusic) {
          setMusic(JSON.parse(storedMusic));
        } else {
          // Use initial data for first time
          setMusic(initialMusic);
          localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(initialMusic));
        }
      } catch (error) {
        console.error("Failed to load music:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusic();
  }, []);

  // Add a new music item
  const addMusic = async (musicData: Omit<MusicItem, "id">) => {
    setIsLoading(true);
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newMusic = {
        ...musicData,
        id: generateId("music"),
      };
      
      const updatedMusic = [...music, newMusic];
      setMusic(updatedMusic);
      localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(updatedMusic));
      return newMusic;
    } catch (error) {
      console.error("Failed to add music:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing music item
  const updateMusic = async (updatedItem: MusicItem) => {
    setIsLoading(true);
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedMusic = music.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      );
      
      setMusic(updatedMusic);
      localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(updatedMusic));
      return updatedItem;
    } catch (error) {
      console.error("Failed to update music:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a music item
  const deleteMusic = async (id: string) => {
    setIsLoading(true);
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const updatedMusic = music.filter(item => item.id !== id);
      setMusic(updatedMusic);
      localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(updatedMusic));
      return true;
    } catch (error) {
      console.error("Failed to delete music:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    music,
    addMusic,
    updateMusic,
    deleteMusic,
    isLoading,
  };
};
