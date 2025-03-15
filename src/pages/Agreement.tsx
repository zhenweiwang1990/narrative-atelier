
import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Agreement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto">
          <Link to="/login" className="inline-flex items-center mb-8 text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回登录
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">用户协议</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-500 mb-6">最后更新日期：2024年6月15日</p>
              
              <p>
                欢迎使用 Miss AI 内容创作平台。本协议是您与 Miss AI（以下简称"我们"）之间关于您使用 Miss AI 服务的法律协议。
                请您仔细阅读以下全部内容。如您使用 Miss AI 服务，视为您已阅读并同意本协议的全部条款。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. 服务内容</h2>
              <p>
                Miss AI 是一个内容创作平台，为用户提供创意写作、内容生成、编辑等服务。
                我们会不断改进和优化我们的服务，包括增加、修改、删除某些功能或引入新的服务。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. 账号注册与安全</h2>
              <p>
                2.1 用户在使用 Miss AI 服务前需要注册账号，并保证所提供的注册信息真实、准确、完整、合法有效。
              </p>
              <p>
                2.2 用户应妥善保管账号信息，不得将账号借给他人使用。因账号管理不善而造成的损失由用户自行承担。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. 用户行为规范</h2>
              <p>
                3.1 用户在使用 Miss AI 服务时，必须遵守中华人民共和国相关法律法规。
              </p>
              <p>
                3.2 用户不得利用 Miss AI 服务从事任何违法或不当的活动，包括但不限于：
                <ul className="list-disc pl-6 mt-2">
                  <li>发布、传播违法信息；</li>
                  <li>侵犯他人知识产权、商业秘密等合法权益；</li>
                  <li>干扰 Miss AI 的正常运营；</li>
                  <li>其他违反法律法规、社会公德的行为。</li>
                </ul>
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. 知识产权</h2>
              <p>
                4.1 Miss AI 服务中的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、数据等，均由 Miss AI 或其他权利人依法拥有相应的知识产权。
              </p>
              <p>
                4.2 用户通过 Miss AI 创作的内容，其知识产权归用户所有。但用户授权 Miss AI 在全球范围内免费使用、复制、修改、改编、出版、翻译、创建衍生作品、传播、表演和展示此等内容，及/或将此等内容并入其他作品中。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. 隐私保护</h2>
              <p>
                我们重视用户的隐私保护，具体隐私政策请参见《隐私政策》。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. 免责声明</h2>
              <p>
                6.1 Miss AI 不对因用户使用服务而产生的任何直接、间接、偶然、特殊及后续的损害承担责任。
              </p>
              <p>
                6.2 对于用户通过 Miss AI 创作的内容，Miss AI 不承担任何法律责任。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. 协议修改</h2>
              <p>
                我们有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。
                本协议条款变更后，如果您继续使用 Miss AI 服务，即视为您已接受修改后的协议。
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. 法律适用与争议解决</h2>
              <p>
                本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
                如发生本协议相关的任何争议，双方应友好协商解决；协商不成的，任何一方均有权将争议提交至人民法院诉讼解决。
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
              <Link to="/agreement" className="text-sm text-muted-foreground hover:text-primary font-medium">
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

export default Agreement;
