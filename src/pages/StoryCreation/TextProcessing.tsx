
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Text } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextMarkerContextMenu from "@/components/ai-story/chapters/TextMarkerContextMenu";

const TextProcessing = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chapters, setChapters] = useState<{id: string; title: string; content: string}[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/plain') {
        toast.error('请上传 txt 格式的文件');
        return;
      }
      setFile(selectedFile);
    }
  };

  const processNovel = async () => {
    if (!file) {
      toast.error('请先上传小说文件');
      return;
    }

    setIsProcessing(true);

    try {
      // 模拟文件处理和章节分割
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // 简单按照章节分割内容
        const chapterRegex = /第[一二三四五六七八九十百千万]+章|\d+\./g;
        const parts = content.split(chapterRegex);
        
        // 忽略第一部分（通常是空的或者前言）
        const processedChapters = parts.slice(1).map((part, index) => ({
          id: `chapter-${index + 1}`,
          title: `第 ${index + 1} 章`,
          content: part.trim()
        }));
        
        setChapters(processedChapters);
        toast.success('小说处理完成，已分为 ' + processedChapters.length + ' 章');

        // 存储到 sessionStorage 以便在下一步使用
        sessionStorage.setItem('storyChapters', JSON.stringify(processedChapters));
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('处理小说时出错:', error);
      toast.error('处理小说失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    if (chapters.length === 0) {
      toast.error('请先处理小说文件');
      return;
    }
    navigate('/story-creation/interaction-marking');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">小说剧情创作 - 步骤 1：文本加工</h1>
          <Button onClick={() => navigate('/')} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回概览
          </Button>
        </div>
        <p className="text-muted-foreground">
          上传小说文件，系统将自动分割成章节
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>上传文件</CardTitle>
            <CardDescription>支持 .txt 格式，系统将自动按章节分割内容</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed rounded-md">
              <Text className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">上传小说文件</h3>
              
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="novel-file">选择文件</Label>
                <Input
                  id="novel-file"
                  type="file"
                  accept=".txt"
                  onChange={handleFileChange}
                />
              </div>
              
              {file && (
                <p className="text-sm">已选择: {file.name}</p>
              )}
              
              <Button 
                onClick={processNovel}
                disabled={!file || isProcessing}
                className="mt-4"
              >
                {isProcessing ? '处理中...' : '处理文件'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {chapters.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>章节预览</CardTitle>
              <CardDescription>处理完成，共 {chapters.length} 章</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6 pb-4">
                  {chapters.map((chapter) => (
                    <div key={chapter.id} className="space-y-2">
                      <h3 className="text-md font-medium">{chapter.title}</h3>
                      <div className="p-3 bg-muted/20 rounded-md">
                        <p className="text-sm">{chapter.content.substring(0, 200)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleNext}
          disabled={chapters.length === 0}
        >
          下一步：互动标记
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TextProcessing;
