
export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Log {
  id: string;
  content: string;
  timestamp: Date;
}
