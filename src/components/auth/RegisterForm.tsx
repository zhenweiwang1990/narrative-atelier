
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signUp, signInWithGoogle } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast({
        title: "请填写所有字段",
        description: "名称、邮箱和密码不能为空",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(email, password, name);
    setIsSubmitting(false);

    if (error) {
      toast({
        title: "注册失败",
        description: error.message || "注册过程中出现错误",
        variant: "destructive",
      });
    } else {
      toast({
        title: "注册成功",
        description: "请检查您的邮箱以确认您的账户",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <Card>
      <form onSubmit={handleSignUp}>
        <CardHeader>
          <CardTitle>创建账号</CardTitle>
          <CardDescription>
            注册一个新账号开始创作您的交互式剧情
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名称</Label>
            <Input
              id="name"
              placeholder="您的名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-register">邮箱</Label>
            <Input
              id="email-register"
              type="email"
              placeholder="您的邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-register">密码</Label>
            <Input
              id="password-register"
              type="password"
              placeholder="设置密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '注册中...' : '注册'}
          </Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或者
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <Mail size={16} />
            <span>Google 注册</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
