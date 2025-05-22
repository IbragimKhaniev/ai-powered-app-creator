
import { IMongoModelLog, IMongoModelApplication } from "@/api/core";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

export type LogEntry = IMongoModelLog;

export interface AppSettings {
  appName: string;
  aiModel: string;
  appType: string;
}

export interface AIModel {
  id: string;
  name: string;
}

// Extended application type that includes the deployingError property
export interface ExtendedApplicationData extends IMongoModelApplication {
  deployingError?: string | null;
}
