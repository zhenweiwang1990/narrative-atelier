import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const FlowLoadingState: React.FC = () => {
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    // After 2 seconds, show the refresh button option
    const timer = setTimeout(() => {
      setShowRefresh(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleForceRefresh = () => {
    // Keep the current story ID but clear other potential problem data
    const currentStoryId = localStorage.getItem("interactive-story-editor-current-id");
    
    // Clear any localStorage cache that might be causing issues
    localStorage.removeItem("interactive-story-editor-loading");
    
    // Force a page reload
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">正在加载剧情数据...</h2>
      
      {showRefresh && (
        <div className="flex flex-col items-center mt-4 space-y-2">
          <p className="text-sm text-muted-foreground mb-2">
            加载时间过长？尝试刷新页面：
          </p>
          <Button variant="outline" onClick={handleForceRefresh} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新页面
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlowLoadingState;
