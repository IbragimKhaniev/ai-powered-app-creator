
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
import { AppSettingsFormProps } from './types';

// App types definition
const APP_TYPES = [
  { id: "web", name: "Веб-приложение" },
  { id: "mobile", name: "Мобильное приложение" },
  { id: "desktop", name: "Десктопное приложение" },
  { id: "other", name: "Другое" },
];

const AppSettingsForm: React.FC<AppSettingsFormProps> = ({ settings, setSettings, configData, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        {/* App Name Field */}
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
        
        {/* AI Model Selection */}
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
        
        {/* App Type Selection */}
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
        
        {/* Template Selection (if available) */}
        {configData?.templates && configData.templates.length > 0 && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="templateId" className="text-right">
              Шаблон
            </Label>
            <Select
              value={settings.templateId || "no-template"}
              onValueChange={(value) => setSettings({ ...settings, templateId: value === "no-template" ? undefined : value })}
            >
              <SelectTrigger id="templateId" className="col-span-3">
                <SelectValue placeholder="Выберите шаблон (опционально)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-template">Без шаблона</SelectItem>
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
  );
};

export default AppSettingsForm;
