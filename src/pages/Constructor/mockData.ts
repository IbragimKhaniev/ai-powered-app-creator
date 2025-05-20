
import { Log } from './types';

// Моковые данные для логов
export const mockLogs: Log[] = [
  { id: '1', content: '[INFO] Server started on port 3000', timestamp: new Date('2025-05-20T10:00:00') },
  { id: '2', content: '[INFO] Application initialized successfully', timestamp: new Date('2025-05-20T10:00:05') },
  { id: '3', content: '[INFO] User authentication successful', timestamp: new Date('2025-05-20T10:15:22') },
  { id: '4', content: '[WARNING] Memory usage is high (85%)', timestamp: new Date('2025-05-20T10:30:15') },
  { id: '5', content: '[ERROR] Failed to connect to database', timestamp: new Date('2025-05-20T10:45:30') },
  { id: '6', content: '[INFO] Database connection reestablished', timestamp: new Date('2025-05-20T10:46:25') },
  { id: '7', content: '[INFO] New user registered: user@example.com', timestamp: new Date('2025-05-20T11:00:00') },
  { id: '8', content: '[DEBUG] Processing request: GET /api/users', timestamp: new Date('2025-05-20T11:15:10') },
  { id: '9', content: '[INFO] Request completed in 120ms', timestamp: new Date('2025-05-20T11:15:11') },
  { id: '10', content: '[INFO] Show more projects', timestamp: new Date('2025-05-20T19:49:26') }
];
