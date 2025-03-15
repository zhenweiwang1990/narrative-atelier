
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, QrCode, ArrowRight, ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      return;
    }
    setIsCodeSent(true);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCodeSent(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo and Welcome */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Miss AI</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              欢迎来到 Miss AI 内容创作平台
            </p>
          </div>
          
          {/* Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in">
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>手机号登录</span>
                </TabsTrigger>
                <TabsTrigger value="wechat" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  <span>微信登录</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Phone Login */}
              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="请输入手机号"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="code">验证码</Label>
                    <Button 
                      variant="link" 
                      size="sm"
                      disabled={isCodeSent || phoneNumber.length !== 11}
                      onClick={handleSendCode}
                      className="h-auto p-0"
                    >
                      {isCodeSent ? `${countdown}秒后重新发送` : "获取验证码"}
                    </Button>
                  </div>
                  
                  <div className="mb-6">
                    <InputOTP
                      maxLength={6}
                      value={verificationCode}
                      onChange={(value) => setVerificationCode(value)}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} index={index} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  登录
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              
              {/* WeChat Login */}
              <TabsContent value="wechat" className="flex flex-col items-center justify-center py-4">
                <div className="bg-story-blue p-1 rounded-lg mb-4">
                  <div className="bg-white p-8 rounded">
                    <div className="w-48 h-48 bg-gray-200 animate-pulse flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  请使用微信扫描二维码登录
                </p>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Agreement Text */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            登录即表示您已阅读并同意 
            <Link to="/agreement" className="text-primary hover:underline">用户协议</Link>
            {" 和 "}
            <Link to="/privacy" className="text-primary hover:underline">隐私政策</Link>
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

export default Login;
