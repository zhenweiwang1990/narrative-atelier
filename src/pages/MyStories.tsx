
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { EditStoryDialog, EmptyStoryState, StoriesLoadingState, StoriesErrorState, StoryHeader, StoryGrid } from '@/components/stories';
import { useStoryManagement } from '@/hooks/useStoryManagement';

export default function MyStories() {
  const { user, userStories, refreshStories } = useAuth();
  const [forceRerender, setForceRerender] = useState(false);
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
  
  // Add safety timeout to recover from indefinite loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInitialLoading) {
        console.log('Safety timeout triggered - forcing rerender');
        setForceRerender(true);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [isInitialLoading]);
  
  // Reset force rerender after it's triggered
  useEffect(() => {
    if (forceRerender) {
      console.log('Handling forced rerender');
      setForceRerender(false);
    }
  }, [forceRerender]);
  
  // Directly force a load on component mount or when user changes
  useEffect(() => {
    const initializeStories = async () => {
      console.log('MyStories explicitly loading stories on mount');
      // Only try to load if we have a user
      if (user) {
        try {
          await refreshStories();
          console.log('Stories refreshed from MyStories component');
        } catch (err) {
          console.error('Error refreshing stories from MyStories:', err);
        }
      } else {
        console.log('No user available yet, waiting for auth state');
      }
    };
    
    initializeStories();
  }, [user, forceRerender]); // Re-run if user changes or force rerender happens
  
  // Show loading state if we're still in the initial loading
  if (isInitialLoading && !userStories) {
    console.log('Showing loading state in MyStories');
    return <StoriesLoadingState />;
  }
  
  // Show error state if there was an error loading stories
  if (loadError) {
    console.log('Showing error state', loadError);
    return <StoriesErrorState onRetry={loadStories} errorMessage={loadError} />;
  }

  // If user is not logged in, show appropriate message
  if (!user) {
    return <StoriesErrorState onRetry={() => window.location.href = '/auth'} errorMessage="请先登录以查看您的剧情" />;
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
