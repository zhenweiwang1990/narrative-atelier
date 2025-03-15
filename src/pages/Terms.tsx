
import React from "react";
import Layout from "@/components/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container max-w-3xl py-12">
        <h1 className="text-3xl font-bold mb-6">用户协议</h1>
        
        <div className="prose">
          <p className="text-lg mb-4">
            欢迎使用Miss AI内容创作平台。在使用我们的服务之前，请仔细阅读以下条款和条件。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. 接受条款</h2>
          <p className="mb-4">
            使用Miss AI内容创作平台表示您已阅读、理解并同意遵守本用户协议的所有条款和条件，以及我们可能不时发布的任何附加条款和政策。如果您不同意这些条款，请不要使用我们的服务。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. 服务描述</h2>
          <p className="mb-4">
            Miss AI内容创作平台提供一系列工具和服务，帮助用户创建、编辑和发布互动故事内容。我们保留随时修改、暂停或终止任何服务的权利，恕不另行通知。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. 用户账户</h2>
          <p className="mb-4">
            3.1 为了使用我们的某些服务，您可能需要创建一个账户。您必须提供准确、完整和最新的信息，并保护您的账户安全。<br /><br />
            3.2 您需要对在您账户下发生的所有活动负责，包括由您授权访问您账户的任何人的活动。<br /><br />
            3.3 如果您发现您的账户有任何未经授权的使用，请立即通知我们。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. 用户内容</h2>
          <p className="mb-4">
            4.1 您保留您在平台上创建的内容的所有权利。<br /><br />
            4.2 通过使用我们的服务上传或创建内容，您授予我们非排他性、全球性、免版税的许可，以使用、复制、修改、创建衍生作品、分发、公开展示和公开执行您的内容，以便我们提供和改进我们的服务。<br /><br />
            4.3 您承诺您上传或创建的内容不会侵犯任何第三方的权利，包括但不限于知识产权和隐私权。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. 禁止行为</h2>
          <p className="mb-4">
            您同意不会：<br /><br />
            5.1 违反任何适用的法律或法规。<br /><br />
            5.2 侵犯他人的权利，包括知识产权。<br /><br />
            5.3 上传或分享任何非法、有害、威胁、辱骂、骚扰、诽谤、淫秽或其他令人反感的内容。<br /><br />
            5.4 尝试损害或干扰我们平台的正常运行。<br /><br />
            5.5 使用我们的服务进行任何未经授权的商业活动。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. 隐私政策</h2>
          <p className="mb-4">
            我们的隐私政策描述了我们如何收集、使用和保护您的个人信息。通过使用我们的服务，您同意我们按照隐私政策处理您的信息。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. 免责声明</h2>
          <p className="mb-4">
            我们的服务按"现状"和"可用"的基础提供，没有任何明示或暗示的保证。我们不保证服务将不间断、及时、安全或无错误，也不保证任何内容的准确性或可靠性。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. 责任限制</h2>
          <p className="mb-4">
            在适用法律允许的最大范围内，我们对任何直接、间接、偶然、特殊、后果性或惩罚性损害不承担责任，包括但不限于利润损失、商誉、使用、数据或其他无形损失。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. 修改条款</h2>
          <p className="mb-4">
            我们保留随时修改这些条款的权利。修改后的条款将在我们的网站上发布，并在发布时立即生效。继续使用我们的服务表示您接受修改后的条款。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. 一般条款</h2>
          <p className="mb-4">
            10.1 这些条款构成您与我们之间关于使用我们服务的完整协议。<br /><br />
            10.2 如果这些条款的任何部分被认定为无效或不可执行，其余部分仍将保持充分的效力。<br /><br />
            10.3 我们未能执行这些条款的任何权利或规定不构成对该权利或规定的放弃。<br /><br />
            10.4 这些条款受中华人民共和国法律管辖。
          </p>
          
          <p className="mt-8 text-sm text-muted-foreground">
            最后更新日期：2023年12月1日
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
