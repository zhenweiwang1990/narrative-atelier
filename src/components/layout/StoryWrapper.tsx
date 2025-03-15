
import React from 'react';
import { useStory } from '@/context/StoryContext';
import { StoryLoader } from './StoryLoader';

interface StoryWrapperProps {
  children: React.ReactNode;
}

export const StoryWrapper: React.FC<StoryWrapperProps> = ({ children }) => {
  const { story } = useStory();

  if (!story) {
    return <StoryLoader />;
  }

  return <>{children}</>;
};
