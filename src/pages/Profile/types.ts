
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
  url: string;
}
