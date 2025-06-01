
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GetApplicationsApplicationIdMessages200ItemPromtsItem } from '@/api/core';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PromtDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GetApplicationsApplicationIdMessages200ItemPromtsItem;
}

const PromtDetailsModal: React.FC<PromtDetailsModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const renderHistory = (history: string | undefined) => {
    if (!history) return <p className="text-gray-500">История отсутствует</p>;

    try {
      const parsed = JSON.parse(history);

      console.log({parsed});

      // Если это массив, пытаемся распарсить content в каждом объекте
      if (Array.isArray(parsed)) {
        const processedHistory = parsed.map((item, index) => {
          if (item && typeof item === 'object' && item.content) {
            try {
              const parsedContent = JSON.parse(item.content);
              console.log({parsedContent});
              // Если content успешно распарсен, заменяем его
              return {
                ...item,
                content: parsedContent
              };
            } catch {
              // Если не удалось распарсить content, обрабатываем переносы строк
              const contentWithBreaks = typeof item.content === 'string' 
                ? item.content.replace(/\\n/g, '\n').replace(/\n/g, '\n')
                : item.content;
              return {
                ...item,
                content: contentWithBreaks
              };
            }
          }
          return item;
        });

        console.log({processedHistory});
        
        return (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm whitespace-pre-wrap">
            {JSON.stringify(processedHistory, null, 2)}
          </pre>
        );
      }

      // Если это объект, пытаемся распарсить его content
      if (parsed && typeof parsed === 'object' && parsed.content) {
        try {
          const parsedContent = JSON.parse(parsed.content);
          const processedHistory = {
            ...parsed,
            content: parsedContent
          };
          
          return (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm whitespace-pre-wrap">
              {JSON.stringify(processedHistory, null, 2)}
            </pre>
          );
        } catch {
          // Если не удалось распарсить content, обрабатываем переносы строк
          const contentWithBreaks = typeof parsed.content === 'string' 
            ? parsed.content.replace(/\\n/g, '\n').replace(/\n/g, '\n')
            : parsed.content;
          const processedHistory = {
            ...parsed,
            content: contentWithBreaks
          };
          
          return (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm whitespace-pre-wrap">
              {JSON.stringify(processedHistory, null, 2)}
            </pre>
          );
        }
      }

      // Обычный парсинг JSON
      return (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm whitespace-pre-wrap">
          {JSON.stringify(parsed, null, 2)}
        </pre>
      );
    } catch (error) {
      // Если не удалось распарсить как JSON, обрабатываем переносы строк
      const historyWithBreaks = history.replace(/\\n/g, '\n').replace(/\n/g, '\n');
      return (
        <div className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto">
          <p className="text-sm whitespace-pre-wrap">{historyWithBreaks}</p>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Детали промта
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6" style={{ maxWidth: 'inherit' }}>
          {/* Информация о токенах */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Использование токенов</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Входящие токены</div>
                <div className="text-2xl font-bold text-blue-800">
                  {data.usedTokensInput || 0}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Исходящие токены</div>
                <div className="text-2xl font-bold text-green-800">
                  {data.usedTokensOutput || 0}
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">Кэшированные токены</div>
                <div className="text-2xl font-bold text-purple-800">
                  {data.cachedTokens || 0}
                </div>
              </div>
            </div>
          </div>

          {/* История */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">История</h3>
            {renderHistory(data.history)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromtDetailsModal;
