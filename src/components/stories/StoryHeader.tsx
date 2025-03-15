
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';

interface StoryHeaderProps {
  onCreateStory: () => void;
  isLoading: boolean;
}

export const StoryHeader: React.FC<StoryHeaderProps> = ({ onCreateStory, isLoading }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">我的剧情</h1>
      <Button onClick={onCreateStory} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            处理中...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            创建新剧情
          </>
        )}
      </Button>
    </div>
  );
};
