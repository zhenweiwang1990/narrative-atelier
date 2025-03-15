
import { useState } from 'react';
import { toast } from 'sonner';

export const useVoiceOperations = () => {
  const [currentPlayingVoice, setCurrentPlayingVoice] = useState<string | null>(null);

  // 播放语音示例
  const handlePlayVoiceSample = (voiceId: string, sampleUrl: string) => {
    // 检查是否播放中
    if (currentPlayingVoice === voiceId) {
      // 停止当前播放
      setCurrentPlayingVoice(null);
      return;
    }

    try {
      // 创建新的音频实例播放
      const audio = new Audio(sampleUrl);
      
      // 设置播放完毕事件
      audio.onended = () => {
        setCurrentPlayingVoice(null);
      };
      
      // 设置错误处理
      audio.onerror = () => {
        toast.error("语音样本播放失败");
        setCurrentPlayingVoice(null);
      };
      
      // 开始播放
      audio.play().then(() => {
        setCurrentPlayingVoice(voiceId);
      }).catch(error => {
        console.error("播放音频失败:", error);
        toast.error("语音样本播放失败");
      });
    } catch (error) {
      console.error("播放音频出错:", error);
      toast.error("语音样本播放失败");
    }
  };

  return {
    currentPlayingVoice,
    handlePlayVoiceSample
  };
};
