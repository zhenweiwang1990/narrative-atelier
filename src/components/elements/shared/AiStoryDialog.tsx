
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand } from "lucide-react";

interface AiStoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string, convergenceSceneId?: string, endingType?: 'normal' | 'bad') => void;
  type: "branch" | "ending";
  scenes?: any[];
  showConvergenceSelector?: boolean;
}

const AiStoryDialog: React.FC<AiStoryDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  type,
  scenes = [],
  showConvergenceSelector = false,
}) => {
  const [prompt, setPrompt] = useState("");
  const [convergenceSceneId, setConvergenceSceneId] = useState("");
  const [endingType, setEndingType] = useState<'normal' | 'bad'>('normal');

  const handleSubmit = () => {
    onSubmit(
      prompt, 
      showConvergenceSelector ? convergenceSceneId : undefined, 
      type === 'ending' ? endingType : undefined
    );
    setPrompt("");
    setConvergenceSceneId("");
    setEndingType('normal');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-[500px]"
        style={{ zIndex: 1000 }} // Higher z-index to ensure it appears above other floating elements
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "branch" ? "AI 写支线" : "AI 写结局"}
          </DialogTitle>
          <DialogDescription>
            {type === "branch" 
              ? "AI 会根据您的提示生成支线分支内容" 
              : "AI 会根据您的提示生成结局内容"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>提示语（可选）</Label>
            <Textarea 
              placeholder={
                type === "branch" 
                  ? "描述你想要的支线情节发展..." 
                  : "描述你想要的结局情节..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {type === "ending" && (
            <div className="space-y-2">
              <Label>结局类型</Label>
              <RadioGroup 
                value={endingType} 
                onValueChange={(value) => setEndingType(value as 'normal' | 'bad')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">正常结局</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bad" id="bad" />
                  <Label htmlFor="bad">异常结局</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {showConvergenceSelector && (
            <div className="space-y-2">
              <Label>合回场景 (可选)</Label>
              <Select value={convergenceSceneId} onValueChange={setConvergenceSceneId}>
                <SelectTrigger>
                  <SelectValue placeholder="选择支线最终要合回的场景" />
                </SelectTrigger>
                <SelectContent className="z-[1100]">
                  {scenes.map((scene) => (
                    <SelectItem key={scene.id} value={scene.id}>
                      {scene.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                选择一个现有场景作为分支的终点，AI 将自动生成中间的场景。
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button 
            onClick={handleSubmit} 
            className="gap-2"
          >
            <Wand className="h-4 w-4" />
            生成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiStoryDialog;
