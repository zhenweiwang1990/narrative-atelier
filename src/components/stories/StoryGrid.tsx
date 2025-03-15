
import React from 'react';
import { UserStory } from '@/hooks/auth/types';
import { StoryCard } from './StoryCard';

interface StoryGridProps {
  stories: UserStory[];
  userId: string;
  onEdit: (story: UserStory) => void;
  onDelete: (storyId: string) => void;
  refreshStories: () => Promise<void>;
}

export const StoryGrid: React.FC<StoryGridProps> = ({ 
  stories, 
  userId, 
  onEdit, 
  onDelete, 
  refreshStories 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          userId={userId}
          onEdit={onEdit}
          onDelete={onDelete}
          refreshStories={refreshStories}
        />
      ))}
    </div>
  );
};
