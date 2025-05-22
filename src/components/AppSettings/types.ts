
import { AppSettings as BaseAppSettings } from '@/components/AppSettingsDialog';
import { UseFormReturn } from 'react-hook-form';

export type AppSettings = BaseAppSettings;

export interface AppSettingsFormProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  configData?: { 
    modelsAi?: string[];
    templates?: Array<{ id?: string; description: string }>;
  };
  onSubmit: (e: React.FormEvent) => void;
  errors?: Record<string, { message: string }>;
}

export interface LoadingPlaceholderProps {
  message: string;
}
