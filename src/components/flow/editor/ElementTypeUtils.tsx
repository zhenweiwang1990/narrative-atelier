
import { ElementType } from "@/utils/types";

export const getElementColorClass = (type: ElementType) => {
  switch (type) {
    case 'narration': return 'bg-gray-400';
    case 'dialogue': return 'bg-blue-400';
    case 'thought': return 'bg-purple-400';
    case 'choice': return 'bg-amber-400';
    case 'qte': return 'bg-red-400';
    case 'dialogueTask': return 'bg-green-400';
  }
};

export const getElementTypeLabel = (type: ElementType) => {
  switch (type) {
    case 'narration': return '旁';
    case 'dialogue': return '话';
    case 'thought': return '想';
    case 'choice': return '选';
    case 'qte': return '游';
    case 'dialogueTask': return '任';
  }
};
