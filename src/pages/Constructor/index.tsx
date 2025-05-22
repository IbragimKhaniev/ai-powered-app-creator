
import React, { useState, useCallback, useMemo } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import AppSettingsDialog from '@/components/AppSettingsDialog';
import ChatPanel from './components/ChatPanel';
import LogsPanel from './components/LogsPanel';
import PreviewPanel from './components/PreviewPanel';
import {
  useApplicationData,
  useMessageHandling,
  useLogsHandling,
  useMessagesData,
  useModelSelection
} from './hooks';

const Constructor: React.FC = () => {
  const [showLogs, setShowLogs] = useState(false);

  // Hook for application data and creation
  const {
    applicationId,
    appData,
    isLoadingAppData,
    configData,
    createApplication,
    isCreatingApp
  } = useApplicationData();

  // Hook for model selection
  const { selectedModel, handleModelChange } = useModelSelection('gpt-4o', configData?.modelsAi);

  // Hook for messages handling
  const {
    inputMessage,
    handleSendMessage,
    handleChangeMessageInput,
    isSendingMessage,
    analyzeInProgress,
    isAnalyzing,
    suggestedSettings,
    showSettingsDialog,
    setShowSettingsDialog
  } = useMessageHandling(applicationId);

  // Hook for messages data
  const { messages } = useMessagesData(applicationId);

  // Hook for logs handling
  const { logs, isLoadingLogs, handleTryFixLog } = useLogsHandling(applicationId, showLogs);

  // Calculate if there's any loading happening
  const isCommonLoading = useMemo(() => (
    Boolean(appData?.pending || isCreatingApp || isSendingMessage || analyzeInProgress)
  ), [appData?.pending, isCreatingApp, isSendingMessage, analyzeInProgress]);

  const handleToggleLogs = useCallback(() => {
    setShowLogs(!showLogs);
  }, [showLogs]);
  
  const handleStartCreation = useCallback(() => {
    document.querySelector('textarea')?.focus();
  }, []);

  const handleConfirmSettings = useCallback((settings) => {
    console.log('App settings confirmed:', settings);
    handleModelChange(settings.aiModel);
    
    // Create the application
    createApplication({
      data: {
        name: settings.appName,
        modelAi: settings.aiModel,
        template: settings.templateId
      }
    });
    
    setShowSettingsDialog(false);
  }, [createApplication, handleModelChange, setShowSettingsDialog]);

  const handleTryFix = useCallback(() => {
    console.log("Attempting to fix errors");
  }, []);

  return (
    <div className="h-screen w-full bg-background">
      <AppSettingsDialog 
        isOpen={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
        onConfirm={handleConfirmSettings}
        initialSettings={suggestedSettings || { aiModel: selectedModel, appName: 'Новое приложение', appType: 'web' }}
        isLoading={isAnalyzing}
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
