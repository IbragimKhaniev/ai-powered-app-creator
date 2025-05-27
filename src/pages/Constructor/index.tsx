
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
} from './hooks';

const Constructor: React.FC = () => {
  const [showLogs, setShowLogs] = useState(false);

  // Hook for application data and creation
  const {
    applicationId,
    appData,
    asyncCreateApplication,
    isCreatingApp
  } = useApplicationData();

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
    setShowSettingsDialog,
    sendMessage,
    asyncSendMessage
  } = useMessageHandling(applicationId);

  // Hook for messages data
  const { messages } = useMessagesData(applicationId);

  // Hook for logs handling
  const { logs, isLoadingLogs, handleTryFixLog, isSendingFixMessage } = useLogsHandling(applicationId, showLogs);

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

  const redirectiToApplicationId = useCallback((applicationId: string) => {
    window.location.href = `/constructor?appId=${applicationId}`;
  }, []);

  const handleConfirmSettings = useCallback(async (settings) => {
    console.log('App settings confirmed:', settings);

    // Create the application
    const application = await asyncCreateApplication({
      data: {
        name: settings.appName,
        modelAi: settings.aiModel,
        template: settings.templateId
      }
    });

    await asyncSendMessage({
      applicationId: application._id,
      data: { content: inputMessage }
    });

    redirectiToApplicationId(application._id);

    setShowSettingsDialog(false);
  }, [asyncCreateApplication, asyncSendMessage, inputMessage, redirectiToApplicationId, setShowSettingsDialog]);

  // Function to handle fixing deployment errors
  const handleTryFixDeployError = useCallback(() => {
    if (!applicationId || !appData?.deployingError) return;
    
    console.log("Attempting to fix deployment error:", appData.deployingError);
    sendMessage({
      applicationId,
      data: { 
        content: "Исправь ошибку", 
        additionalContent: appData.deployingError 
      }
    });
  }, [applicationId, appData?.deployingError, sendMessage]);

  return (
    <div className="h-screen w-full bg-background">
      <AppSettingsDialog 
        isOpen={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
        onConfirm={handleConfirmSettings}
        initialSettings={suggestedSettings}
        isLoading={isAnalyzing}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen"
      >
        {/* Chat Panel */}
        <ResizablePanel defaultSize={30} minSize={30}>
          <ChatPanel 
            application={appData}
            messages={messages || []}
            onSendMessage={handleSendMessage} 
            isLoading={isCommonLoading}
            isDeploying={Boolean(appData?.deploying)}
            handleChangeMessageInput={handleChangeMessageInput}
            messageInputValue={inputMessage}
            deployingError={appData?.deployingError}
            onTryFixDeployError={handleTryFixDeployError}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Preview/Logs Panel */}
        <ResizablePanel defaultSize={70}>
          {showLogs ? (
            <LogsPanel
              logs={logs} 
              onToggleLogs={handleToggleLogs} 
              onTryFixLog={handleTryFixLog} 
              isLoading={isLoadingLogs}
              isSendingFixMessage={isSendingFixMessage}
            />
          ) : (
            <PreviewPanel 
              isLoading={appData?.deploying}
              isAppCreated={Boolean(applicationId)}
              keyIframe="1"
              domain={appData?.domain}
              showLogs={showLogs}
              onToggleLogs={handleToggleLogs}
              onStartCreation={handleStartCreation}
              applicationId={applicationId}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Constructor;
