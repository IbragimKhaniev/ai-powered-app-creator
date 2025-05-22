
import { useState, useCallback } from 'react';
import { AppSettings } from '@/components/AppSettingsDialog';

export const useSettingsDialog = (selectedModel: string, createApplication: any) => {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

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
    handleConfirmSettings
  };
};
