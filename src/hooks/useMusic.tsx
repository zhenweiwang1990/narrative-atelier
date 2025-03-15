
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Music {
  id: string;
  name: string;
  url: string;
  isUploaded: boolean;
}

interface MusicState {
  musicLibrary: Music[];
  addMusic: (music: Music) => void;
  removeMusic: (id: string) => void;
  updateMusic: (id: string, updates: Partial<Music>) => void;
}

export const useMusic = create<MusicState>()(
  persist(
    (set) => ({
      musicLibrary: [
        {
          id: '1',
          name: '轻松的钢琴曲',
          url: 'https://example.com/piano.mp3',
          isUploaded: false,
        },
        {
          id: '2',
          name: '悠扬的小提琴',
          url: 'https://example.com/violin.mp3',
          isUploaded: false,
        },
        {
          id: '3',
          name: '紧张的背景音乐',
          url: 'https://example.com/tense.mp3',
          isUploaded: false,
        },
      ],
      addMusic: (music) =>
        set((state) => ({
          musicLibrary: [...state.musicLibrary, music],
        })),
      removeMusic: (id) =>
        set((state) => ({
          musicLibrary: state.musicLibrary.filter((music) => music.id !== id),
        })),
      updateMusic: (id, updates) =>
        set((state) => ({
          musicLibrary: state.musicLibrary.map((music) =>
            music.id === id ? { ...music, ...updates } : music
          ),
        })),
    }),
    {
      name: 'music-library',
    }
  )
);
