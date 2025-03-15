
import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlowLoadingState: React.FC = () => {
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
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-lg mb-4">正在加载剧情数据...</p>
      
      {showRefresh && (
        <div className="mt-4 animate-in fade-in duration-300">
          <p className="text-sm text-muted-foreground mb-2">
            加载时间过长？
          </p>
          <Button 
            variant="outline" 
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

export default FlowLoadingState;
