
import React from 'react';
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadStepProps {
  file: File | null;
  isProcessing: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProcessFile: () => void;
}

const FileUploadStep: React.FC<FileUploadStepProps> = ({
  file,
  isProcessing,
  onFileChange,
  onProcessFile
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed rounded-md">
      <Upload className="h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-medium">上传小说文件</h3>
      <p className="text-sm text-muted-foreground text-center">
        支持 .txt 格式，系统将自动按章节分割内容
      </p>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="novel-file">选择文件</Label>
        <Input
          id="novel-file"
          type="file"
          accept=".txt"
          onChange={onFileChange}
        />
      </div>
      
      {file && (
        <p className="text-sm">已选择: {file.name}</p>
      )}
      
      <Button 
        onClick={onProcessFile}
        disabled={!file || isProcessing}
        className="mt-4"
      >
        {isProcessing ? '处理中...' : '处理文件'}
      </Button>
    </div>
  );
};

export default FileUploadStep;
