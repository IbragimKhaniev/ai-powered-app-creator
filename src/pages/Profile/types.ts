export interface UserData {
  email: string;
  name: string;
  plan: string;
  tokensLeft: number;
  avatarUrl: string;
}

export interface UserApp {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  aiModel: string;
  tokensUsed: number;
  tokensTotal: number;
  usedTokensOutput: number;
  usedTokensInput: number;
  url: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Application {
  id: string;
  name: string;
  description: string;
  status: string;
  created: string;
  lastModified: string;
  thumbnail: string;
}

export interface TokenUsage {
  used: number;
  total: number;
  percentageUsed: number;
}
