
import React from 'react';
import { Chapter } from '@/utils/types';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChapterHeaderContent from './ChapterHeaderContent';
import ChapterContentTabs from './ChapterContentTabs';

interface ChapterItemProps {
  chapter: Chapter;
  onChapterChange: (chapterId: string, field: keyof Chapter, value: string) => void;
  onAIProcess: (chapterId: string) => Promise<void>;
  onMarkingToServer: (chapterId: string) => Promise<void>;
}

const ChapterItem: React.FC<ChapterItemProps> = ({
  chapter,
  onChapterChange,
  onAIProcess,
  onMarkingToServer
}) => {
  const handleTitleChange = (chapterId: string, title: string) => {
    onChapterChange(chapterId, 'title', title);
  };

  return (
    <AccordionItem
      key={chapter.id}
      value={chapter.id}
      className="border rounded-md overflow-hidden"
    >
      <AccordionTrigger className="px-4 py-2 hover:no-underline">
        <ChapterHeaderContent 
          title={chapter.title}
          id={chapter.id}
          isConverted={chapter.isConverted}
          isProcessed={chapter.isProcessed}
          onTitleChange={handleTitleChange}
        />
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4">
        <ChapterContentTabs
          chapter={chapter}
          onChapterChange={onChapterChange}
          onAIProcess={onAIProcess}
          onMarkingToServer={onMarkingToServer}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default ChapterItem;
