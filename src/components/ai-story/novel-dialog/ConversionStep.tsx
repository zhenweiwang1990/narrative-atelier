
import React, { useState } from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AutomatedProcessingDialog from '../chapters/AutomatedProcessingDialog';

interface ChapterData {
  id: string;
  title: string;
  content: string;
  isConverted: boolean;
  annotations: string[];
}

interface ConversionStepProps {
  chapters: ChapterData[];
  isConverting: boolean;
  onConvertChapter: (index: number) => void;
}

const ConversionStep: React.FC<ConversionStepProps> = ({
  chapters,
  isConverting,
  onConvertChapter,
}) => {
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);
  const [processingChapterIndex, setProcessingChapterIndex] = useState(-1);

  const handleConvertClick = (index: number) => {
    setProcessingChapterIndex(index);
    setShowProcessingDialog(true);
  };

  const handleProcessingComplete = () => {
    setShowProcessingDialog(false);
    if (processingChapterIndex >= 0) {
      onConvertChapter(processingChapterIndex);
    }
  };

  return (
    <>
      <ScrollArea className="h-[60vh]">
        <div className="space-y-4 pb-4">
          {chapters.map((chapter, index) => (
            <div 
              key={chapter.id} 
              className="p-4 border rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{chapter.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {chapter.content.substring(0, 50)}...
                </p>
              </div>
              
              <Button
                onClick={() => handleConvertClick(index)}
                disabled={isConverting || chapter.isConverted}
                variant={chapter.isConverted ? "secondary" : "default"}
              >
                {chapter.isConverted ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    已转换
                  </>
                ) : (
                  <>
                    转换章节
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <AutomatedProcessingDialog 
        isOpen={showProcessingDialog}
        onClose={() => setShowProcessingDialog(false)}
        onComplete={handleProcessingComplete}
      />
    </>
  );
};

export default ConversionStep;
