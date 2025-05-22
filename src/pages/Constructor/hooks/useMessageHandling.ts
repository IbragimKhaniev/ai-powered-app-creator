
import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { 
  usePostApplicationsApplicationIdMessages,
  usePostPromtsAnalyze
} from '@/api/core';
import { AppSettings } from '@/components/AppSettingsDialog';

export const useMessageHandling = (applicationId: string | null) => {
  const [inputMessage, setInputMessage] = useState('');
  const [analyzeInProgress, setAnalyzeInProgress] = useState(false);
  const [suggestedSettings, setSuggestedSettings] = useState<Partial<AppSettings> | null>(null);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Analyze message mutation
  const { mutate: analyzeMessage, isPending: isAnalyzing } = usePostPromtsAnalyze({
    mutation: {
      onSuccess: (data) => {
        console.log('Analysis result:', data);
        setSuggestedSettings({
          appName: data.name || 'Новое приложение',
          appType: 'web', // Default type
          aiModel: data.modelAi || 'gpt-4o',
          templateId: data.template || undefined
        });
        setAnalyzeInProgress(false);
        setShowSettingsDialog(true);
      },
      onError: (error) => {
        console.error('Error analyzing message:', error);
        toast({
          title: 'Ошибка анализа',
          description: 'Не удалось проанализировать сообщение',
          variant: 'destructive'
        });
        setAnalyzeInProgress(false);
        // Still show the dialog but without suggestions
        setShowSettingsDialog(true);
      }
    }
  });
  
  // Send message mutation
  const { mutate: sendMessage, isPending: isSendingMessage } = usePostApplicationsApplicationIdMessages({
    mutation: {
      onSuccess: (data) => {
        console.log('Message sent:', data);
        queryClient.invalidateQueries({ queryKey: ['getMessagesKey'] });
        queryClient.invalidateQueries({ queryKey: ['getApplicationKey'] });
        clearMessageInput();
      },
      onError: (error) => {
        console.error('Error sending message:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось отправить сообщение',
          variant: 'destructive'
        });
      }
    }
  });

  const handleSendMessage = useCallback((message: string) => {
    // If app is not created, analyze the message and show settings dialog
    if (!applicationId) {
      setInputMessage(message);
      setAnalyzeInProgress(true);
      
      // Analyze the message to get suggestions
      analyzeMessage({
        data: { message }
      });
      return;
    }

    // If we have an application ID, send the message
    if (applicationId) {
      sendMessage({
        applicationId,
        data: { content: message }
      });
    }
  }, [applicationId, sendMessage, analyzeMessage]);

  const handleChangeMessageInput = useCallback((value: string) => {
    setInputMessage(value);
  }, []);

  const clearMessageInput = useCallback(() => {
    setInputMessage("");
  }, []);

  return {
    inputMessage,
    setInputMessage,
    handleSendMessage,
    handleChangeMessageInput,
    clearMessageInput,
    analyzeInProgress,
    isAnalyzing,
    isSendingMessage,
    suggestedSettings,
    showSettingsDialog,
    setShowSettingsDialog
  };
};
