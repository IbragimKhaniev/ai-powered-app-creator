
import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { AppSettingsFormProps } from './types';

// App types definition
const APP_TYPES = [
  { id: "web", name: "Веб-приложение" },
  { id: "mobile", name: "Мобильное приложение" },
  { id: "desktop", name: "Десктопное приложение" },
  { id: "other", name: "Другое" },
];

const AppSettingsForm: React.FC<AppSettingsFormProps> = ({ settings, setSettings, configData, onSubmit }) => {
  // Create form with validation
  const form = useForm({
    defaultValues: settings,
    mode: 'onChange',
  });

  const handleValueChange = (field: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!settings.appName || !settings.appName.trim()) {
      form.setError('appName', { 
        type: 'required', 
        message: 'Название приложения обязательно'
      });
      return;
    }
    
    if (!settings.aiModel) {
      form.setError('aiModel', { 
        type: 'required', 
        message: 'Выберите модель ИИ'
      });
      return;
    }
    
    if (!settings.appType) {
      form.setError('appType', { 
        type: 'required', 
        message: 'Выберите тип приложения'
      });
      return;
    }
    
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 py-4">
        {/* App Name Field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="appName" className="text-right">
            Название
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="appName"
              value={settings.appName}
              onChange={(e) => handleValueChange('appName', e.target.value)}
              className={`${!settings.appName?.trim() && form.formState.isSubmitted ? 'border-red-500' : ''}`}
              placeholder="Введите название приложения"
              required
              aria-invalid={form.formState.errors.appName ? 'true' : 'false'}
            />
            {form.formState.errors.appName && (
              <p className="text-sm text-red-500">{form.formState.errors.appName.message}</p>
            )}
          </div>
        </div>
        
        {/* AI Model Selection */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="aiModel" className="text-right">
            Модель ИИ
          </Label>
          <div className="col-span-3 space-y-1">
            <Select
              value={settings.aiModel}
              onValueChange={(value) => handleValueChange('aiModel', value)}
            >
              <SelectTrigger 
                id="aiModel" 
                className={`${!settings.aiModel && form.formState.isSubmitted ? 'border-red-500' : ''}`}
              >
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
            {form.formState.errors.aiModel && (
              <p className="text-sm text-red-500">{form.formState.errors.aiModel.message}</p>
            )}
          </div>
        </div>
        
        {/* App Type Selection */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="appType" className="text-right">
            Тип приложения
          </Label>
          <div className="col-span-3 space-y-1">
            <Select
              value={settings.appType}
              onValueChange={(value) => handleValueChange('appType', value)}
            >
              <SelectTrigger 
                id="appType" 
                className={`${!settings.appType && form.formState.isSubmitted ? 'border-red-500' : ''}`}
              >
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
            {form.formState.errors.appType && (
              <p className="text-sm text-red-500">{form.formState.errors.appType.message}</p>
            )}
          </div>
        </div>
        
        {/* Template Selection (if available) */}
        {configData?.templates && configData.templates.length > 0 && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="templateId" className="text-right">
              Шаблон
            </Label>
            <Select
              value={settings.templateId || "no-template"}
              onValueChange={(value) => handleValueChange('templateId', value === "no-template" ? undefined : value)}
            >
              <SelectTrigger id="templateId" className="col-span-3">
                <SelectValue placeholder="Выберите шаблон (опционально)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-template">Без шаблона</SelectItem>
                {configData.templates.map(template => (
                  <SelectItem key={template.id || template.description || ""} value={template.id || ""}>
                    {template.description || ""}
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
  );
};

export default AppSettingsForm;
