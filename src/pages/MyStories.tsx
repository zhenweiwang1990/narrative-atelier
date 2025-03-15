
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
    console.log('MyStories mounted, loading stories');
    loadStories();
  }, []);
  
  // Show loading state if we're still in the initial loading
  if (isInitialLoading) {
    console.log('Showing loading state');
    return <StoriesLoadingState />;
  }
  
  // Show error state if there was an error loading stories
  if (loadError) {
    console.log('Showing error state', loadError);
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
