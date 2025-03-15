
import React from "react";
import { NarrationElement } from "@/utils/types";

interface NarrationPreviewProps {
  element: NarrationElement;
}

const NarrationPreview: React.FC<NarrationPreviewProps> = ({ element }) => {
  return (
    <div className="p-4">
      <p className="text-sm">{element.text}</p>
    </div>
  );
};

export default NarrationPreview;
