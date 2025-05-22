
// This file contains mock data for the Profile page
// In a real application, this data would come from an API

import { UserProfile, Application, TokenUsage } from "./types";

export const mockProfile: UserProfile = {
  name: "Иван Иванов",
  email: "ivan.ivanov@example.com",
  avatarUrl: "https://i.pravatar.cc/300",
};

export const mockApplications: Application[] = [
  {
    id: "app1", // Changed from number to string
    name: "Онлайн магазин",
    description: "Веб-приложение для продажи товаров онлайн",
    status: "active",
    created: "2023-05-15",
    lastModified: "2023-06-20",
    thumbnail: "https://via.placeholder.com/300x200?text=Shop+App",
  },
  {
    id: "app2", // Changed from number to string
    name: "Трекер задач",
    description: "Приложение для отслеживания личных и рабочих задач",
    status: "active",
    created: "2023-04-10",
    lastModified: "2023-06-15",
    thumbnail: "https://via.placeholder.com/300x200?text=Task+Tracker",
  },
  {
    id: "app3", // Changed from number to string
    name: "Блог",
    description: "Персональный блог с возможностью публикации статей",
    status: "inactive",
    created: "2023-03-05",
    lastModified: "2023-04-20",
    thumbnail: "https://via.placeholder.com/300x200?text=Blog",
  },
];

export const mockTokenUsage: TokenUsage = {
  used: 750,
  total: 1000,
  percentageUsed: 75,
};
