
import React from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface InteractionMarkingNavProps {
  handlePrevious: () => void;
  handleNext: () => void;
}

const InteractionMarkingNav: React.FC<InteractionMarkingNavProps> = ({
  handlePrevious,
  handleNext
}) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="outline"
        onClick={handlePrevious}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回上一步
      </Button>
      
      <Button onClick={handleNext}>
        下一步：剧情转换
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default InteractionMarkingNav;
