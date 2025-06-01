
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

    const historyWithBreaks = history.replace(/\\n/g, '\n').replace(/\n/g, '\n');

    return (
      <div className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto">
        <p className="text-sm whitespace-pre-wrap">{historyWithBreaks}</p>
      </div>
    );
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
