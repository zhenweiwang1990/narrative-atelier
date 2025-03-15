
import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const StoriesLoadingState: React.FC = () => {
  useEffect(() => {
    console.log('StoriesLoadingState mounted - displaying loading UI');
    
    // Add a timeout check to detect if the loading state persists too long
    const timer = setTimeout(() => {
      console.log('StoriesLoadingState still showing after 5 seconds - possible issue');
    }, 5000);
    
    return () => {
      console.log('StoriesLoadingState unmounted');
      clearTimeout(timer);
    };
  }, []);

  // Function to force a page reload if loading gets stuck
  const handleForceRefresh = () => {
    console.log('User triggered manual refresh');
    // Clear any cached data in localStorage that might be causing the issue
    localStorage.removeItem('narrative-atelier-auth');
    // Force a full page reload
    window.location.href = '/my-stories';
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-full">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <h3 className="text-lg font-medium mb-2">正在加载剧情</h3>
      <p className="text-muted-foreground mb-6">请稍候，正在获取您的剧情数据</p>
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
        <Skeleton className="h-4 w-4/6 mx-auto" />
      </div>
      
      {/* Manual refresh button that appears after a delay */}
      <div className="mt-8 opacity-0 animate-in fade-in delay-500 duration-300">
        <p className="text-sm text-muted-foreground mb-2">
          加载时间过长？
        </p>
        <Button 
          variant="outline" 
          onClick={handleForceRefresh}
        >
          点击强制刷新
        </Button>
      </div>
    </div>
  );
};
