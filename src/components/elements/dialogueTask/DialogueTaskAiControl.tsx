
import React from "react";
import { Button } from "@/components/ui/button";
import AiStoryDialog from "../shared/AiStoryDialog";
import { Scene } from "@/utils/types";

interface DialogueTaskAiControlProps {
  aiDialogOpen: boolean;
  aiDialogType: "branch" | "ending";
  aiDialogFor: "success" | "failure";
  scenes: Scene[];
  onOpenAiDialog: (
    type: "branch" | "ending",
    outcomeType: "success" | "failure"
  ) => void;
  onCloseAiDialog: () => void;
  onAiStorySubmit: (
    prompt: string,
    convergenceSceneId?: string,
    endingType?: "normal" | "bad"
  ) => void;
}

const DialogueTaskAiControl: React.FC<DialogueTaskAiControlProps> = ({
  aiDialogOpen,
  aiDialogType,
  aiDialogFor,
  scenes,
  onOpenAiDialog,
  onCloseAiDialog,
  onAiStorySubmit,
}) => {
  return (
    <>
      <AiStoryDialog
        isOpen={aiDialogOpen}
        onClose={onCloseAiDialog}
        onSubmit={onAiStorySubmit}
        type={aiDialogType}
        scenes={scenes}
        showConvergenceSelector={aiDialogType === "branch"}
      />
    </>
  );
};

export default DialogueTaskAiControl;
