
import React from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterData {
  id: string;
  title: string;
  content: string;
  isConverted: boolean;
}

interface ConversionChapterItemProps {
  chapter: ChapterData;
  index: number;
  isConverting: boolean;
  currentChapterIndex: number;
  onConvert: (index: number) => void;
}

const ConversionChapterItem: React.FC<ConversionChapterItemProps> = ({
  chapter,
  index,
  isConverting,
  currentChapterIndex,
  onConvert
}) => {
  return (
    <div 
      className="p-4 border rounded-md flex justify-between items-center"
    >
      <div>
        <h3 className="font-medium">{chapter.title}</h3>
        <p className="text-sm text-muted-foreground">
          {chapter.content.substring(0, 50)}...
        </p>
      </div>
      
      <Button
        onClick={() => onConvert(index)}
        disabled={isConverting || chapter.isConverted}
        variant={chapter.isConverted ? "secondary" : "default"}
      >
        {chapter.isConverted ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            已转换
          </>
        ) : isConverting && currentChapterIndex === index ? (
          "转换中..."
        ) : (
          "转换章节"
        )}
      </Button>
    </div>
  );
};

export default ConversionChapterItem;
