
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

// 服务器自动处理的步骤
const processingSteps = [
  { id: 'characters', name: '自动识别角色', icon: 'user' },
  { id: 'locations', name: '自动识别地点', icon: 'map-pin' },
  { id: 'scenes', name: '自动切分场景', icon: 'film' },
  { id: 'values', name: '自动处理数值系统', icon: 'sliders-horizontal' },
  { id: 'effects', name: '自动选择场景特效', icon: 'sparkles' },
  { id: 'interactions', name: '自动编排互动项', icon: 'message-square' },
  { id: 'convert', name: '转换入库完成', icon: 'server' },
];

interface AutomatedProcessingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const AutomatedProcessingDialog: React.FC<AutomatedProcessingDialogProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [completed, setCompleted] = useState<boolean>(false);

  // 模拟处理步骤的进度
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(-1);
      setCompleted(false);
      return;
    }

    let stepIndex = 0;
    const runSteps = () => {
      const interval = setInterval(() => {
        if (stepIndex < processingSteps.length) {
          setCurrentStep(stepIndex);
          stepIndex++;
        } else {
          clearInterval(interval);
          setCompleted(true);
        }
      }, 800); // 每800毫秒完成一个步骤

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(runSteps, 500);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  // 获取步骤对应的图标组件
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return <span className="i-lucide-user h-5 w-5" />;
      case 'map-pin':
        return <span className="i-lucide-map-pin h-5 w-5" />;
      case 'film':
        return <span className="i-lucide-film h-5 w-5" />;
      case 'sliders-horizontal':
        return <span className="i-lucide-sliders-horizontal h-5 w-5" />;
      case 'sparkles':
        return <span className="i-lucide-sparkles h-5 w-5" />;
      case 'message-square':
        return <span className="i-lucide-message-square h-5 w-5" />;
      case 'server':
        return <span className="i-lucide-server h-5 w-5" />;
      default:
        return <span className="i-lucide-circle h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>服务器自动处理中</DialogTitle>
          <DialogDescription>
            系统正在自动分析和处理章节内容，转换为互动剧情结构。此过程完全自动化，无需人工干预。
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-3">
            {processingSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center p-2 rounded-md transition-colors ${
                  index <= currentStep ? 'bg-secondary' : 'bg-muted/50'
                }`}
              >
                <div className="mr-4 flex-shrink-0">
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : index === currentStep ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : (
                    getStepIcon(step.icon)
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{step.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          {completed ? (
            <Button onClick={onComplete}>
              继续人工优化
            </Button>
          ) : (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              处理中...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AutomatedProcessingDialog;
