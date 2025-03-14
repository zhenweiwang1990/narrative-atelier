
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TransitionTextsSectionProps {
  successTransition: string | undefined;
  failureTransition: string | undefined;
  onUpdateSuccess: (value: string) => void;
  onUpdateFailure: (value: string) => void;
}

const TransitionTextsSection: React.FC<TransitionTextsSectionProps> = ({
  successTransition = '',
  failureTransition = '',
  onUpdateSuccess,
  onUpdateFailure
}) => {
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
