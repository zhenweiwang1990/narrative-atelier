import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Book,
  Pen,
  User,
  MapPin,
  GitBranch,
  Database,
  Settings,
} from "lucide-react";

const Help = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">使用帮助</h1>
        <p className="text-muted-foreground mt-2">
          Miss AI 互动剧情编辑器的详细使用指南和功能介绍
        </p>
      </div>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="getting-started">入门指南</TabsTrigger>
          <TabsTrigger value="features">功能介绍</TabsTrigger>
          <TabsTrigger value="advanced">高级技巧</TabsTrigger>
          <TabsTrigger value="faq">常见问题</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>欢迎使用Miss AI 互动剧情编辑器</CardTitle>
              <CardDescription>交互式剧情编辑器入门指南</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  什么是Miss AI 互动剧情编辑器？
                </h3>
                <p>
                  Miss AI 互动剧情编辑器
                  是一款专为创作互动式剧情设计的编辑工具，您可以创建具有分支选择、角色对话和场景切换的沉浸式故事体验。
                </p>
              </div>

              <div className="space-y-2 border-t pt-4">
                <h3 className="text-lg font-semibold">快速开始</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>注册并登录您的账户</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>在左侧菜单中查看示例剧情或创建新剧情</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>
                      使用各个功能模块（剧情、角色、地点、流程等）编辑您的交互式剧情
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>保存您的工作，内容会自动保存到您的账户中</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">5.</span>
                    <span>
                      通过导出功能将剧情导出为 JSON 文件，以便后续使用或共享
                    </span>
                  </li>
                </ol>
              </div>

              <div className="space-y-2 border-t pt-4">
                <h3 className="text-lg font-semibold">基本概念</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-2">
                    <Book className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <span className="font-medium">剧情：</span>
                      <span>编辑剧情中的对话、旁白和选项内容</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <span className="font-medium">角色：</span>
                      <span>管理剧情中出现的人物角色及其信息</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <span className="font-medium">地点：</span>
                      <span>创建剧情中的场景发生地点</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Database className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <span className="font-medium">全局变量：</span>
                      <span>设置影响剧情发展的变量和状态</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GitBranch className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <span className="font-medium">流程：</span>
                      <span>可视化编辑剧情的分支和流程</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>功能模块详解</CardTitle>
              <CardDescription>
                详细了解Miss AI 互动剧情编辑器的各个功能模块
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Book className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">剧情编辑</h3>
                </div>
                <div className="pl-8 space-y-3">
                  <p>剧情是交互式故事的核心部分，包含以下元素：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <span className="font-medium">对话 (Dialogue)：</span>
                      角色之间的对话内容
                    </li>
                    <li>
                      <span className="font-medium">旁白 (Narration)：</span>
                      剧情背景描述和场景说明
                    </li>
                    <li>
                      <span className="font-medium">内心独白 (Thought)：</span>
                      角色的内心想法
                    </li>
                    <li>
                      <span className="font-medium">选项 (Choice)：</span>
                      读者可以做出的选择，影响剧情走向
                    </li>
                  </ul>
                  <p>
                    在剧情编辑页面，您可以通过添加、删除和排序这些元素来构建您的故事。
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">角色管理</h3>
                </div>
                <div className="pl-8 space-y-3">
                  <p>在角色页面，您可以：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>创建新角色并设置其基本信息</li>
                    <li>上传角色图片和头像</li>
                    <li>编写角色背景故事</li>
                    <li>设置角色之间的关系</li>
                  </ul>
                  <p>角色信息会在剧情中用于对话和选项展示。</p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">地点系统</h3>
                </div>
                <div className="pl-8 space-y-3">
                  <p>地点系统用于管理剧情发生的场景：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>创建不同的地点和场景</li>
                    <li>上传场景背景图片</li>
                    <li>为场景添加详细描述</li>
                    <li>关联场景和剧情片段</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">全局变量</h3>
                </div>
                <div className="pl-8 space-y-3">
                  <p>全局变量系统允许您：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>创建影响剧情发展的变量（如好感度、任务进度等）</li>
                    <li>在剧情选项中设置变量变化</li>
                    <li>基于变量值创建条件分支</li>
                  </ul>
                  <p>通过全局变量，您可以创建更加复杂和个性化的剧情体验。</p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">流程编辑</h3>
                </div>
                <div className="pl-8 space-y-3">
                  <p>流程编辑器是一个可视化工具，帮助您：</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>直观地查看整个剧情的结构</li>
                    <li>管理不同场景之间的连接和转换</li>
                    <li>创建复杂的分支剧情</li>
                    <li>预览剧情流程和可能的路径</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>高级技巧</CardTitle>
              <CardDescription>
                掌握这些技巧，创作更加精彩的互动剧情
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">有效利用变量系统</h3>
                <div className="pl-4 space-y-2">
                  <p>变量系统是创建复杂剧情的核心：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>使用变量记录角色之间的好感度</li>
                    <li>通过变量追踪关键剧情选择</li>
                    <li>根据变量值设置条件情节触发</li>
                    <li>使用变量创建物品收集系统</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">剧情结构设计</h3>
                <div className="pl-4 space-y-2">
                  <p>设计有效的互动剧情结构：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>设计"漏斗式"剧情，让不同选择最终汇聚到关键节点</li>
                    <li>使用"枢纽场景"连接不同剧情线</li>
                    <li>平衡自由度和开发复杂度</li>
                    <li>为关键剧情节点设计多种可能的结果</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">优化用户体验</h3>
                <div className="pl-4 space-y-2">
                  <p>让读者的体验更加流畅：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>确保每个选择都有明确的后果</li>
                    <li>避免只有唯一"正确"路径的剧情设计</li>
                    <li>使用变量系统创建"记忆"效果，让角色记住之前的选择</li>
                    <li>为不同选择路径设计独特的内容奖励</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">导入/导出和备份</h3>
                <div className="pl-4 space-y-2">
                  <p>保护您的创作内容：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>定期导出您的剧情备份</li>
                    <li>使用不同的文件名进行版本控制</li>
                    <li>在进行重大更改前导出备份版本</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>常见问题</CardTitle>
              <CardDescription>使用过程中的常见疑问和解答</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 divide-y">
              <div className="space-y-2 pb-4">
                <h3 className="font-semibold">如何保存我的剧情？</h3>
                <p>
                  您的剧情会自动保存到您的账户中。也可以点击左侧菜单中的"保存"按钮手动保存。
                  此外，您可以使用"导出"功能将剧情导出为JSON文件，以便在本地保存备份。
                </p>
              </div>

              <div className="space-y-2 py-4">
                <h3 className="font-semibold">如何创建分支剧情？</h3>
                <p>
                  使用"选项"元素可以创建分支。在选项中，您可以为每个选项设置跳转到的场景ID，
                  从而构建不同的剧情分支。在流程编辑器中，您可以直观地查看和管理这些分支。
                </p>
              </div>

              <div className="space-y-2 py-4">
                <h3 className="font-semibold">
                  如何给剧情添加背景音乐或音效？
                </h3>
                <p>
                  目前版本暂不支持直接添加音频。您可以在旁白或对话元素中添加描述性文字，
                  说明此时应该播放什么音乐或音效，作为后续制作的参考。
                </p>
              </div>

              <div className="space-y-2 py-4">
                <h3 className="font-semibold">是否可以添加图片或视频？</h3>
                <p>
                  您可以为角色添加头像和全身图，为地点添加背景图。
                  目前不支持在具体剧情元素中直接插入图片或视频内容。
                </p>
              </div>

              <div className="space-y-2 py-4">
                <h3 className="font-semibold">如何导入其他人创建的剧情？</h3>
                <p>
                  点击左侧菜单中的"导入"按钮，选择一个有效的JSON格式剧情文件即可导入。
                  导入后，剧情将保存到您的账户中，您可以进行编辑和修改。
                </p>
              </div>

              <div className="space-y-2 pt-4">
                <h3 className="font-semibold">我可以在手机上使用吗？</h3>
                <p>
                  Miss AI 互动剧情编辑器
                  支持响应式设计，可以在手机上使用，但为了获得最佳体验，
                  我们建议使用平板电脑或电脑等更大屏幕的设备进行剧情编辑。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
