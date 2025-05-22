import { UserApp, UserData } from "./types";

// Mock data - In a real app, this would come from an API or context
export const userData: UserData = {
  email: "user@example.com",
  name: "John Doe",
  plan: "Premium",
  tokensLeft: 850,
  avatarUrl: ""
};

// Extended mock apps data
export const userApps: UserApp[] = [
  { 
    id: 1, 
    name: "Blog App", 
    createdAt: "2025-04-15", 
    status: "Active", 
    aiModel: "GPT-4o", 
    tokensUsed: 3200, 
    tokensTotal: 5000,
    url: "https://blog-app.example.com"
  },
  { 
    id: 2, 
    name: "E-commerce Store", 
    createdAt: "2025-05-01", 
    status: "Active", 
    aiModel: "GPT-4o-mini", 
    tokensUsed: 1500, 
    tokensTotal: 5000,
    url: "https://store.example.com"
  },
  { 
    id: 3, 
    name: "Portfolio Site", 
    createdAt: "2025-05-12", 
    status: "In Progress", 
    aiModel: "GPT-4.5-preview", 
    tokensUsed: 4800, 
    tokensTotal: 5000,
    url: "https://portfolio.example.com"
  }
];

// Fix type errors by converting numbers to strings
export const mockApps = [
  {
    id: '1',
    name: 'Музыкальный плеер',
    description: 'Приложение для прослушивания музыки',
    domain: 'music-player',
    updatedAt: new Date('2023-05-10'),
    createdAt: new Date('2023-05-01'),
    calls: 120,
    status: 'active',
  },
  {
    id: '2',
    name: 'Трекер задач',
    description: 'Приложение для управления задачами',
    domain: 'task-tracker',
    updatedAt: new Date('2023-05-15'),
    createdAt: new Date('2023-05-05'),
    calls: 85,
    status: 'active',
  },
  {
    id: '3',
    name: 'Калькулятор калорий',
    description: 'Приложение для подсчета калорий',
    domain: 'calorie-calculator',
    updatedAt: new Date('2023-05-20'),
    createdAt: new Date('2023-05-10'),
    calls: 45,
    status: 'pending',
  },
];
