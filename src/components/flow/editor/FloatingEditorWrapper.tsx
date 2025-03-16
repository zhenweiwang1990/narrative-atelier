
import React, { ReactNode, forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingEditorWrapperProps {
  children: ReactNode;
  position: { x: number; y: number };
  isOpen: boolean;
  isMobile?: boolean;
}

const FloatingEditorWrapper = forwardRef<HTMLDivElement, FloatingEditorWrapperProps>(({
  children,
  position,
  isOpen,
  isMobile: forceMobile,
}, ref) => {
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
        zIndex: 30, // Reduced from 40 to 30
        maxHeight: "calc(100vh - 100px)", // Set max height for mobile
        display: "flex",
        flexDirection: "column" as const,
      }
    : {
        left: `${position.x}px`, // No longer adding the 380px offset here - position is passed directly
        top: `${position.y}px`,
        position: "fixed" as const,
        zIndex: 30, // Reduced from 40 to 30
        width: "520px",
        maxHeight: "calc(100vh - 40px)", // Set max height for desktop
        display: "flex",
        flexDirection: "column" as const,
      };

  return (
    <Card
      ref={ref}
      className={cn(
        "shadow-lg border rounded-md overflow-hidden",
        isMobile ? "w-auto" : ""
      )}
      style={editorStyle}
    >
      {children}
    </Card>
  );
});

FloatingEditorWrapper.displayName = "FloatingEditorWrapper";

export default FloatingEditorWrapper;
