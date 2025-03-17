
# 结果部分组件

该目录包含与处理交互式故事元素的成功和失败结果相关的组件。

## 组件概述

### OutcomeSection

`OutcomeSection.tsx` 是作为结果UI系统门面的主入口点。它根据props确定使用哪种渲染模式，并将任务委托给：
- `SingleOutcomeSection` 用于只需要成功或只需要失败结果的元素
- `DualOutcomeSection` 用于需要同时显示成功和失败结果的元素

它处理共享逻辑：
- 确定要渲染的视图（单一或双重）
- 通过 `useOutcomeHandling` 钩子管理AI对话状态
- 将适当的props传递给子组件

### SingleOutcomeSection

`SingleOutcomeSection.tsx` 为成功或失败结果提供专注视图。当元素只需要显示一种类型的结果时使用。它包括：
- 场景选择
- 过渡文本编辑
- 值变更管理
- AI生成按钮（用于创建分支或结局）

### DualOutcomeSection

`DualOutcomeSection.tsx` 提供成功和失败结果的并排视图。当元素需要两种结果类型时使用，如QTE元素或对话任务。它包括：
- 并行场景选择器
- 并行过渡文本编辑器
- 值变更的两列布局
- 两种结果的AI故事生成

### 支持组件

这些组件处理结果UI的特定部分：

#### SceneSelectSection

`SceneSelectSection.tsx` 提供UI，用于选择当前元素后的场景，选项包括：
- 普通场景选择
- AI辅助分支
- AI辅助结局创建

#### TransitionTextsSection

`TransitionTextsSection.tsx` 提供场景之间叙事过渡的文本输入字段，根据是在单一还是双重视图模式下调整其布局。

#### ValueChangesCollapsible & ValueChangesSection

这些组件管理添加、编辑和删除玩家行动导致的全局值变更的UI。

#### OutcomeAiDialog

`OutcomeAiDialog.tsx` 是用于AI辅助内容生成的对话界面，提供：
- 提示输入
- 场景汇合选择（用于分支）
- 结局类型选择（用于结局）

## 钩子

### useOutcomeHandling

`useOutcomeHandling.ts` 集中管理AI对话的状态，跟踪：
- 对话打开状态
- 对话类型（分支或结局）
- 成功/失败上下文
- 基于场景选择的按钮可见性

### useElementOutcomes

`useElementOutcomes.ts`（在hooks目录中）抽象了元素结果的数据处理逻辑，提供函数以：
- 更新场景ID
- 更新过渡文本
- 管理值变更

## 组件关系

```
OutcomeSection
├── SingleOutcomeSection
│   ├── SceneSelectSection
│   ├── TransitionTextsSection
│   └── ValueChangesCollapsible
│       └── ValueChangesSection
├── DualOutcomeSection
│   ├── SceneSelectSection
│   ├── TransitionTextsSection
│   └── ValueChangesCollapsible (x2)
│       └── ValueChangesSection
└── OutcomeAiDialog
    └── AiStoryDialog
```

## 使用模式

1. **对于QTE和对话任务元素：**
   - 使用完整的 `OutcomeSection`，同时包含成功和失败结果

2. **对于单一结果的元素：**
   - 使用带有 `showSuccessOnly` 或 `showFailureOnly` 属性的 `OutcomeSection`

3. **对于直接控制布局：**
   - 直接使用 `SingleOutcomeSection` 或 `DualOutcomeSection`

4. **对于AI故事生成：**
   - 通过"AI 写支线"和"AI 写结局"按钮访问
   - 或通过场景选择下拉菜单

## 流程控制

结果处理的典型流程是：
1. 元素事件触发成功或失败
2. OutcomeSection确定场景转换
3. 值变更应用于全局状态
4. 显示过渡文本
5. 玩家移动到下一个场景

对于AI辅助生成，流程是：
1. 用户请求AI生成（分支或结局）
2. 对话框出现用于提示输入
3. 选择汇合点（对于分支）或结局类型
4. AI基于输入生成内容
5. 新场景整合到故事流程中
