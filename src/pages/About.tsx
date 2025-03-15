
import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto">
          <Link to="/login" className="inline-flex items-center mb-8 text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回登录
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">关于我们</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg">
                Miss AI 是一个专注于内容创作的平台，致力于为创作者提供高效、智能的创作工具。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">我们的使命</h2>
              <p>
                我们的使命是通过人工智能技术赋能创作者，让内容创作变得更加轻松和高效。
                我们相信，创意是人类最宝贵的资源之一，而我们的目标就是释放这些创意的潜力。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">我们的团队</h2>
              <p>
                我们的团队由一群热爱技术和创意的人组成。我们来自不同的背景，但都有一个共同的目标：
                创造出能够改变内容创作方式的产品。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">联系我们</h2>
              <p>
                如果您有任何问题或建议，请随时联系我们：
                <br />
                电子邮件：contact@missai.com
                <br />
                地址：中国北京市海淀区中关村大街1号
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <span>©2024 Miss AI</span>
              <span className="mx-2">·</span>
              <a 
                href="https://beian.miit.gov.cn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary"
              >
                ICP备案 123456789号
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
            
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary font-medium">
                关于我们
              </Link>
              <Link to="/agreement" className="text-sm text-muted-foreground hover:text-primary">
                用户协议
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                隐私政策
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
