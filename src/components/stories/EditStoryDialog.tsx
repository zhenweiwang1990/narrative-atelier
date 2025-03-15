
import React, { useState } from 'react';
import { UserStory } from '@/hooks/auth/types';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditStoryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedStory: UserStory | null;
  onSave: (title: string, description: string, author: string) => Promise<void>;
  isLoading: boolean;
}

export const EditStoryDialog: React.FC<EditStoryDialogProps> = ({
  open,
  setOpen,
  selectedStory,
  onSave,
  isLoading
}) => {
  const [editTitle, setEditTitle] = useState(selectedStory?.title || '');
  const [editDescription, setEditDescription] = useState(selectedStory?.description || '');
  const [editAuthor, setEditAuthor] = useState(selectedStory?.author || '');

  // Update form values when selected story changes
  React.useEffect(() => {
    if (selectedStory) {
      setEditTitle(selectedStory.title);
      setEditDescription(selectedStory.description || '');
      setEditAuthor(selectedStory.author || '');
    }
  }, [selectedStory]);

  const handleSave = async () => {
    await onSave(editTitle, editDescription, editAuthor);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑剧情信息</DialogTitle>
          <DialogDescription>
            更新剧情的基本信息。点击保存应用更改。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              标题
            </Label>
            <Input
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              作者
            </Label>
            <Input
              id="author"
              value={editAuthor}
              onChange={(e) => setEditAuthor(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              描述
            </Label>
            <Textarea
              id="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="col-span-3"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "保存中..." : "保存更改"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
