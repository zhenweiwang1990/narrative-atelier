
import React from 'react';
import { Loader2 } from 'lucide-react';

export const StoryLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">正在加载剧情数据...</p>
    </div>
  );
};
