
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Location } from "@/utils/types";

interface LocationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  formData: Partial<Location>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  formData,
  onInputChange,
  onSave,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "编辑地点" : "创建地点"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">名称</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              rows={4}
              placeholder="描述这个地点..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            {isEditMode ? "更新地点" : "创建地点"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
