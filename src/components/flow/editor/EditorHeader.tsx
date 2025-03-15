
import React from "react";
import { Button } from "@/components/ui/button";
import { PencilLine, X } from "lucide-react";

interface EditorHeaderProps {
  title: string;
  onClose: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="px-3 py-2 border-b bg-muted/50 flex items-center">
      <PencilLine className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
      <h3 className="text-sm font-medium flex-1">{title}</h3>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default EditorHeader;
