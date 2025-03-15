
import React from 'react';

export const StoryLoader = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-pulse text-center">
        <p className="text-lg text-muted-foreground">正在加载剧情数据...</p>
      </div>
    </div>
  );
};
