
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
        zIndex: 40, // Reduced from 51 to 40
      }
    : {
        left: `${position.x + 380}px`, // 380px accounts for the wider preview (352px) plus some margin
        top: `${position.y}px`,
        position: "fixed" as const,
        zIndex: 40, // Reduced from 100 to 40
        width: "520px",
        minHeight: "625px",
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
