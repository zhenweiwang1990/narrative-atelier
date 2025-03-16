
import React from 'react';

const InteractionMarkingGuide: React.FC = () => (
  <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-md mb-2">
    <p className="font-medium mb-1">标注格式：</p>
    <p>- 分隔场景：{"<-s->"}</p>
    <p>- 选项：文本末尾使用 {"<<选项1||选项2>>"}</p>
    <p>- QTE动作：使用 {"<<QTE1 START>>"} 和 {"<<QTE1 END>>"} 包围QTE内容</p>
    <p>- QTE连击：在QTE内容中添加"方向连击"或"连击"等字样</p>
    <p>- QTE解锁：在QTE内容中添加"图案解锁"或"解锁"等字样</p>
    <p>- 对话任务：使用 {"<<DialogueTask START>>"} 和 {"<<DialogueTask END>>"} 包围对话任务内容</p>
  </div>
);

export default InteractionMarkingGuide;
