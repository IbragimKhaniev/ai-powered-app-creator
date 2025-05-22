
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { showErrorToast } from "@/components/ui/error-toast";
import AppSettingsDialog from '@/components/AppSettingsDialog';
import { AppSettings } from '@/components/AppSettingsDialog';
import { LogEntry } from './types';
import ChatPanel from './components/ChatPanel';
import LogsPanel from './components/LogsPanel';
import PreviewPanel from './components/PreviewPanel';
import { CONSTRUCTOR_TEXT } from './constants';
import { 
  usePostApplications, 
  usePostApplicationsApplicationIdMessages, 
  useGetApplicationsId, 
  useGetApplicationsApplicationIdLogs, 
  useGetApplicationsApplicationIdMessages,
  useGetConfig
} from '@/api/core';
import { useToast } from '@/hooks/use-toast';
import { IMongoModelLog } from '@/api/core/types';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Constructor: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showLogs, setShowLogs] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const applicationId = useMemo(() => searchParams.get('appId'), [searchParams]);

  // Fetch configuration data
  const { data: configData } = useGetConfig({
    query: {
      staleTime: 3600000, // Cache for 1 hour
    }
  });

  // Get messages for the current application
  const { data: messages } = useGetApplicationsApplicationIdMessages(applicationId, {
    query: {
      queryKey: ['getMessagesKey', applicationId],
      enabled: !!applicationId,
    },
  });
  
  // Create application mutation
  const { mutate: createApplication, isPending: isCreatingApp } = usePostApplications({
    mutation: {
      onSuccess: (data) => {
        console.log('Application created:', data);
        toast({
          title: 'Успешно!',
          description: 'Приложение создано',
        });
        window.location.href = `/constructor?appId=${data._id}`;
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

  // Get application details if we have an ID
  const { data: appData, isLoading: isLoadingAppData } = useGetApplicationsId(
    applicationId || '',
    {
      query: {
        enabled: !!applicationId,
        queryKey: ['getApplicationKey', applicationId],
        refetchInterval: 5000, // Poll every 5 seconds
      }
    }
  );
  
  // Get application logs
  const { data: logsData, isLoading: isLoadingLogs } = useGetApplicationsApplicationIdLogs(
    applicationId || '',
    {
      query: {
        enabled: !!applicationId && showLogs,
        refetchInterval: showLogs ? 5000 : false,
      }
    }
  );

  // Set default model from config when it loads
  useEffect(() => {
    if (configData?.modelsAi && configData.modelsAi.length > 0) {
      setSelectedModel(configData.modelsAi[0]);
    }
  }, [configData]);

  const isCommonLoading = useMemo(() => (
    Boolean(appData?.pending || isCreatingApp || isSendingMessage)
  ), [appData?.pending, isCreatingApp, isSendingMessage]);
  
  // Update logs when data changes
  useEffect(() => {
    if (logsData?.logs && logsData.logs.length > 0) {
      const formattedLogs: LogEntry[] = logsData.logs.map((log: IMongoModelLog) => ({
        id: log._id || `log-${Date.now()}-${Math.random()}`,
        content: log.content || '',
        timestamp: log.createdAt ? new Date(log.createdAt) : new Date()
      }));
      setLogs(formattedLogs);
    }
  }, [logsData]);

  const handleTryFix = () => {
    console.log("Attempting to fix errors");
  };

  const handleTryFixLog = (logContent: string) => {
    console.log(`Attempting to fix: ${logContent}`);
    setShowLogs(false);
  };

  const handleSendMessage = useCallback((inputMessage: string) => {
    // If app is not created, show settings dialog
    if (!applicationId) {
      setInputMessage(inputMessage);
      setShowSettingsDialog(true);
      return;
    }

    // If we have an application ID, send the message
    if (applicationId) {
      sendMessage({
        applicationId,
        data: { content: inputMessage }
      });
    }
  }, [applicationId, sendMessage]);

  const handleConfirmSettings = (settings: AppSettings) => {
    console.log('App settings confirmed:', settings);
    setSelectedModel(settings.aiModel);
    
    // Create the application
    createApplication({
      data: {
        name: settings.appName,
        modelAi: settings.aiModel,
        template: settings.templateId
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

  const handleChangeMessageInput = useCallback((value: string) => {
    setInputMessage(value);
  }, []);

  const clearMessageInput = useCallback(() => {
    setInputMessage("");
  }, []);

  return (
    <div className="h-screen w-full bg-background">
      <AppSettingsDialog 
        isOpen={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
        onConfirm={handleConfirmSettings}
        initialSettings={{ aiModel: selectedModel }}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen"
      >
        {/* Chat Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <ChatPanel 
            messages={messages || []} 
            onSendMessage={handleSendMessage} 
            onTryFix={handleTryFix}
            isLoading={isCommonLoading}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
            handleChangeMessageInput={handleChangeMessageInput}
            messageInputValue={inputMessage}
            availableModels={configData?.modelsAi || []}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Preview/Logs Panel */}
        <ResizablePanel defaultSize={60}>
          {showLogs ? (
            <LogsPanel 
              logs={logs} 
              onToggleLogs={handleToggleLogs} 
              onTryFixLog={handleTryFixLog} 
              isLoading={isLoadingLogs}
            />
          ) : (
            <PreviewPanel 
              isLoading={isCommonLoading}
              isAppCreated={Boolean(applicationId)}
              keyIframe="1"
              domain={appData?.domain}
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
