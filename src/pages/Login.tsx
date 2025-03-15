
import React, { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Timer, Phone } from "lucide-react";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      alert("请输入正确的手机号码");
      return;
    }

    setIsSendingCode(true);
    
    // Mock sending code - in a real app, this would call an API
    setTimeout(() => {
      let count = 60;
      setCountdown(count);
      
      const timer = setInterval(() => {
        count -= 1;
        setCountdown(count);
        
        if (count <= 0) {
          clearInterval(timer);
          setIsSendingCode(false);
        }
      }, 1000);
    }, 500);
  };

  const handleLogin = () => {
    // Mock login - in a real app, this would validate credentials
    if (!phoneNumber) {
      alert("请输入手机号码");
      return;
    }
    
    if (!verificationCode) {
      alert("请输入验证码");
      return;
    }
    
    // Navigate to main app - in a real app, this would authenticate the user
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">
              欢迎来到 Miss AI 内容创作平台
            </h1>
            <p className="text-muted-foreground">
              轻松创建、编辑和管理您的AI互动故事
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone">
                    <Phone className="h-4 w-4 mr-2" />
                    手机验证码登录
                  </TabsTrigger>
                  <TabsTrigger value="wechat">
                    <QrCode className="h-4 w-4 mr-2" />
                    微信扫码登录
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="phone" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号码</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="请输入您的手机号码"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="code">验证码</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="code"
                        type="text"
                        placeholder="请输入验证码"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleSendCode}
                        disabled={isSendingCode}
                        className="whitespace-nowrap"
                      >
                        {isSendingCode ? (
                          <>
                            <Timer className="h-4 w-4 mr-1" />
                            {countdown}秒
                          </>
                        ) : (
                          "获取验证码"
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleLogin}>
                    登录
                  </Button>
                </TabsContent>
                
                <TabsContent value="wechat" className="mt-4">
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="w-48 h-48 bg-gray-100 border flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-gray-400" />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      请使用微信扫描二维码登录
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-4 md:flex-row md:gap-0">
          <p className="text-center text-sm text-muted-foreground">
            版权所有 © {new Date().getFullYear()} Miss AI 内容创作平台
          </p>
          <p className="text-center text-sm text-muted-foreground">
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              沪ICP备12345678号-1
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
