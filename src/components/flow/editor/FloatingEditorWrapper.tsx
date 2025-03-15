
import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingEditorWrapperProps {
  children: ReactNode;
  position: { x: number; y: number };
  isOpen: boolean;
  isMobile?: boolean;
}

const FloatingEditorWrapper: React.FC<FloatingEditorWrapperProps> = ({
  children,
  position,
  isOpen,
  isMobile: forceMobile,
}) => {
  const isMobileDevice = useIsMobile();
  const isMobile = forceMobile || isMobileDevice;

  if (!isOpen) return null;

  // Adjust position for mobile devices
  const editorStyle = isMobile
    ? {
        top: "80px",
        right: "16px",
        left: "16px",
        position: "fixed" as const,
        zIndex: 51,
      }
    : {
        left: `${position.x + 290}px`, // 290px is approximately the width of the preview + some margin
        top: `${position.y}px`,
        position: "fixed" as const,
        zIndex: 90, // 增加到90，确保下拉菜单不会被遮挡
        width: "480px", // Increased from 400px to 480px
        minHeight: "625px", // 125% of 500px
      };

  return (
    <Card
      className={cn(
        "shadow-lg border rounded-md overflow-hidden",
        isMobile ? "w-auto" : ""
      )}
      style={editorStyle}
    >
      {children}
    </Card>
  );
};

export default FloatingEditorWrapper;
