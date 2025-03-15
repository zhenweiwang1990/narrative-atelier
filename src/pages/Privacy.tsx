
import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto">
          <Link to="/login" className="inline-flex items-center mb-8 text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回登录
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">隐私政策</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-500 mb-6">最后更新日期：2024年6月15日</p>
              
              <p>
                Miss AI（以下简称"我们"）非常重视用户的隐私保护，并严格遵守相关法律法规。
                本隐私政策旨在向您说明我们如何收集、使用、存储、共享和保护您的个人信息，以及您享有的相关权利。
                请您在使用我们的服务前仔细阅读本隐私政策。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. 信息收集</h2>
              <p>
                1.1 您提供的信息：当您注册账号、使用我们的服务、参与问卷调查或联系客服时，
                我们可能会收集您提供的个人信息，如姓名、电话号码、电子邮件地址等。
              </p>
              <p>
                1.2 自动收集的信息：当您使用我们的服务时，我们可能会自动收集某些信息，
                如设备信息、日志信息、位置信息等。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. 信息使用</h2>
              <p>
                我们可能将收集的信息用于以下目的：
                <ul className="list-disc pl-6 mt-2">
                  <li>提供、维护和改进我们的服务；</li>
                  <li>处理您的请求和交易；</li>
                  <li>与您沟通，包括提供客户支持和发送通知；</li>
                  <li>进行数据分析和研究，以改善我们的服务；</li>
                  <li>防止欺诈和增强安全性；</li>
                  <li>遵守法律法规的要求。</li>
                </ul>
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. 信息共享</h2>
              <p>
                除以下情况外，我们不会与任何第三方共享您的个人信息：
                <ul className="list-disc pl-6 mt-2">
                  <li>经您明确同意；</li>
                  <li>为完成合并、收购或资产出售等交易而必须转移的情况；</li>
                  <li>为遵守适用的法律法规、法律程序或政府强制要求；</li>
                  <li>为执行我们的条款和政策，包括调查可能的违规行为；</li>
                  <li>为保护我们、我们的用户或公众的权利、财产或安全。</li>
                </ul>
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. 信息存储与保护</h2>
              <p>
                4.1 我们将采取合理的技术措施和管理措施，保护您的个人信息安全，防止未经授权的访问、公开披露、使用、修改、损坏或丢失。
              </p>
              <p>
                4.2 我们会在法律法规要求的期限内保存您的个人信息，超出上述期限后，我们将删除或匿名化处理您的个人信息。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. 您的权利</h2>
              <p>
                根据适用的法律法规，您可能有权：
                <ul className="list-disc pl-6 mt-2">
                  <li>访问您的个人信息；</li>
                  <li>更正或更新您的个人信息；</li>
                  <li>删除您的个人信息；</li>
                  <li>限制或反对我们处理您的个人信息；</li>
                  <li>数据可携带权；</li>
                  <li>撤回您的同意。</li>
                </ul>
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookie 和类似技术</h2>
              <p>
                我们使用 Cookie 和类似技术来帮助我们提供、保护和改进我们的服务。
                您可以通过浏览器设置来管理 Cookie 的使用，但这可能会影响您使用我们的服务。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. 儿童隐私</h2>
              <p>
                我们的服务不面向16岁以下的儿童。如果我们发现收集了16岁以下儿童的个人信息，
                我们会采取措施尽快删除这些信息。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. 政策更新</h2>
              <p>
                我们可能会不时更新本隐私政策。当本政策发生实质性变更时，
                我们会通过网站公告或其他适当方式通知您。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. 联系我们</h2>
              <p>
                如果您对本隐私政策有任何疑问、意见或建议，
                请通过以下方式与我们联系：privacy@missai.com
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
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                关于我们
              </Link>
              <Link to="/agreement" className="text-sm text-muted-foreground hover:text-primary">
                用户协议
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary font-medium">
                隐私政策
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
