
import React from 'react';
import { Button } from '@/components/ui/button';
import { GitBranch, BookText } from 'lucide-react';

interface QteOutcomeButtonsProps {
  onOpenAiDialog: (type: 'branch' | 'ending', outcomeType: 'success' | 'failure') => void;
  outcomeType: 'success' | 'failure';
  sceneId: string; // 添加sceneId属性以检查场景是否已被选择
}

const QteOutcomeButtons: React.FC<QteOutcomeButtonsProps> = ({ 
  onOpenAiDialog, 
  outcomeType,
  sceneId 
}) => {
  // 只有在没有选择场景时渲染按钮（sceneId为空）
  if (sceneId && sceneId !== 'none') {
    return null;
  }

  return (
    <div className="flex gap-2 mt-3">
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-xs flex items-center gap-1"
        onClick={() => onOpenAiDialog('branch', outcomeType)}
      >
        <GitBranch className="h-3.5 w-3.5" />
        AI 写支线
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-xs flex items-center gap-1"
        onClick={() => onOpenAiDialog('ending', outcomeType)}
      >
        <BookText className="h-3.5 w-3.5" />
        AI 写结局
      </Button>
    </div>
  );
};

export default QteOutcomeButtons;
