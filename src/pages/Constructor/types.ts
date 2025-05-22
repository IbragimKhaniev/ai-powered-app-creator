import { IMongoModelLog } from "@/api/core";

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
