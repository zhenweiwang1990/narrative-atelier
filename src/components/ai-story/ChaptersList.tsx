
import React, { useState } from 'react';
import { Chapter, Story } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Upload, Sparkles, Check, RefreshCw, Save, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SimpleIdeaDialog from './SimpleIdeaDialog';
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

interface ChaptersListProps {
  story: Story;
  setStory: (story: Story) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ story, setStory }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [isShowSimpleIdeaDialog, setIsShowSimpleIdeaDialog] = useState(false);
  const [showMergeConfirm, setShowMergeConfirm] = useState(false);
  
  // Initialize chapters if they don't exist
  const chapters = story.chapters || [];
  
  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: `第 ${chapters.length + 1} 章`,
      originalContent: '',
      isProcessed: false,
      isConverted: false
    };
    
    setStory({
      ...story,
      chapters: [...chapters, newChapter]
    });
    
    setSelectedChapterId(newChapter.id);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/plain') {
        toast.error('请上传 txt 格式的文件');
        return;
      }
      setFile(selectedFile);
    }
  };
  
  const processNovelFile = async () => {
    if (!file) {
      toast.error('请先上传小说文件');
      return;
    }

    setIsProcessing(true);

    try {
      // 模拟文件处理和章节分割
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // 简单按照章节分割内容
        const chapterRegex = /第[一二三四五六七八九十百千万]+章|\d+\./g;
        const parts = content.split(chapterRegex);
        
        // 忽略第一部分（通常是空的或者前言）
        const processedChapters = parts.slice(1).map((part, index) => ({
          id: `chapter-${Date.now()}-${index}`,
          title: `第 ${chapters.length + index + 1} 章`,
          originalContent: part.trim(),
          isProcessed: false,
          isConverted: false
        }));
        
        // 添加新章节到现有章节列表
        setStory({
          ...story,
          chapters: [...chapters, ...processedChapters]
        });
        
        toast.success(`成功导入 ${processedChapters.length} 个章节`);
        setFile(null);
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('处理小说时出错:', error);
      toast.error('处理小说失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleChapterChange = (chapterId: string, field: keyof Chapter, value: string) => {
    const updatedChapters = chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, [field]: value } 
        : chapter
    );
    
    setStory({
      ...story,
      chapters: updatedChapters
    });
  };
  
  const handleAIProcess = async (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.originalContent) {
      toast.error('该章节内容为空，无法处理');
      return;
    }
    
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          // 模拟 AI 处理
          const processedContent = `这是 AI 处理后的主线剧情内容。\n\n${chapter.originalContent.substring(0, 100)}...\n\n这里是处理后的剧情内容示例。`;
          
          const updatedChapters = chapters.map(c => 
            c.id === chapterId 
              ? { ...c, mainStoryContent: processedContent, isProcessed: true } 
              : c
          );
          
          setStory({
            ...story,
            chapters: updatedChapters
          });
          
          resolve();
        }, 1500);
      }),
      {
        loading: 'AI 正在处理章节内容...',
        success: '处理完成！',
        error: '处理失败，请重试',
      }
    );
  };
  
  const handleMarkingToServer = async (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.markedContent) {
      toast.error('互动标记内容为空，无法处理');
      return;
    }
    
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          const updatedChapters = chapters.map(c => 
            c.id === chapterId 
              ? { ...c, isConverted: true } 
              : c
          );
          
          setStory({
            ...story,
            chapters: updatedChapters
          });
          
          setShowMergeConfirm(true);
          resolve();
        }, 1500);
      }),
      {
        loading: 'AI 正在转换互动标记...',
        success: '转换完成！',
        error: '转换失败，请重试',
      }
    );
  };
  
  const handleMergeToStory = () => {
    toast.success('已成功将章节内容合并到剧情流程中');
    setShowMergeConfirm(false);
  };
  
  return (
    <>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>剧情章节</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsShowSimpleIdeaDialog(true)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI创作
            </Button>
            
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddChapter}
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
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('novel-file')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                上传文件
              </Button>
            </div>
            
            {file && (
              <Button
                size="sm"
                onClick={processNovelFile}
                disabled={isProcessing}
              >
                {isProcessing ? '处理中...' : '处理文件'}
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-[calc(100vh-13rem)]">
            {chapters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-medium">尚无章节</h3>
                <p className="max-w-md mt-2">
                  创建新章节开始您的剧情创作，或者上传小说文件自动分割章节。
                </p>
              </div>
            ) : (
              <Accordion
                type="single"
                collapsible
                value={selectedChapterId || undefined}
                onValueChange={setSelectedChapterId}
                className="space-y-2"
              >
                {chapters.map((chapter) => (
                  <AccordionItem
                    key={chapter.id}
                    value={chapter.id}
                    className="border rounded-md overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-2 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <span className="font-medium">{chapter.title}</span>
                          {chapter.isConverted && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-800 dark:text-green-100">
                              已转换
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {chapter.isConverted && <Check className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-4 pb-4">
                      <Tabs defaultValue="original">
                        <TabsList className="mb-4">
                          <TabsTrigger value="original">原文</TabsTrigger>
                          <TabsTrigger value="mainStory" disabled={!chapter.isProcessed}>文本剧情</TabsTrigger>
                          <TabsTrigger value="interaction" disabled={!chapter.isProcessed}>互动标记</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="original" className="space-y-4">
                          <Textarea
                            rows={10}
                            value={chapter.originalContent}
                            onChange={(e) => handleChapterChange(chapter.id, 'originalContent', e.target.value)}
                            className="w-full resize-none"
                            placeholder="输入章节内容..."
                          />
                          
                          <div className="flex justify-end">
                            <Button 
                              onClick={() => handleAIProcess(chapter.id)}
                              disabled={!chapter.originalContent}
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              AI文本处理
                            </Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="mainStory" className="space-y-4">
                          <Textarea
                            rows={10}
                            value={chapter.mainStoryContent || ''}
                            onChange={(e) => handleChapterChange(chapter.id, 'mainStoryContent', e.target.value)}
                            className="w-full resize-none"
                            placeholder="AI 处理后的主线剧情会显示在这里..."
                          />
                        </TabsContent>
                        
                        <TabsContent value="interaction" className="space-y-4">
                          <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-md mb-2">
                            <p className="font-medium mb-1">标注格式：</p>
                            <p>- 分隔场景：【场景：场景名称】</p>
                            <p>- 选项：【选择：选项内容】</p>
                            <p>- QTE：【QTE：描述内容】</p>
                            <p>- 对话任务：【对话：任务内容】</p>
                          </div>
                          
                          <Textarea
                            rows={10}
                            value={chapter.markedContent || chapter.mainStoryContent || ''}
                            onChange={(e) => handleChapterChange(chapter.id, 'markedContent', e.target.value)}
                            className="w-full resize-none"
                            placeholder="在这里添加互动标记..."
                          />
                          
                          <div className="flex justify-end">
                            <Button 
                              onClick={() => handleMarkingToServer(chapter.id)}
                              disabled={!chapter.markedContent && !chapter.mainStoryContent}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              标记入库
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      
      <SimpleIdeaDialog
        isOpen={isShowSimpleIdeaDialog}
        onClose={() => setIsShowSimpleIdeaDialog(false)}
        story={story}
        setStory={setStory}
      />
      
      <AlertDialog open={showMergeConfirm} onOpenChange={setShowMergeConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认合并章节内容</AlertDialogTitle>
            <AlertDialogDescription>
              章节内容已成功转换为互动剧情结构。是否将其合并到当前剧情流程中？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowMergeConfirm(false)}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleMergeToStory}>确认合并</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChaptersList;
