
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { Story } from "@/utils/types";
import StoryDetailsReadOnly from "./StoryDetailsReadOnly";
import StoryDetailsEditForm from "./StoryDetailsEditForm";

interface StoryDetailsProps {
  story: Story;
  onSave: (updatedStory: Partial<Story>) => void;
}

const StoryDetails: React.FC<StoryDetailsProps> = ({ story, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(story?.title || "");
  const [author, setAuthor] = useState(story?.author || "");
  const [description, setDescription] = useState(story?.description || "");
  const [coverPhoto, setCoverPhoto] = useState(story?.coverPhoto || "");
  const [protagonistName, setProtagonistName] = useState(story?.protagonistName || "");
  const [protagonistGender, setProtagonistGender] = useState(story?.protagonistGender || "男");
  const [orientation, setOrientation] = useState(story?.orientation || "hetero");
  const [tags, setTags] = useState(story?.tags || []);

  const handleSave = () => {
    onSave({
      title,
      author,
      description,
      coverPhoto,
      protagonistName,
      protagonistGender,
      orientation,
      tags
    });

    setIsEditing(false);
  };

  return (
    <Card className="md:col-span-1 max-w-[300px]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>剧情详情</CardTitle>
            <CardDescription>基本信息及设置</CardDescription>
          </div>

          {!isEditing ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> 保存
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <StoryDetailsEditForm 
            story={story}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            description={description}
            setDescription={setDescription}
            coverPhoto={coverPhoto}
            setCoverPhoto={setCoverPhoto}
            protagonistName={protagonistName}
            setProtagonistName={setProtagonistName}
            protagonistGender={protagonistGender}
            setProtagonistGender={setProtagonistGender}
            orientation={orientation}
            setOrientation={setOrientation}
            tags={tags}
            setTags={setTags}
          />
        ) : (
          <StoryDetailsReadOnly story={story} />
        )}
      </CardContent>
    </Card>
  );
};

export default StoryDetails;
