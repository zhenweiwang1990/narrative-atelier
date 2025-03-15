
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TransitionTextsSectionProps {
  successTransition: string | undefined;
  failureTransition: string | undefined;
  onUpdateSuccess: (value: string) => void;
  onUpdateFailure: (value: string) => void;
  showSingleColumn?: boolean;
}

const TransitionTextsSection: React.FC<TransitionTextsSectionProps> = ({
  successTransition = '',
  failureTransition = '',
  onUpdateSuccess,
  onUpdateFailure,
  showSingleColumn = false
}) => {
  // If showing a single column, only render the non-empty transition
  if (showSingleColumn) {
    if (successTransition !== undefined && successTransition !== '') {
      return (
        <div className="pt-2">
          <div>
            <Label className="text-xs">成功转场文本</Label>
            <Textarea
              value={successTransition}
              onChange={(e) => onUpdateSuccess(e.target.value)}
              className="mt-1 text-sm"
              rows={2}
              placeholder="成功后的叙述"
            />
          </div>
        </div>
      );
    } else if (failureTransition !== undefined && failureTransition !== '') {
      return (
        <div className="pt-2">
          <div>
            <Label className="text-xs">失败转场文本</Label>
            <Textarea
              value={failureTransition}
              onChange={(e) => onUpdateFailure(e.target.value)}
              className="mt-1 text-sm"
              rows={2}
              placeholder="失败后的叙述"
            />
          </div>
        </div>
      );
    }
    // If both are empty in single column mode, don't render anything
    return null;
  }

  // Default two-column view
  return (
    <div className="pt-2 space-y-2">
      <div>
        <Label className="text-xs">成功转场文本</Label>
        <Textarea
          value={successTransition}
          onChange={(e) => onUpdateSuccess(e.target.value)}
          className="mt-1 text-sm"
          rows={2}
          placeholder="成功后的叙述"
        />
      </div>
      <div>
        <Label className="text-xs">失败转场文本</Label>
        <Textarea
          value={failureTransition}
          onChange={(e) => onUpdateFailure(e.target.value)}
          className="mt-1 text-sm"
          rows={2}
          placeholder="失败后的叙述"
        />
      </div>
    </div>
  );
};

export default TransitionTextsSection;
