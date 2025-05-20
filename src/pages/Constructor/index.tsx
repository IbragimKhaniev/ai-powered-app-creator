
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

const Constructor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    createAiMessage(CONSTRUCTOR_TEXT.DEFAULT_AI_RESPONSE, false),
    createAiMessage(CONSTRUCTOR_TEXT.DEFAULT_ERROR_MESSAGE, true)
  ]);
  const [showLogs, setShowLogs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAppCreated, setIsAppCreated] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);

  // Simulate loading
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 500);
            return 100;
          }
          return newProgress;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

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
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = createAiMessage(
        'Я получил ваше сообщение. Сейчас я работаю над вашим запросом...'
      );
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  }, [isAppCreated]);

  const handleConfirmSettings = (settings: AppSettings) => {
    console.log('App settings confirmed:', settings);
    setAppSettings(settings);
    setIsAppCreated(true);
    setShowSettingsDialog(false);
    
    // Send a confirmation message from AI
    setTimeout(() => {
      const aiResponse = createAiMessage(
        `Отлично! Я создал новое приложение "${settings.appName}". Теперь давайте начнем работу над вашим запросом.`
      );
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleToggleLogs = useCallback(() => {
    setShowLogs(!showLogs);
  }, [showLogs]);
  
  const handleStartCreation = useCallback(() => {
    document.querySelector('textarea')?.focus();
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
              isLoading={isLoading}
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
