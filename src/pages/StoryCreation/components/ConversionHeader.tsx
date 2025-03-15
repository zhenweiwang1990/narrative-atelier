
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConversionHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">小说剧情创作 - 步骤 3：剧情转换</h1>
        <Button onClick={() => navigate('/')} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回概览
        </Button>
      </div>
      <p className="text-muted-foreground">
        逐章节转换为交互式剧情结构
      </p>
    </div>
  );
};

export default ConversionHeader;
