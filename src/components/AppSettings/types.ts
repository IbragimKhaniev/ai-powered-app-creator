
import { AppSettings as BaseAppSettings } from '@/components/AppSettingsDialog';

export type AppSettings = BaseAppSettings;

export interface AppSettingsFormProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  configData?: { 
    modelsAi?: string[];
    templates?: Array<{ id: string; description: string }>;
  };
  onSubmit: (e: React.FormEvent) => void;
}

export interface LoadingPlaceholderProps {
  message: string;
}

