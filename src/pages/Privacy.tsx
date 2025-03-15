
import React from "react";
import { Layout } from "@/components/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container max-w-3xl py-12">
        <h1 className="text-3xl font-bold mb-6">隐私政策</h1>
        
        <div className="prose">
          <p className="text-lg mb-4">
            本隐私政策描述了Miss AI内容创作平台如何收集、使用和保护您的个人信息。我们尊重您的隐私，并致力于保护您的个人数据。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. 信息收集</h2>
          <p className="mb-4">
            我们可能收集以下类型的信息：
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>个人识别信息：如姓名、电子邮件地址、电话号码、用户名和密码</li>
            <li>账单信息：如果您使用我们的付费服务</li>
            <li>使用数据：关于您如何使用我们的平台和服务的信息</li>
            <li>设备信息：如IP地址、浏览器类型和操作系统</li>
            <li>内容数据：您在我们平台上创建或上传的内容</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. 信息使用</h2>
          <p className="mb-4">
            我们可能将收集的信息用于以下目的：
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>提供、维护和改进我们的服务</li>
            <li>处理您的交易和管理您的账户</li>
            <li>发送技术通知、更新、安全警报和支持信息</li>
            <li>回应您的请求、问题和反馈</li>
            <li>监控和分析使用趋势和活动</li>
            <li>保护我们的平台安全并防止欺诈行为</li>
            <li>遵守法律义务</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. 信息共享</h2>
          <p className="mb-4">
            我们不会出售您的个人信息。我们可能在以下情况下共享您的信息：
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>与为我们提供服务的供应商和服务提供商共享</li>
            <li>如果我们认为有必要遵守适用法律或法律程序</li>
            <li>为了保护我们的权利、财产或安全，以及我们的用户或公众的权利、财产或安全</li>
            <li>在公司交易（如合并、收购或资产出售）的情况下</li>
            <li>在您同意的情况下</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. 数据安全</h2>
          <p className="mb-4">
            我们采取合理的措施来保护您的个人信息不被未经授权的访问、使用或披露。然而，没有任何数据传输或存储系统是100%安全的。如果您有理由相信您与我们的互动不再安全，请立即通知我们。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. 您的权利</h2>
          <p className="mb-4">
            取决于您所在的地区，您可能有权：
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>访问您的个人信息</li>
            <li>更正不准确的数据</li>
            <li>删除您的个人信息</li>
            <li>限制或反对处理您的数据</li>
            <li>数据可携带性</li>
            <li>撤回同意</li>
          </ul>
          <p className="mb-4">
            如果您想行使这些权利，请通过我们的联系信息与我们联系。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. 儿童隐私</h2>
          <p className="mb-4">
            我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果我们发现我们已无意中收集了13岁以下儿童的个人信息，我们将采取措施删除这些信息。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookie和类似技术</h2>
          <p className="mb-4">
            我们使用Cookie和类似技术来收集和存储有关您使用我们服务的信息。您可以通过浏览器设置控制对Cookie的接受程度，但这可能会影响您使用我们服务的能力。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. 第三方链接</h2>
          <p className="mb-4">
            我们的服务可能包含到第三方网站或服务的链接，这些网站或服务不受我们控制。我们对这些第三方的隐私做法不负责，我们鼓励您在提供信息之前阅读他们的隐私政策。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. 隐私政策的更改</h2>
          <p className="mb-4">
            我们可能会不时更新本隐私政策。更新后的政策将在我们的网站上发布，并在发布时立即生效。我们鼓励您定期查看本政策，以了解我们如何保护您的信息。
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. 联系我们</h2>
          <p className="mb-4">
            如果您对本隐私政策有任何问题或建议，请通过以下方式联系我们：<br /><br />
            电子邮件：privacy@missai.com<br />
            地址：上海市浦东新区张江高科技园区
          </p>
          
          <p className="mt-8 text-sm text-muted-foreground">
            最后更新日期：2023年12月1日
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
