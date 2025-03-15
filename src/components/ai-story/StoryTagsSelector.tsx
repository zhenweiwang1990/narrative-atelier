
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const STORY_TAGS = [
  '现代言情', '古代言情', '校园青春', '耽美百合', '先婚后爱', '霸道总裁', 
  '仙侠幻情', '禁忌之恋', '双向奔赴', '都市爱情', '家庭伦理', '欢喜冤家', 
  '娱乐圈', '相爱相杀', '强强联合', '契约婚姻', '巧取豪夺', '熟男熟女', 
  '重生复仇', '暧昧', '豪门恩怨', '追妻火葬场', '强制爱', '养成', '甜宠', 
  '救赎', '暗恋', '虐恋', '宠妻', '纯爱', '重逢', '宫斗', '穿越', '悬疑', '狗血'
];

interface StoryTagsSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const StoryTagsSelector: React.FC<StoryTagsSelectorProps> = ({ 
  selectedTags,
  onChange
}) => {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <ScrollArea className="h-40">
      <div className="flex flex-wrap gap-2 p-1">
        {STORY_TAGS.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`cursor-pointer ${selectedTags.includes(tag) ? 'bg-primary' : 'hover:bg-primary/10'}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  );
};

export default StoryTagsSelector;
