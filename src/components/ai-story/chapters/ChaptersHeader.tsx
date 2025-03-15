
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Upload, Sparkles } from "lucide-react";

interface ChaptersHeaderProps {
  onAddChapter: () => void;
  onUploadClick: () => void;
  onAICreateClick: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
  onProcessFile: () => void;
  file: File | null;
}

const ChaptersHeader: React.FC<ChaptersHeaderProps> = ({
  onAddChapter,
  onUploadClick,
  onAICreateClick,
  onFileUpload,
  isProcessing,
  onProcessFile,
  file
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onAICreateClick}
      >
        <Sparkles className="h-4 w-4 mr-2" />
        AI创作
      </Button>
      
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={onAddChapter}
        >
          <Plus className="h-4 w-4 mr-2" />
          新增章节
        </Button>
      </div>
      
      <div className="relative">
        <Input
          id="novel-file"
          type="file"
          accept=".txt"
          onChange={onFileUpload}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={onUploadClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          上传文件
        </Button>
      </div>
      
      {file && (
        <Button
          size="sm"
          onClick={onProcessFile}
          disabled={isProcessing}
        >
          {isProcessing ? '处理中...' : '处理文件'}
        </Button>
      )}
    </div>
  );
};

export default ChaptersHeader;
