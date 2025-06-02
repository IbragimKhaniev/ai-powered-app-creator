
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { UserApp } from '../../types';

interface AppListItemProps {
  app: UserApp;
  onEdit?: (app: UserApp) => void;
  onDelete?: (app: UserApp) => void;
}

const AppListItem: React.FC<AppListItemProps> = ({ app, onEdit, onDelete }) => {
  const handleOpenApp = () => {
    window.open(app.url, '_blank');
  };

  const handleEdit = () => {
    onEdit?.(app);
  };

  const handleDelete = () => {
    onDelete?.(app);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'активно':
        return 'bg-green-100 text-green-800';
      case 'в процессе':
        return 'bg-yellow-100 text-yellow-800';
      case 'ошибка':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalTokens = app.usedTokensInput + app.usedTokensOutput - app.cachedTokens;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {app.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Создано: {new Date(app.createdAt).toLocaleDateString()}
            </p>
            <Badge className={getStatusColor(app.status)}>
              {app.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">AI модель:</span>
            <span className="ml-2 font-medium">{app.aiModel}</span>
          </div>
          <div>
            <span className="text-gray-500">Токенов использовано:</span>
            <span className="ml-2 font-medium">{totalTokens}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleOpenApp}
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Открыть
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleEdit}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppListItem;
