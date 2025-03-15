
import { SceneElement, ElementType, Story, ElementOutcome } from "@/utils/types";
import { generateId } from "@/utils/storage";

// Create element based on type
export const createNewElement = (
  type: ElementType,
  story: Story,
  elementsLength: number
): SceneElement => {
  const newOrder =
    elementsLength > 0
      ? Math.max(...Array.from({ length: elementsLength }, (_, i) => i)) + 1
      : 0;

  switch (type) {
    case "narration":
      return {
        id: generateId("narration"),
        type: "narration",
        order: newOrder,
        text: "Enter narration text here...",
      } as SceneElement;

    case "dialogue":
      return {
        id: generateId("dialogue"),
        type: "dialogue",
        order: newOrder,
        characterId: story.characters[0]?.id || "",
        text: "Enter dialogue text here...",
      } as SceneElement;

    case "thought":
      return {
        id: generateId("thought"),
        type: "thought",
        order: newOrder,
        characterId:
          story.characters.find((c) => c.role === "protagonist")?.id ||
          story.characters[0]?.id ||
          "",
        text: "Enter thought text here...",
      } as SceneElement;

    case "choice":
      return {
        id: generateId("choice"),
        type: "choice",
        order: newOrder,
        text: "输入选项描述",
        options: [
          {
            id: generateId("option"),
            text: "选项 1",
            nextSceneId: "",
          },
        ],
      } as SceneElement;

    case "qte":
      return {
        id: generateId("qte"),
        type: "qte",
        order: newOrder,
        description: "输入 QTE 描述...",
        introText: "Get ready...",
        timeLimit: 3,
        keySequence: "ABC",
        success: {
          sceneId: "",
          transition: "成功了!",
          valueChanges: []
        },
        failure: {
          sceneId: "",
          transition: "失败了!",
          valueChanges: []
        }
      } as SceneElement;

    case "dialogueTask":
      return {
        id: generateId("dialogueTask"),
        type: "dialogueTask",
        order: newOrder,
        goal: "输入对话目标...",
        targetCharacterId:
          story.characters.find((c) => c.role !== "protagonist")?.id || "",
        background: "输入对话背景信息...",
        openingLine: "输入开场白...",
        success: {
          sceneId: "",
          transition: "成功完成任务目标.",
          valueChanges: []
        },
        failure: {
          sceneId: "",
          transition: "未能完成任务目标.",
          valueChanges: []
        }
      } as SceneElement;

    default:
      throw new Error(`Unsupported element type: ${type}`);
  }
};
