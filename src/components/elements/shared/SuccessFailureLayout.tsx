
import React, { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SuccessFailureSectionProps {
  title: string;
  children: ReactNode;
  isSuccess?: boolean;
}

const SuccessFailureSection: React.FC<SuccessFailureSectionProps> = ({
  title,
  children,
  isSuccess = true
}) => {
  return (
    <Card className={`p-2 ${isSuccess ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} shadow-none`}>
      <Label className={`text-xs font-medium block mb-2 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
        {title}
      </Label>
      <div className="space-y-2">
        {children}
      </div>
    </Card>
  );
};

interface SuccessFailureLayoutProps {
  successChildren: ReactNode;
  failureChildren: ReactNode;
  successTitle?: string;
  failureTitle?: string;
}

const SuccessFailureLayout: React.FC<SuccessFailureLayoutProps> = ({
  successChildren,
  failureChildren,
  successTitle = "成功",
  failureTitle = "失败"
}) => {
  return (
    <div className="space-y-2">
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-2">
        <SuccessFailureSection title={successTitle} isSuccess={true}>
          {successChildren}
        </SuccessFailureSection>
        <SuccessFailureSection title={failureTitle} isSuccess={false}>
          {failureChildren}
        </SuccessFailureSection>
      </div>
    </div>
  );
};

export default SuccessFailureLayout;
