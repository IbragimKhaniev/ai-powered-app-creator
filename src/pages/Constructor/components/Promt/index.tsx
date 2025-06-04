
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { GetApplicationsApplicationIdMessages200ItemPromtsItem } from '@/api/core';
import { formatMessageTime } from '../../utils/formatUtils';
import Change from '../Change';
import PromtDetailsModal from '../PromtDetailsModal';

interface PromtProps {
  promt: GetApplicationsApplicationIdMessages200ItemPromtsItem;
  applicationId: string;
}

const Promt: React.FC<PromtProps> = ({ promt, applicationId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'processing': return 'Обрабатывается';
      case 'failed': return 'Ошибка';
      default: return status;
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleViewDetails = () => {
    setShowDetailsModal(true);
  };

  // Safely access changes array
  const changes = Array.isArray(promt.changes) ? promt.changes : [];
  const hasChanges = changes.length > 0;

  return (
    <>
      <Card className="mb-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(promt.status || 'unknown')}>
                {getStatusText(promt.status || 'unknown')}
              </Badge>
              {promt.createdAt && (
                <span className="text-xs text-gray-500">
                  {formatMessageTime(promt.createdAt)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewDetails}
                className="h-8 w-8 p-0"
                title="Посмотреть детали"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {hasChanges && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded}
                  className="h-8 w-8 p-0"
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {promt.content && (
            <div className="mb-3">
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                {promt.content}
              </p>
            </div>
          )}

          {hasChanges && (
            <div className="text-sm text-gray-600 mb-2">
              Изменений: {changes.length}
            </div>
          )}

          {isExpanded && hasChanges && (
            <div className="space-y-3 mt-3 border-t pt-3">
              {changes.map((change, index) => (
                <Change 
                  key={change._id || `change-${index}`}
                  change={change}
                  applicationId={applicationId}
                  messageId={promt.messageId || ''}
                  promtId={promt._id || ''}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <PromtDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        promt={promt}
        applicationId={applicationId}
      />
    </>
  );
};

export default Promt;
