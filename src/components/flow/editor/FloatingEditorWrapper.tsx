
import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingEditorWrapperProps {
  children: ReactNode;
  position: { x: number; y: number };
  isOpen: boolean;
  isMobile?: boolean;
  isPopup?: boolean; // New prop for popup mode
}

const FloatingEditorWrapper: React.FC<FloatingEditorWrapperProps> = ({
  children,
  position,
  isOpen,
  isMobile: forceMobile,
  isPopup = false, // Default to false
}) => {
  const isMobileDevice = useIsMobile();
  const isMobile = forceMobile || isMobileDevice;

  if (!isOpen) return null;

  // Adjust position for popup mode, mobile devices, or default position
  let editorStyle;
  
  if (isPopup) {
    // For popup window, use fixed position at the right side
    editorStyle = {
      top: "20px",
      right: "20px",
      position: "fixed" as const,
      zIndex: 30,
      width: "520px",
      minHeight: "625px", // Match mobile preview height
      maxHeight: "calc(100vh - 40px)",
      display: "flex",
      flexDirection: "column" as const,
    };
  } else if (isMobile) {
    // For mobile devices
    editorStyle = {
      top: "80px",
      right: "16px",
      left: "16px",
      position: "fixed" as const,
      zIndex: 30,
      minHeight: "625px", // Match mobile preview height
      maxHeight: "calc(100vh - 100px)",
      display: "flex",
      flexDirection: "column" as const,
    };
  } else {
    // Default position for desktop
    editorStyle = {
      left: `${position.x + 380}px`, // 380px accounts for the wider preview (352px) plus some margin
      top: `${position.y}px`,
      position: "fixed" as const,
      zIndex: 30,
      width: "520px",
      minHeight: "625px", // Match mobile preview height
      maxHeight: "calc(100vh - 40px)",
      display: "flex",
      flexDirection: "column" as const,
    };
  }

  return (
    <Card
      className={cn(
        "shadow-lg border rounded-md overflow-hidden bg-card text-card-foreground border-[hsl(var(--preview-border))]",
        isMobile ? "w-auto" : "",
        isPopup ? "popup-editor" : ""
      )}
      style={{
        ...editorStyle,
        boxShadow: "0 8px 25px hsl(var(--preview-shadow))"
      }}
    >
      {children}
    </Card>
  );
};

export default FloatingEditorWrapper;
