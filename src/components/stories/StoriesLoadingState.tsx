
import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export const StoriesLoadingState: React.FC = () => {
  useEffect(() => {
    console.log('StoriesLoadingState mounted - displaying loading UI');
    // 添加一个超时检查
    const timer = setTimeout(() => {
      console.log('StoriesLoadingState still showing after 8 seconds - possible issue');
    }, 8000);
    
    return () => {
      console.log('StoriesLoadingState unmounted');
      clearTimeout(timer);
    };
  }, []);

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
    </div>
  );
};
