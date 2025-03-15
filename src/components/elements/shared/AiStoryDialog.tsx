
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand, GitBranch, BookText } from "lucide-react";
import { Scene } from "@/utils/types";

interface AiStoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string, convergenceSceneId?: string) => void;
  type: "branch" | "ending";
  scenes?: Scene[];
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

  const handleSubmit = () => {
    onSubmit(prompt, showConvergenceSelector ? convergenceSceneId : undefined);
    setPrompt("");
    setConvergenceSceneId("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "branch" ? (
              <>
                <GitBranch className="h-5 w-5 text-purple-500" />
                AI 写支线
              </>
            ) : (
              <>
                <BookText className="h-5 w-5 text-amber-500" />
                AI 写结局
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>提示语</Label>
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

          {showConvergenceSelector && (
            <div className="space-y-2">
              <Label>合回场景 (可选)</Label>
              <Select value={convergenceSceneId} onValueChange={setConvergenceSceneId}>
                <SelectTrigger>
                  <SelectValue placeholder="选择支线最终要合回的场景" />
                </SelectTrigger>
                <SelectContent>
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
            disabled={!prompt.trim()}
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
