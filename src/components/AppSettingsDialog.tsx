
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useGetConfig } from '@/api/core';
import { LoaderCircle } from 'lucide-react';

interface AppSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: AppSettings) => void;
  initialSettings?: Partial<AppSettings>;
  isLoading?: boolean;
}

export interface AppSettings {
  appName: string;
  aiModel: string;
  appType: string;
  templateId?: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  appName: "Новое приложение",
  aiModel: "gpt-4o",
  appType: "web",
};

const APP_TYPES = [
  { id: "web", name: "Веб-приложение" },
  { id: "mobile", name: "Мобильное приложение" },
  { id: "desktop", name: "Десктопное приложение" },
  { id: "other", name: "Другое" },
];

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
          <div className="py-8 flex flex-col items-center gap-4">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">
              {isLoading ? "Анализируем ваше сообщение..." : "Загрузка доступных опций..."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="appName" className="text-right">
                  Название
                </Label>
                <Input
                  id="appName"
                  value={settings.appName}
                  onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                  className="col-span-3"
                  placeholder="Введите название приложения"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="aiModel" className="text-right">
                  Модель ИИ
                </Label>
                <Select
                  value={settings.aiModel}
                  onValueChange={(value) => setSettings({ ...settings, aiModel: value })}
                >
                  <SelectTrigger id="aiModel" className="col-span-3">
                    <SelectValue placeholder="Выберите модель ИИ" />
                  </SelectTrigger>
                  <SelectContent>
                    {configData?.modelsAi?.map(model => (
                      <SelectItem key={model} value={model}>
                        {model === 'gpt-4o-mini' ? 'GPT-4o Mini' : 
                         model === 'gpt-4o' ? 'GPT-4o' : 
                         model === 'gpt-4.5-preview' ? 'GPT-4.5 Preview' : 
                         model}
                      </SelectItem>
                    )) || (
                      <>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="appType" className="text-right">
                  Тип приложения
                </Label>
                <Select
                  value={settings.appType}
                  onValueChange={(value) => setSettings({ ...settings, appType: value })}
                >
                  <SelectTrigger id="appType" className="col-span-3">
                    <SelectValue placeholder="Выберите тип приложения" />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_TYPES.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {configData?.templates && configData.templates.length > 0 && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="templateId" className="text-right">
                    Шаблон
                  </Label>
                  <Select
                    value={settings.templateId || ""}
                    onValueChange={(value) => setSettings({ ...settings, templateId: value || undefined })}
                  >
                    <SelectTrigger id="templateId" className="col-span-3">
                      <SelectValue placeholder="Выберите шаблон (опционально)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Без шаблона</SelectItem>
                      {configData.templates.map(template => (
                        <SelectItem key={template.id} value={template.id || ""}>
                          {template.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button type="submit" className="rounded-full">
                Создать приложение
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppSettingsDialog;
