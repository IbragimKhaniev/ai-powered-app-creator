
import { useState, useCallback, useEffect } from 'react';
import { AppSettings } from '@/components/AppSettingsDialog';
import { usePostPromtsAnalyze } from '@/api/core';

export const useSettingsDialog = (selectedModel: string, createApplication: any) => {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [initialSettings, setInitialSettings] = useState<Partial<AppSettings>>({ aiModel: selectedModel });
  const [messageForAnalysis, setMessageForAnalysis] = useState<string | null>(null);

  // Analysis API call
  const { mutate: analyzeMessage, isPending: isAnalyzing } = usePostPromtsAnalyze();

  // Handle analysis request
  const requestSettingsAnalysis = useCallback((message: string) => {
    setMessageForAnalysis(message);
    setShowSettingsDialog(true);

    analyzeMessage(
      { data: { prompt: message } },
      {
        onSuccess: (data) => {
          if (data.data?.appName || data.data?.modelAi) {
            setInitialSettings({
              appName: data.data.appName || "Новое приложение",
              aiModel: data.data.modelAi || selectedModel,
              appType: "web" // Default for now
            });
          }
        }
      }
    );
  }, [analyzeMessage, selectedModel]);

  const handleConfirmSettings = useCallback((settings: AppSettings) => {
    console.log('App settings confirmed:', settings);
    
    // Create the application
    createApplication({
      data: {
        name: settings.appName,
        modelAi: settings.aiModel,
        template: settings.templateId
      }
    });
    
    setShowSettingsDialog(false);
  }, [createApplication]);

  return {
    showSettingsDialog,
    setShowSettingsDialog,
    initialSettings,
    isAnalyzing,
    handleConfirmSettings,
    requestSettingsAnalysis
  };
};
