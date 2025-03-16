
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { Textarea } from "@/components/ui/textarea";

interface TextMarkerContextMenuProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

const TextMarkerContextMenu: React.FC<TextMarkerContextMenuProps> = ({
  value,
  onChange,
  placeholder,
  className,
  rows = 10
}) => {
  const insertAtCursor = (textArea: HTMLTextAreaElement, textToInsert: string) => {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const text = textArea.value;
    const newText = text.substring(0, start) + textToInsert + text.substring(end);
    
    onChange(newText);
    
    // Set cursor position after insertion (for better UX)
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 0);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
          rows={rows}
        />
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={(e) => {
          const textArea = document.activeElement as HTMLTextAreaElement;
          insertAtCursor(textArea, '<-s->');
        }}>
          插入场景分隔符
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem onClick={(e) => {
          const textArea = document.activeElement as HTMLTextAreaElement;
          insertAtCursor(textArea, '<<选项1||选项2>>');
        }}>
          插入选项标记
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>插入 QTE 标记</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem onClick={(e) => {
              const textArea = document.activeElement as HTMLTextAreaElement;
              insertAtCursor(textArea, '<<QTE1 START>>\n玩家需要快速按下按键序列。\n<<QTE1 END>>');
            }}>
              QTE动作 (按键序列)
            </ContextMenuItem>
            <ContextMenuItem onClick={(e) => {
              const textArea = document.activeElement as HTMLTextAreaElement;
              insertAtCursor(textArea, '<<QTE1 START>>\n玩家需要快速完成方向连击。\n<<QTE1 END>>');
            }}>
              QTE连击 (方向序列)
            </ContextMenuItem>
            <ContextMenuItem onClick={(e) => {
              const textArea = document.activeElement as HTMLTextAreaElement;
              insertAtCursor(textArea, '<<QTE1 START>>\n玩家需要快速完成图案解锁。\n<<QTE1 END>>');
            }}>
              QTE解锁 (图案)
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuItem onClick={(e) => {
          const textArea = document.activeElement as HTMLTextAreaElement;
          insertAtCursor(textArea, '<<DialogueTask START>>\n对话任务内容\n<<DialogueTask END>>');
        }}>
          插入对话任务标记
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TextMarkerContextMenu;
