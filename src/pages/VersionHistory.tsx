
import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, File, FileText, BookText } from "lucide-react";

interface Version {
  id: string;
  version: string;
  publishDate: string;
  sceneCount: number;
  wordCount: number;
  status: "审核中" | "已发布" | "未通过";
}

const VersionHistory: React.FC = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch version history
    const fetchVersions = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockVersions: Version[] = [
        {
          id: "v1",
          version: "1.0.0",
          publishDate: "2023-10-12 14:30",
          sceneCount: 24,
          wordCount: 5683,
          status: "已发布"
        },
        {
          id: "v2",
          version: "0.9.1",
          publishDate: "2023-09-25 09:15",
          sceneCount: 22,
          wordCount: 4932,
          status: "已发布"
        },
        {
          id: "v3",
          version: "0.9.0",
          publishDate: "2023-09-10 17:45",
          sceneCount: 18,
          wordCount: 3845,
          status: "已发布"
        },
        {
          id: "v4",
          version: "0.8.5",
          publishDate: "2023-08-28 11:20",
          sceneCount: 15,
          wordCount: 3102,
          status: "未通过"
        },
        {
          id: "v5",
          version: "0.7.2",
          publishDate: "2023-08-15 16:05",
          sceneCount: 12,
          wordCount: 2674,
          status: "已发布"
        }
      ];
      
      setVersions(mockVersions);
      setLoading(false);
    };
    
    fetchVersions();
  }, []);

  const getStatusBadge = (status: Version["status"]) => {
    switch (status) {
      case "审核中":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">审核中</Badge>;
      case "已发布":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">已发布</Badge>;
      case "未通过":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">未通过</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">版本历史</h1>
        <p className="text-muted-foreground">
          查看剧情发布历史记录和发布状态
        </p>
      </div>

      <Card className="border shadow-sm">
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>版本号</TableHead>
                  <TableHead>发布日期</TableHead>
                  <TableHead className="text-right">场景数量</TableHead>
                  <TableHead className="text-right">字数</TableHead>
                  <TableHead className="text-right">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versions.map((version) => (
                  <TableRow key={version.id} className="cursor-pointer hover:bg-muted/60">
                    <TableCell className="font-medium">{version.version}</TableCell>
                    <TableCell className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      {version.publishDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <FileText className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        {version.sceneCount}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <BookText className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        {version.wordCount}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {getStatusBadge(version.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default VersionHistory;
