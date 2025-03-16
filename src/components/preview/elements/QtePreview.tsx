
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Keyboard, KeyRound, MoveHorizontal } from "lucide-react";
import { QteElement, ValueChange } from "@/utils/types";

interface QtePreviewProps {
  element: QteElement;
  handleChoiceSelect: (nextSceneId: string, valueChanges?: ValueChange[]) => void;
}

const QtePreview: React.FC<QtePreviewProps> = ({ element, handleChoiceSelect }) => {
  const qteType = element.qteType || 'action'; // Default to 'action' for backwards compatibility
  const isDoubleChar = element.isDoubleChar || false;
  
  // Get the icon based on QTE type
  const getQteIcon = () => {
    switch (qteType) {
      case 'combo':
        return <MoveHorizontal className="h-4 w-4 text-blue-600 mr-2" />;
      case 'unlock':
        return <KeyRound className="h-4 w-4 text-amber-600 mr-2" />;
      case 'action':
      default:
        return <Clock className="h-4 w-4 text-red-600 mr-2" />;
    }
  };
  
  // Get the title based on QTE type
  const getQteTitle = () => {
    switch (qteType) {
      case 'combo':
        return "方向连击";
      case 'unlock':
        return "图案解锁";
      case 'action':
      default:
        return "快速反应";
    }
  };
  
  // Get the background color based on QTE type
  const getBgColorClass = () => {
    switch (qteType) {
      case 'combo':
        return "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800";
      case 'unlock':
        return "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800";
      case 'action':
      default:
        return "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800";
    }
  };
  
  // Render the key sequence for action type
  const renderKeySequence = () => {
    if (qteType !== 'action' || !element.keySequence) return null;
    
    if (isDoubleChar) {
      // Split by space for double character mode
      const keys = element.keySequence.split(' ').filter(key => key.trim() !== '');
      
      return (
        <div className="flex space-x-1 items-center">
          <Keyboard className="h-3 w-3 mr-1 text-red-500" />
          <span>按键序列:</span>
          <div className="flex gap-1">
            {keys.map((key, index) => (
              <span key={index} className="bg-white dark:bg-red-950/60 px-1.5 py-0.5 rounded text-xs border border-red-200 dark:border-red-800">
                {key}
              </span>
            ))}
          </div>
        </div>
      );
    } else {
      // Regular single character display
      return (
        <div className="flex items-center">
          <Keyboard className="h-3 w-3 mr-1 text-red-500" />
          <span>按键序列: {element.keySequence}</span>
        </div>
      );
    }
  };
  
  // Render the content specific to QTE type
  const renderQteContent = () => {
    switch (qteType) {
      case 'combo':
        return (
          <div className="flex justify-between text-xs text-muted-foreground mb-3 bg-white dark:bg-blue-950/30 p-2 rounded border border-blue-100 dark:border-blue-900">
            <div className="flex items-center">
              <MoveHorizontal className="h-3 w-3 mr-1 text-blue-500" />
              <span>方向序列: {element.directionSequence || "UDLR"}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-blue-500" />
              <span>时间: {element.timeLimit || 3}s</span>
            </div>
          </div>
        );
      case 'unlock':
        return (
          <div className="flex justify-between text-xs text-muted-foreground mb-3 bg-white dark:bg-amber-950/30 p-2 rounded border border-amber-100 dark:border-amber-900">
            <div className="flex items-center">
              <KeyRound className="h-3 w-3 mr-1 text-amber-500" />
              <span>解锁图案: {element.unlockPattern || "Z"}形</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-amber-500" />
              <span>时间: {element.timeLimit || 3}s</span>
            </div>
          </div>
        );
      case 'action':
      default:
        return (
          <div className="flex justify-between text-xs text-muted-foreground mb-3 bg-white dark:bg-red-950/30 p-2 rounded border border-red-100 dark:border-red-900">
            {renderKeySequence()}
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-red-500" />
              <span>时间: {element.timeLimit || 3}s</span>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className={`p-4 rounded-md border my-2 animate-fade-in ${getBgColorClass()}`}>
      <div className="flex items-center mb-3">
        {getQteIcon()}
        <p className={`text-xs font-medium ${qteType === 'combo' ? 'text-blue-600 dark:text-blue-400' : (qteType === 'unlock' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400')}`}>
          {getQteTitle()}
        </p>
      </div>
      <p className={`text-sm mb-2 font-bold ${qteType === 'combo' ? 'text-blue-600 dark:text-blue-400' : (qteType === 'unlock' ? 'text-amber-600 dark:text-amber-400' : 'text-amber-600 dark:text-amber-400')}`}>
        {element.introText || getQteTitle()}
      </p>
      <p className={`text-sm mb-4 bg-white p-2 rounded-md border ${qteType === 'combo' ? 'dark:bg-blue-950/60 border-blue-100 dark:border-blue-900' : (qteType === 'unlock' ? 'dark:bg-amber-950/60 border-amber-100 dark:border-amber-900' : 'dark:bg-red-950/60 border-red-100 dark:border-red-900')}`}>
        {element.description}
      </p>

      {renderQteContent()}

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() =>
            handleChoiceSelect(
              element.success.sceneId,
              element.success.valueChanges
            )
          }
        >
          Success
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() =>
            handleChoiceSelect(
              element.failure.sceneId,
              element.failure.valueChanges
            )
          }
        >
          Failure
        </Button>
      </div>
    </div>
  );
};

export default QtePreview;
