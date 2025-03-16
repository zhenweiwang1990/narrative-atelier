
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Scene } from "@/utils/types";

interface IncompleteSceneAlertProps {
  isIncomplete: boolean;
}

const IncompleteSceneAlert: React.FC<IncompleteSceneAlertProps> = ({ isIncomplete }) => {
  if (!isIncomplete) return null;

  return (
    <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-xs">
        此场景处于未完待续状态，没有指定任何后续场景。
      </AlertDescription>
    </Alert>
  );
};

export default IncompleteSceneAlert;
