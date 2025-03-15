
import React from "react";
import { Layout } from "@/components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container max-w-3xl py-12">
        <h1 className="text-3xl font-bold mb-6">关于我们</h1>
        
        <div className="prose">
          <p className="text-lg mb-4">
            Miss AI 内容创作平台是一个专注于帮助创作者利用人工智能技术创建高质量互动内容的平台。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">我们的使命</h2>
          <p className="mb-4">
            我们的使命是赋能创作者，让每个人都能轻松创建沉浸式的互动故事体验，无需专业的编程知识或大量资源投入。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">平台特色</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>直观的可视化故事创作流程</li>
            <li>强大的AI辅助内容创作工具</li>
            <li>丰富的角色和场景定制选项</li>
            <li>多样化的互动元素和选择支持</li>
            <li>完整的测试和发布功能</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">我们的团队</h2>
          <p className="mb-4">
            我们的团队由一群热爱创作和技术的专业人士组成，包括游戏设计师、AI专家、UI/UX设计师和软件工程师。我们共同致力于打造最佳的创作体验。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">联系我们</h2>
          <p className="mb-4">
            如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们：
          </p>
          <p className="mb-4">
            邮箱：contact@missai.com<br />
            电话：021-12345678<br />
            地址：上海市浦东新区张江高科技园区
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
