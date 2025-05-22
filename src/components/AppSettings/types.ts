
import { AppSettings as BaseAppSettings } from '@/components/AppSettingsDialog';
import { UseFormReturn } from 'react-hook-form';
import { GetConfig200TemplatesItem } from '@/api/core/types';

export type AppSettings = BaseAppSettings;

export interface AppSettingsFormProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  configData?: { 
    modelsAi?: string[];
    templates?: GetConfig200TemplatesItem[];
  };
  onSubmit: (e: React.FormEvent) => void;
  errors?: Record<string, { message: string }>;
}

export interface LoadingPlaceholderProps {
  message: string;
}
