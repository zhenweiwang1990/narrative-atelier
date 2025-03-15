
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import ConversionHeader from "./components/ConversionHeader";
import ConversionChaptersList from "./components/ConversionChaptersList";
import { useStoryConversion } from "@/hooks/story-creation/useStoryConversion";

const StoryConversion = () => {
  const navigate = useNavigate();
  const {
    chapters,
    isConverting,
    currentChapterIndex,
    showConfirmation,
    setShowConfirmation,
    convertToStory,
    mergeToStory,
    hasChapters
  } = useStoryConversion();

  const handlePrevious = () => {
    navigate('/story-creation/interaction-marking');
  };

  if (!hasChapters) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p>正在加载章节数据...</p>
        <Button onClick={handlePrevious} className="mt-4">
          返回上一步
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <ConversionHeader />

        <Card>
          <CardHeader>
            <CardTitle>章节转换</CardTitle>
            <CardDescription>
              每章节都会独立转换为交互式剧情，请逐个转换
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConversionChaptersList
              chapters={chapters}
              isConverting={isConverting}
              currentChapterIndex={currentChapterIndex}
              onConvertChapter={convertToStory}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回上一步
          </Button>
        </div>
      </div>

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

export default StoryConversion;
