
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetConfig } from '@/api/core';
import { AppSettingsForm, LoadingPlaceholder } from '@/components/AppSettings';

export interface AppSettings {
  appName: string;
  aiModel: string;
  appType: string;
  templateId?: string;
}

interface AppSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: AppSettings) => void;
  initialSettings?: Partial<AppSettings>;
  isLoading?: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  appName: "Новое приложение",
  aiModel: "gpt-4o",
  appType: "web",
};

const AppSettingsDialog: React.FC<AppSettingsDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialSettings,
  isLoading = false
}) => {
  const [settings, setSettings] = useState<AppSettings>({ ...DEFAULT_SETTINGS, ...initialSettings });
  
  const { data: configData, isLoading: isLoadingConfig } = useGetConfig({
    query: {
      enabled: isOpen,
      refetchOnWindowFocus: false,
    }
  });

  // Update settings if initialSettings changes
  useEffect(() => {
    if (initialSettings) {
      setSettings(prev => ({ 
        ...prev, 
        ...initialSettings,
        // Ensure all required fields have values
        appName: initialSettings.appName || prev.appName,
        aiModel: initialSettings.aiModel || prev.aiModel,
        appType: initialSettings.appType || prev.appType,
      }));
    }
  }, [initialSettings]);

  // Set first available model as default if available
  useEffect(() => {
    if (configData?.modelsAi && configData.modelsAi.length > 0 && !settings.aiModel) {
      setSettings(prev => ({ ...prev, aiModel: configData.modelsAi[0] }));
    }
  }, [configData, settings.aiModel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(settings);
  };

  const isShowingLoader = isLoading || isLoadingConfig;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Настройки нового приложения</DialogTitle>
          <DialogDescription>
            {isLoading 
              ? "Анализируем ваше сообщение для подготовки настроек..." 
              : "Заполните базовые настройки для вашего нового приложения"}
          </DialogDescription>
        </DialogHeader>
        
        {isShowingLoader ? (
          <LoadingPlaceholder 
            message={isLoading ? "Анализируем ваше сообщение..." : "Загрузка доступных опций..."}
          />
        ) : (
          <AppSettingsForm
            settings={settings}
            setSettings={setSettings}
            configData={configData}
            onSubmit={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppSettingsDialog;
