
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session and check for errors
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error in auth callback:', error);
          setError(error.message);
          toast({
            title: "登录失败",
            description: error.message,
            variant: "destructive"
          });
          navigate('/auth', { replace: true });
          return;
        }
        
        // If we have a session, navigate to my-stories
        if (data.session) {
          console.log('Session found, redirecting to my-stories');
          
          // Short delay before redirecting to ensure auth state is properly set
          setTimeout(() => {
            navigate('/my-stories', { replace: true });
          }, 500);
        } else {
          // If no session found, redirect to auth
          console.log('No session found, redirecting to auth');
          toast({
            title: "登录失败",
            description: "未找到有效的登录会话",
            variant: "destructive"
          });
          navigate('/auth', { replace: true });
        }
      } catch (err) {
        console.error('Unexpected error during auth callback:', err);
        setError('发生意外错误，请重试');
        toast({
          title: "登录失败",
          description: "发生意外错误，请重试",
          variant: "destructive"
        });
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-md w-full p-6">
        {error ? (
          <div className="text-destructive">
            <h2 className="text-xl font-semibold mb-2">登录失败</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2">正在登录...</h2>
            <p className="text-muted-foreground mb-4">请稍候，正在完成身份验证</p>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
