
import React from 'react';
import { Scene } from '@/utils/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Wand } from 'lucide-react';

interface SceneSelectSectionProps {
  successSceneId: string;
  failureSceneId: string;
  scenes: Scene[];
  showSingleColumn?: boolean;
  onUpdateSuccessScene: (sceneId: string) => void;
  onUpdateFailureScene: (sceneId: string) => void;
  onOpenAiDialog: (type: 'branch' | 'ending', isSuccess: boolean) => void;
  showSuccessAiButtons?: boolean;
  showFailureAiButtons?: boolean;
}

const SceneSelectSection: React.FC<SceneSelectSectionProps> = ({
  successSceneId,
  failureSceneId,
  scenes,
  showSingleColumn = false,
  onUpdateSuccessScene,
  onUpdateFailureScene,
  onOpenAiDialog,
  showSuccessAiButtons = true,
  showFailureAiButtons = true,
}) => {
  const handleSceneChange = (value: string, isSuccess: boolean) => {
    if (value === "ai-branch") {
      onOpenAiDialog('branch', isSuccess);
    } else if (value === "ai-ending") {
      onOpenAiDialog('ending', isSuccess);
    } else {
      if (isSuccess) {
        onUpdateSuccessScene(value === "none" ? "" : value);
      } else {
        onUpdateFailureScene(value === "none" ? "" : value);
      }
    }
  };

  const renderSceneSelect = (isSuccess: boolean) => {
    const sceneId = isSuccess ? successSceneId : failureSceneId;
    const showAiButtons = isSuccess ? showSuccessAiButtons : showFailureAiButtons;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between">
          <Label>{isSuccess ? '成功场景' : '失败跳转场景'}</Label>
        </div>
        
        <Select
          value={sceneId || "none"}
          onValueChange={(value) => handleSceneChange(value, isSuccess)}
        >
          <SelectTrigger id={isSuccess ? "successScene" : "failureScene"} className="h-8 text-sm">
            <SelectValue placeholder={isSuccess ? "选择成功场景" : "选择失败跳转场景"} />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[100]">
            <SelectItem value="none">不指定</SelectItem>
            <SelectItem value="ai-branch" className="text-blue-600">AI 写支线</SelectItem>
            <SelectItem value="ai-ending" className="text-purple-600">AI 写结局</SelectItem>
            {scenes.map((scene) => (
              <SelectItem key={scene.id} value={scene.id}>
                {scene.title} (
                {scene.type === "start"
                  ? "开始"
                  : scene.type === "ending"
                  ? "正常结局"
                  : scene.type === "bad-ending"
                  ? "异常结局"
                  : "普通"}
                )
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {showAiButtons && !sceneId && (
          <div className="flex gap-1 mt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1 text-xs flex-1 text-blue-600"
              onClick={() => onOpenAiDialog('branch', isSuccess)}
            >
              <Wand className="h-3 w-3" />
              AI 写支线
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1 text-xs flex-1 text-purple-600"
              onClick={() => onOpenAiDialog('ending', isSuccess)}
            >
              <Wand className="h-3 w-3" />
              AI 写结局
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (showSingleColumn) {
    if (successSceneId !== '' || (successSceneId === '' && failureSceneId === '')) {
      return renderSceneSelect(true);
    }
    
    if (failureSceneId !== '') {
      return renderSceneSelect(false);
    }
    
    // Determine which one to show by default in single column mode
    return renderSceneSelect(true);
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {renderSceneSelect(true)}
      {renderSceneSelect(false)}
    </div>
  );
};

export default SceneSelectSection;
