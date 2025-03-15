
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Network } from "lucide-react";

export const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>快速操作</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="outline"
          asChild
          className="w-full justify-start"
        >
          <Link to="/characters">
            <Users className="h-4 w-4 mr-2" /> 管理角色
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="w-full justify-start"
        >
          <Link to="/locations">
            <MapPin className="h-4 w-4 mr-2" /> 管理场景
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="w-full justify-start"
        >
          <Link to="/flow">
            <Network className="h-4 w-4 mr-2" /> 编辑剧情流程
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
