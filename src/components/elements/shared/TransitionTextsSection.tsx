
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
        <Label className="text-xs">Success Transition</Label>
        <Textarea
          value={successTransition}
          onChange={(e) => onUpdateSuccess(e.target.value)}
          className="mt-1 text-sm"
          rows={2}
          placeholder="Narration after success"
        />
      </div>
      <div>
        <Label className="text-xs">Failure Transition</Label>
        <Textarea
          value={failureTransition}
          onChange={(e) => onUpdateFailure(e.target.value)}
          className="mt-1 text-sm"
          rows={2}
          placeholder="Narration after failure"
        />
      </div>
    </div>
  );
};

export default TransitionTextsSection;
