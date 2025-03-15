
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, MapPin, Network } from "lucide-react";
import { Story } from "@/utils/types";

interface StatsCardProps {
  story: Story | null;
}

export const StatsCard = ({ story }: StatsCardProps) => {
  // 项目统计数据
  const stats = [
    {
      name: "角色",
      value: story?.characters.length || 0,
      icon: <Users className="h-4 w-4" />,
      path: "/characters",
    },
    {
      name: "场景",
      value: story?.locations.length || 0,
      icon: <MapPin className="h-4 w-4" />,
      path: "/locations",
    },
    {
      name: "分支",
      value: story?.scenes.length || 0,
      icon: <Network className="h-4 w-4" />,
      path: "/flow",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>统计</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
                <span>{stat.name}</span>
              </div>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
