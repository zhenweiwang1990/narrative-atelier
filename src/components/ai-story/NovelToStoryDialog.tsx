
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Story } from '@/utils/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, RefreshCw, Check, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NovelToStoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story | null;
  setStory: (story: Story) => void;
}

interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations: string[];
  isConverted: boolean;
}

const NovelToStoryDialog: React.FC<NovelToStoryDialogProps> = ({
  isOpen,
  onClose,
  story,
  setStory
}) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

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

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
      setStep(1);
      setChapters([]);
      setFile(null);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
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
        
        // 简单按照章节分割内容（实际项目中可能需要更复杂的逻辑）
        const chapterRegex = /第[一二三四五六七八九十百千万]+章|\d+\./g;
        const parts = content.split(chapterRegex);
        
        // 忽略第一部分（通常是空的或者前言）
        const processedChapters = parts.slice(1).map((part, index) => ({
          id: `chapter-${index + 1}`,
          title: `第 ${index + 1} 章`,
          content: part.trim(),
          annotations: [],
          isConverted: false
        }));
        
        setChapters(processedChapters);
        toast.success('小说处理完成，已分为 ' + processedChapters.length + ' 章');
        handleNextStep();
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('处理小说时出错:', error);
      toast.error('处理小说失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChapterContentChange = (index: number, newContent: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].content = newContent;
    setChapters(updatedChapters);
  };

  const regenerateChapter = async (index: number) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)), 
      {
        loading: '正在重新生成章节...',
        success: '章节重新生成成功',
        error: '生成失败，请重试。',
      }
    );
  };

  const convertToStory = async (index: number) => {
    setCurrentChapterIndex(index);
    setIsConverting(true);
    
    try {
      // TODO: 实际的服务器调用将章节转换为剧情结构
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 假设转换成功
      const updatedChapters = [...chapters];
      updatedChapters[index].isConverted = true;
      setChapters(updatedChapters);
      
      // 检查是否所有章节都已转换
      const allConverted = updatedChapters.every(chapter => chapter.isConverted);
      if (allConverted) {
        setShowConfirmation(true);
      } else {
        toast.success(`章节 ${index + 1} 转换成功`);
      }
    } catch (error) {
      console.error('转换章节时出错:', error);
      toast.error('转换失败，请重试');
    } finally {
      setIsConverting(false);
    }
  };

  const mergeToStory = () => {
    if (story) {
      // 这里应该将转换后的内容合并到现有故事中
      const updatedStory = { ...story };
      // 实际合并逻辑
      
      setStory(updatedStory);
      toast.success('故事已成功合并');
      setShowConfirmation(false);
      onClose();
      setStep(1);
      setChapters([]);
      setFile(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>从小说创建剧情 - 步骤 {step}/3</DialogTitle>
            <DialogDescription>
              {step === 1 && '上传小说文件，系统将自动分割成章节'}
              {step === 2 && '编辑章节内容，添加选项、QTE和对话任务标记'}
              {step === 3 && '逐章节转换为交互式剧情结构'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <Tabs value={`step-${step}`} className="w-full h-full">
              {/* 步骤 1: 上传文件 */}
              <TabsContent value="step-1" className="mt-0 h-full">
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
              </TabsContent>
              
              {/* 步骤 2: 编辑章节 */}
              <TabsContent value="step-2" className="mt-0 h-[60vh]">
                <ScrollArea className="h-full">
                  <div className="space-y-6 pb-4">
                    {chapters.map((chapter, index) => (
                      <div key={chapter.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-md font-medium">{chapter.title}</h3>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => regenerateChapter(index)}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            重新生成
                          </Button>
                        </div>
                        
                        <Textarea
                          value={chapter.content}
                          onChange={(e) => handleChapterContentChange(index, e.target.value)}
                          className="h-48 resize-none"
                        />
                        
                        <div className="text-xs text-muted-foreground">
                          <p>标注格式：</p>
                          <p>- 选项：【选择：选项内容】</p>
                          <p>- QTE：【QTE：描述内容】</p>
                          <p>- 对话任务：【对话：任务内容】</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              {/* 步骤 3: 转换章节 */}
              <TabsContent value="step-3" className="mt-0 h-[60vh]">
                <ScrollArea className="h-full">
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
                          onClick={() => convertToStory(index)}
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
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={handlePreviousStep}>
                上一步
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              disabled={step === 1 && chapters.length === 0}
            >
              {step < 3 ? '下一步' : '完成'}
              {step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认合并故事</AlertDialogTitle>
            <AlertDialogDescription>
              所有章节已成功转换为交互式剧情。是否将转换后的内容合并到当前故事中？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmation(false)}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={mergeToStory}>确认合并</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NovelToStoryDialog;
