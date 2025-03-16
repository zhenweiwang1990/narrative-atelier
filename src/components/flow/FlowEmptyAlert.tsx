
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const FlowEmptyAlert = () => {
  return (
    <Alert
      variant="default"
      className="bg-amber-50 text-amber-600 border-amber-200"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        您还没有任何分支。添加一个分支开始。
      </AlertDescription>
    </Alert>
  );
};

export default FlowEmptyAlert;
