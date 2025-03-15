
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

  // Debug logging
  useEffect(() => {
    console.log('MyStories component rendered with states:', {
      user: !!user, 
      userId: user?.id,
      userStories: userStories?.length || 0,
      isInitialLoading,
      loadError
    });
  }, [user, userStories, isInitialLoading, loadError]);
  
  // Directly force a load on component mount
  useEffect(() => {
    const initializeStories = async () => {
      console.log('MyStories explicitly loading stories on mount');
      // Direct call to ensure stories are loaded
      if (user) {
        try {
          await refreshStories();
          console.log('Stories refreshed from MyStories component');
        } catch (err) {
          console.error('Error refreshing stories from MyStories:', err);
        }
      }
    };
    
    initializeStories();
  }, [user]); // Only re-run if user changes
  
  // Show loading state if we're still in the initial loading
  if (isInitialLoading) {
    console.log('Showing loading state in MyStories');
    return <StoriesLoadingState />;
  }
  
  // Show error state if there was an error loading stories
  if (loadError) {
    console.log('Showing error state', loadError);
    return <StoriesErrorState onRetry={loadStories} errorMessage={loadError} />;
  }

  // Show appropriate content based on user and story data
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
