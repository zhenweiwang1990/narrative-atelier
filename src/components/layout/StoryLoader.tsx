
import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const StoryLoader = () => {
  const [showRefresh, setShowRefresh] = useState(false);
  
  useEffect(() => {
    // Show refresh button after a short delay
    const timer = setTimeout(() => {
      setShowRefresh(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleForceRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">正在加载剧情数据...</p>
      
      {showRefresh && (
        <div className="mt-2 animate-in fade-in duration-300">
          <p className="text-sm text-muted-foreground mb-2 text-center">
            加载时间过长？
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleForceRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            刷新页面
          </Button>
        </div>
      )}
    </div>
  );
};
