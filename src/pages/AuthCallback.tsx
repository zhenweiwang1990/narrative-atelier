
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';
import { StoriesErrorState } from '@/components/stories';
import { Button } from '@/components/ui/button';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setIsLoading(true);
        console.log('Starting auth callback processing');
        
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
          setIsLoading(false);
          return;
        }
        
        // If we have a session, navigate to my-stories
        if (data.session) {
          console.log('Session found, redirecting to my-stories');
          
          // Short delay before redirecting to ensure auth state is properly set
          setTimeout(() => {
            navigate('/my-stories', { replace: true });
          }, 1000);
        } else {
          // If no session found, show error
          console.log('No session found, showing error');
          setError('未找到有效的登录会话');
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Unexpected error during auth callback:', err);
        setError(err.message || '发生意外错误，请重试');
        setIsLoading(false);
      }
    };

    handleAuthCallback();

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('登录超时，请重新尝试');
      }
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  const handleRetry = () => {
    navigate('/auth', { replace: true });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <StoriesErrorState 
          onRetry={handleRetry} 
          errorMessage={`登录失败: ${error}. 请重新尝试登录。`} 
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-2">正在登录...</h2>
        <p className="text-muted-foreground mb-4">请稍候，正在完成身份验证</p>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>
        
        {/* Add a manual navigation button that appears after a few seconds */}
        <div className="mt-8 opacity-0 animate-in fade-in delay-700 duration-300">
          <p className="text-sm text-muted-foreground mb-2">
            加载时间过长？
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/my-stories', { replace: true })}
          >
            手动前往我的剧情
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
