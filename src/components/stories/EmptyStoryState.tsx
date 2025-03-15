
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EmptyStoryStateProps {
  onCreate: () => void;
  isLoading: boolean;
}

export const EmptyStoryState: React.FC<EmptyStoryStateProps> = ({ onCreate, isLoading }) => {
  return (
    <div className="text-center py-10">
      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">没有剧情</h3>
      <p className="text-muted-foreground mb-4">您还没有创建任何剧情。</p>
      <Button onClick={onCreate} disabled={isLoading}>
        创建第一个剧情
      </Button>
    </div>
  );
};
