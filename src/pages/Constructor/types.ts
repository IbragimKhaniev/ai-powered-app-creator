
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

export interface LogEntry {
  id: string;
  content: string;
  timestamp: Date;
}

export interface AppSettings {
  appName: string;
  aiModel: string;
  appType: string;
}
