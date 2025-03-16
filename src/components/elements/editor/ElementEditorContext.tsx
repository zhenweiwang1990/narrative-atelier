
import { createContext, useContext, ReactNode } from "react";
import { SceneElement, Story } from "@/utils/types";

interface ElementEditorContextType {
  sceneId: string;
  elements: SceneElement[];
  selectedElementId?: string;
  story: Story;
  onSelectElement?: (id: string) => void;
  onAddElement: (type: any) => void;
  onDeleteElement: (id: string) => void;
  onAiGenerate: (id: string) => void;
}

const ElementEditorContext = createContext<ElementEditorContextType | null>(null);

export const ElementEditorProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ElementEditorContextType;
}) => {
  return (
    <ElementEditorContext.Provider value={value}>
      {children}
    </ElementEditorContext.Provider>
  );
};

export const useElementEditor = () => {
  const context = useContext(ElementEditorContext);
  if (!context) {
    throw new Error("useElementEditor must be used within an ElementEditorProvider");
  }
  return context;
};
