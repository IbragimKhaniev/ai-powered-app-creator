
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
  const [formErrors, setFormErrors] = useState<Record<string, { message: string }>>({});
  
  const { data: configData, isLoading: isLoadingConfig } = useGetConfig({
    query: {
      enabled: isOpen,
      refetchOnWindowFocus: false,
    }
  });

  // Convert API response to expected format for AppSettingsForm
  const formattedConfigData = configData ? {
    modelsAi: configData.modelsAi,
    templates: configData.templates
  } : undefined;

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
    // Reset previous errors
    setFormErrors({});
    
    // Validate required fields
    const errors: Record<string, { message: string }> = {};
    if (!settings.appName?.trim()) {
      errors.appName = { message: 'Название приложения обязательно' };
    }
    
    if (!settings.aiModel) {
      errors.aiModel = { message: 'Выберите модель ИИ' };
    }
    
    if (!settings.appType) {
      errors.appType = { message: 'Выберите тип приложения' };
    }
    
    // If errors exist, update state and prevent submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Submit if validation passes
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
            configData={formattedConfigData}
            onSubmit={handleSubmit}
            errors={formErrors}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppSettingsDialog;
