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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useStory } from "@/components/Layout";

const generalFormSchema = z.object({
  autosave: z.boolean().default(true),
  darkMode: z.boolean().default(false),
  defaultCharacterColor: z.string().default("#6366f1"),
  defaultLocationColor: z.string().default("#10b981"),
});

const exportFormSchema = z.object({
  includeMetadata: z.boolean().default(true),
  prettyPrint: z.boolean().default(true),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;
type ExportFormValues = z.infer<typeof exportFormSchema>;

const Settings = () => {
  const { story } = useStory();

  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      autosave: true,
      darkMode: false,
      defaultCharacterColor: "#6366f1",
      defaultLocationColor: "#10b981",
    },
  });

  const exportForm = useForm<ExportFormValues>({
    resolver: zodResolver(exportFormSchema),
    defaultValues: {
      includeMetadata: true,
      prettyPrint: true,
    },
  });

  const onGeneralSubmit = (data: GeneralFormValues) => {
    console.log("通用设置已更新:", data);
    // 这里你会将设置保存到本地存储或上下文中
  };

  const onExportSubmit = (data: ExportFormValues) => {
    console.log("导出设置已更新:", data);
    // 这里你会保存导出设置
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">设置</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">通用</TabsTrigger>
          <TabsTrigger value="export">导出选项</TabsTrigger>
          <TabsTrigger value="about">关于</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>通用设置</CardTitle>
              <CardDescription>配置应用程序的一般行为和外观。</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form
                  onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={generalForm.control}
                    name="autosave"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">自动保存</FormLabel>
                          <FormDescription>
                            随着您的工作自动保存更改
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">黑暗模式</FormLabel>
                          <FormDescription>
                            使用应用程序的黑暗主题
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="defaultCharacterColor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            默认角色颜色
                          </FormLabel>
                          <FormDescription>用于新角色的颜色</FormDescription>
                        </div>
                        <FormControl>
                          <Input
                            type="color"
                            className="w-12 h-10"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="defaultLocationColor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            默认场景颜色
                          </FormLabel>
                          <FormDescription>用于新场景的颜色</FormDescription>
                        </div>
                        <FormControl>
                          <Input
                            type="color"
                            className="w-12 h-10"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">保存更改</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>导出设置</CardTitle>
              <CardDescription>配置剧情导出方式</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...exportForm}>
                <form
                  onSubmit={exportForm.handleSubmit(onExportSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={exportForm.control}
                    name="includeMetadata"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            包含元数据
                          </FormLabel>
                          <FormDescription>
                            导出剧情时包含额外的元数据
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={exportForm.control}
                    name="prettyPrint"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">美化打印</FormLabel>
                          <FormDescription>
                            格式化JSON文件使其易于阅读
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">保存更改</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>关于叙事工坊</CardTitle>
              <CardDescription>关于应用程序的信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">版本</h3>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>

              <div>
                <h3 className="font-medium">描述</h3>
                <p className="text-sm text-muted-foreground">
                  叙事工坊是一个交互式剧情创作工具，旨在帮助作家创建具有丰富角色发展和场景管理的分支叙事。
                </p>
              </div>

              <div>
                <h3 className="font-medium">制作</h3>
                <p className="text-sm text-muted-foreground">
                  使用React、Tailwind CSS和shadcn/ui组件创建。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
