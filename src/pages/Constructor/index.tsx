
import React, { useState, useCallback, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { showErrorToast } from "@/components/ui/error-toast";
import AppSettingsDialog from '@/components/AppSettingsDialog';
import { Message, LogEntry, AppSettings } from './types';
import { mockLogs } from './utils/logUtils';
import { createUserMessage, createAiMessage } from './utils/messageUtils';
import ChatPanel from './components/ChatPanel';
import LogsPanel from './components/LogsPanel';
import PreviewPanel from './components/PreviewPanel';
import { CONSTRUCTOR_TEXT } from './constants';
import { usePostApplications, usePostApplicationsApplicationIdMessages, useGetApplicationsId } from '@/api/core';
import { useToast } from '@/hooks/use-toast';

const Constructor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    createAiMessage(CONSTRUCTOR_TEXT.DEFAULT_AI_RESPONSE, false),
  ]);
  const [showLogs, setShowLogs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAppCreated, setIsAppCreated] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const { toast } = useToast();
  
  // Create application mutation
  const { mutate: createApplication, isPending: isCreatingApp } = usePostApplications({
    mutation: {
      onSuccess: (data) => {
        console.log('Application created:', data);
        toast({
          title: 'Успешно!',
          description: 'Приложение создано',
        });
        setApplicationId(data._id);
        setIsAppCreated(true);
        setIsLoading(true);
        startLoadingAnimation();
      },
      onError: (error) => {
        console.error('Error creating application:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось создать приложение',
          variant: 'destructive'
        });
      }
    }
  });
  
  // Send message mutation
  const { mutate: sendMessage, isPending: isSendingMessage } = usePostApplicationsApplicationIdMessages({
    mutation: {
      onSuccess: (data) => {
        console.log('Message sent:', data);
        setIsChatLoading(false);
      },
      onError: (error) => {
        console.error('Error sending message:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось отправить сообщение',
          variant: 'destructive'
        });
        setIsChatLoading(false);
      }
    }
  });
  
  // Get application details if we have an ID
  const { data: appData, isLoading: isLoadingAppData } = useGetApplicationsId(
    applicationId || '',
    {
      query: {
        enabled: !!applicationId,
        refetchInterval: 5000, // Poll every 5 seconds
        onSuccess: (data) => {
          console.log('Application data:', data);
          // Check if the app is no longer pending deployment
          if (data && !data.pending && isLoading) {
            setIsLoading(false);
            setLoadingProgress(100);
          }
        }
      }
    }
  );

  const startLoadingAnimation = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 95) {
          clearInterval(interval);
          return 95; // We'll set it to 100 when actual loading is done
        }
        return newProgress;
      });
    }, 300);
  };

  // Demo error toast
  useEffect(() => {
    const timer = setTimeout(() => {
      showErrorToast({ onTryFix: handleTryFix });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTryFix = () => {
    console.log("Attempting to fix errors");
    
    const fixResponseMessage = createAiMessage(CONSTRUCTOR_TEXT.FIXING_ERRORS);
    setMessages(prev => [...prev, fixResponseMessage]);
  };
  
  const handleTryFixLog = (logContent: string) => {
    console.log(`Attempting to fix: ${logContent}`);
    
    const cleanLogContent = logContent.replace(/\[(INFO|WARNING|ERROR|DEBUG)\]\s/, '');
    const fixLogResponseMessage = createAiMessage(`${CONSTRUCTOR_TEXT.FIXING_ISSUE} ${cleanLogContent}`);
    
    setMessages(prev => [...prev, fixLogResponseMessage]);
    setShowLogs(false);
  };

  const handleSendMessage = useCallback((inputMessage: string) => {
    // Add user message
    const newMessage = createUserMessage(inputMessage);
    setMessages(prev => [...prev, newMessage]);
    
    // If app is not created, show settings dialog
    if (!isAppCreated) {
      setShowSettingsDialog(true);
      return;
    }
    
    // If we have an application ID, send the message
    if (applicationId) {
      setIsChatLoading(true);
      
      sendMessage({
        applicationId,
        data: { content: inputMessage }
      });
      
      // Simulate AI response (in a real app, this would come from the server)
      setTimeout(() => {
        const aiResponse = createAiMessage(
          'Я получил ваше сообщение. Сейчас я работаю над вашим запросом...'
        );
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  }, [applicationId, isAppCreated, sendMessage]);

  const handleConfirmSettings = (settings: AppSettings) => {
    console.log('App settings confirmed:', settings);
    setAppSettings(settings);
    setSelectedModel(settings.aiModel);
    
    // Create the application
    createApplication({
      data: {
        name: settings.appName,
        modelAi: settings.aiModel,
        type: settings.appType
      }
    });
    
    setShowSettingsDialog(false);
  };

  const handleToggleLogs = useCallback(() => {
    setShowLogs(!showLogs);
  }, [showLogs]);
  
  const handleStartCreation = useCallback(() => {
    document.querySelector('textarea')?.focus();
  }, []);

  const handleModelChange = useCallback((model: string) => {
    setSelectedModel(model);
  }, []);

  return (
    <div className="h-screen w-full bg-background">
      <AppSettingsDialog 
        isOpen={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
        onConfirm={handleConfirmSettings}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen"
      >
        {/* Chat Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <ChatPanel 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onTryFix={handleTryFix}
            isLoading={isChatLoading}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Preview/Logs Panel */}
        <ResizablePanel defaultSize={60}>
          {showLogs ? (
            <LogsPanel 
              logs={mockLogs} 
              onToggleLogs={handleToggleLogs} 
              onTryFixLog={handleTryFixLog} 
            />
          ) : (
            <PreviewPanel 
              isLoading={isLoading || isCreatingApp}
              loadingProgress={loadingProgress}
              isAppCreated={isAppCreated}
              showLogs={showLogs}
              onToggleLogs={handleToggleLogs}
              onStartCreation={handleStartCreation}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Constructor;
