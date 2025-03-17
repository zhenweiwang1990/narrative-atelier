import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Trophy } from "lucide-react";
import { Honor, GlobalValue } from "@/utils/types";
import { generateId } from "@/utils/storage";
import HonorConditionsEditor from "./HonorConditionsEditor";

interface HonorsListProps {
  honors: Honor[];
  globalValues: GlobalValue[];
  onChange: (honors: Honor[]) => void;
}

const honorCardColors = {
  light: [
    "bg-blue-50 border-blue-200",
    "bg-green-50 border-green-200",
    "bg-purple-50 border-purple-200",
    "bg-amber-50 border-amber-200",
    "bg-rose-50 border-rose-200",
    "bg-teal-50 border-teal-200",
    "bg-indigo-50 border-indigo-200",
    "bg-orange-50 border-orange-200",
  ],
  dark: [
    "dark:bg-blue-950/40 dark:border-blue-800/50",
    "dark:bg-green-950/40 dark:border-green-800/50",
    "dark:bg-purple-950/40 dark:border-purple-800/50",
    "dark:bg-amber-950/40 dark:border-amber-800/50",
    "dark:bg-rose-950/40 dark:border-rose-800/50",
    "dark:bg-teal-950/40 dark:border-teal-800/50",
    "dark:bg-indigo-950/40 dark:border-indigo-800/50",
    "dark:bg-orange-950/40 dark:border-orange-800/50",
  ],
};

const HonorsList: React.FC<HonorsListProps> = ({
  honors: honors,
  globalValues,
  onChange,
}) => {
  const addHonor = () => {
    const newHonor: Honor = {
      id: generateId("honor"),
      name: `成就 ${honors.length + 1}`,
      description: "",
      conditions: [],
    };
    onChange([...honors, newHonor]);
  };

  const updateHonor = (id: string, updates: Partial<Honor>) => {
    const updatedHonors = honors.map((honor) =>
      honor.id === id ? { ...honor, ...updates } : honor
    );
    onChange(updatedHonors);
  };

  const updateHonorConditions = (
    honorId: string,
    conditions: Honor["conditions"]
  ) => {
    const updatedHonors = honors.map((honor) =>
      honor.id === honorId ? { ...honor, conditions } : honor
    );
    onChange(updatedHonors);
  };

  const removeHonor = (id: string) => {
    onChange(honors.filter((honor) => honor.id !== id));
  };

  const getHonorCardColor = (index: number): string => {
    return `${honorCardColors.light[index % honorCardColors.light.length]} ${
      honorCardColors.dark[index % honorCardColors.dark.length]
    }`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">成就管理</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addHonor}
          className="h-8 text-xs flex items-center"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> 添加成就
        </Button>
      </div>

      {honors.length === 0 ? (
        <div className="text-center py-4 text-sm text-muted-foreground border rounded-md p-6">
          尚未定义成就。添加一个成就来奖励玩家的游戏结果。
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {honors.map((h, index) => (
            <Card
              key={h.id}
              className={`p-4 w-[350px] mb-2 ${getHonorCardColor(index)}`}
            >
              <div className="flex gap-2 items-start mb-3">
                <div className="flex-1">
                  <Label htmlFor={`honor-name-${h.id}`} className="text-xs">
                    成就名称
                  </Label>
                  <Input
                    id={`honor-name-${h.id}`}
                    value={h.name}
                    onChange={(e) =>
                      updateHonor(h.id, { name: e.target.value })
                    }
                    className="h-8 text-sm"
                  />
                </div>
                <div className="pt-5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHonor(h.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor={`honor-desc-${h.id}`} className="text-xs">
                  成就描述
                </Label>
                <Input
                  id={`honor-desc-${h.id}`}
                  value={h.description || ""}
                  onChange={(e) =>
                    updateHonor(h.id, { description: e.target.value })
                  }
                  className="h-8 text-sm"
                  placeholder="描述这个成就代表什么..."
                />
              </div>

              <HonorConditionsEditor
                honorId={h.id}
                conditions={h.conditions}
                globalValues={globalValues}
                onChange={(conditions) =>
                  updateHonorConditions(h.id, conditions)
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HonorsList;
