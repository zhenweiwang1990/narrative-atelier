
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversionChapterItem from './ConversionChapterItem';

interface ChapterData {
  id: string;
  title: string;
  content: string;
  isConverted: boolean;
}

interface ConversionChaptersListProps {
  chapters: ChapterData[];
  isConverting: boolean;
  currentChapterIndex: number;
  onConvertChapter: (index: number) => void;
}

const ConversionChaptersList: React.FC<ConversionChaptersListProps> = ({
  chapters,
  isConverting,
  currentChapterIndex,
  onConvertChapter
}) => {
  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 pb-4">
        {chapters.map((chapter, index) => (
          <ConversionChapterItem
            key={chapter.id}
            chapter={chapter}
            index={index}
            isConverting={isConverting}
            currentChapterIndex={currentChapterIndex}
            onConvert={onConvertChapter}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConversionChaptersList;
