
import React from 'react';
import { FileText } from "lucide-react";

const EmptyChaptersState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
      <FileText className="h-12 w-12 mb-4" />
      <h3 className="text-lg font-medium">尚无章节</h3>
      <p className="max-w-md mt-2">
        创建新章节开始您的剧情创作，或者上传小说文件自动分割章节。
      </p>
    </div>
  );
};

export default EmptyChaptersState;
