
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { EditStoryDialog, EmptyStoryState, StoriesLoadingState, StoriesErrorState, StoryHeader, StoryGrid } from '@/components/stories';
import { useStoryManagement } from '@/hooks/useStoryManagement';

export default function MyStories() {
  const { user, userStories, refreshStories } = useAuth();
  const [forceRerender, setForceRerender] = useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const {
    isLoading,
    isInitialLoading,
    loadError,
    selectedStory,
    openDialog,
    setOpenDialog,
    loadStories,
    forceRefreshStories,
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
      storiesCount: userStories?.length || 0,
      isInitialLoading,
      loadError,
      forceRerender,
      hasAttemptedLoad
    });
  }, [user, userStories, isInitialLoading, loadError, forceRerender, hasAttemptedLoad]);
  
  // Add safety timeout to recover from indefinite loading state
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (isInitialLoading) {
        console.log('Safety timeout triggered - forcing rerender');
        setForceRerender(prev => !prev); // Toggle to force rerender
      }
    }, 4000); // Reduced from 5s to 4s
    
    return () => clearTimeout(safetyTimer);
  }, [isInitialLoading]);
  
  // Second safety check - if we've been on the page for 8 seconds with no stories, try again
  useEffect(() => {
    const secondaryTimer = setTimeout(() => {
      if (!userStories && user && hasAttemptedLoad) {
        console.log('Secondary timeout - stories still not loaded after 8s, forcing refresh');
        forceRefreshStories();
      }
    }, 8000);
    
    return () => clearTimeout(secondaryTimer);
  }, [userStories, user, hasAttemptedLoad, forceRefreshStories]);
  
  // When forceRerender changes, attempt to load stories again
  useEffect(() => {
    if (forceRerender && user) {
      console.log('Handling forced rerender by refreshing stories');
      forceRefreshStories();
    }
  }, [forceRerender, forceRefreshStories, user]);
  
  // Directly force a load on component mount or when user changes
  useEffect(() => {
    const initializeStories = async () => {
      console.log('MyStories explicitly loading stories on mount');
      // Only try to load if we have a user
      if (user) {
        try {
          setHasAttemptedLoad(true);
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
  }, [user, forceRerender, refreshStories]); // Re-run if user changes or force rerender happens
  
  // Show loading state if we're still in the initial loading
  if (isInitialLoading && !userStories) {
    console.log('Showing loading state in MyStories');
    return <StoriesLoadingState />;
  }
  
  // Show error state if there was an error loading stories
  if (loadError) {
    console.log('Showing error state', loadError);
    return <StoriesErrorState onRetry={forceRefreshStories} errorMessage={loadError} />;
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
