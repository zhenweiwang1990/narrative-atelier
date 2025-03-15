import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { EditStoryDialog, EmptyStoryState, StoriesLoadingState, StoriesErrorState, StoryHeader, StoryGrid } from '@/components/stories';
import { useStoryManagement } from '@/hooks/useStoryManagement';

export default function MyStories() {
  const { user, userStories, refreshStories } = useAuth();
  const {
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
  } = useStoryManagement();

  // Fetch stories when component mounts
  useEffect(() => {
    loadStories();
  }, [user]);
  
  // Check initial loading state when component mounts
  useEffect(() => {
    if (user && userStories) {
      // Set a timeout to prevent infinite loading state
      const timer = setTimeout(() => {
        // This will be handled by the useStoryManagement hook
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [user, userStories]);

  // Show loading state if we're still in the initial loading
  if (isInitialLoading) {
    return <StoriesLoadingState />;
  }
  
  // Show error state if there was an error loading stories
  if (loadError) {
    return <StoriesErrorState onRetry={loadStories} errorMessage={loadError} />;
  }

  return (
    <div className="container mx-auto py-6">
      <StoryHeader 
        onCreateStory={handleCreateStory} 
        isLoading={isLoading} 
      />

      {!userStories || userStories.length === 0 ? (
        <EmptyStoryState 
          onCreate={handleCreateStory} 
          isLoading={isLoading} 
        />
      ) : (
        <StoryGrid
          stories={userStories}
          userId={user?.id || ''}
          onEdit={handleEditClick}
          onDelete={handleDeleteStory}
          refreshStories={refreshStories}
        />
      )}

      <EditStoryDialog
        open={openDialog}
        setOpen={setOpenDialog}
        selectedStory={selectedStory}
        onSave={handleSaveEdit}
        isLoading={isLoading}
      />
    </div>
  );
}
