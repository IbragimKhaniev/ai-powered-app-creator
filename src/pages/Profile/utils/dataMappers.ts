
import { GetUser200 } from '@/api/core/types/getUser200';
import { IMongoModelApplication } from '@/api/core/types';
import { UserData, UserApp } from '../types';

/**
 * Преобразует данные пользователя из API в формат, используемый компонентами
 */
export const mapUserData = (userData: GetUser200): UserData => {
  return {
    email: userData.email || 'user@example.com',
    name: userData.name || 'Пользователь',
    plan: 'FREE', // По умолчанию бесплатный план
    tokensLeft: 500, // Значение по умолчанию
    avatarUrl: '', // Пустая строка для использования аватара с инициалами
  };
};

/**
 * Преобразует данные приложений из API в формат, используемый компонентами
 */
export const mapApplicationsData = (applications: IMongoModelApplication[]): UserApp[] => {
  return applications.map((app, index) => {
    const domain = app.domain || `app-${index}.easyappz.io`;
    
    return {
      id: Number(app._id) || index + 1,
      name: app.name || 'Приложение без названия',
      createdAt: app.createdAt || new Date().toISOString(),
      status: app.pending ? 'В процессе' : 'Активно',
      aiModel: app.modelAi || 'GPT-3.5',
      tokensUsed: (app.usedTokensInput || 0) + (app.usedTokensOutput || 0),
      tokensTotal: 1000, // Значение по умолчанию
      url: `https://${domain}`
    };
  });
};
