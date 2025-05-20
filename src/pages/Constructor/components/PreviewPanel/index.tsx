
import React, { useState } from 'react';
import Header from '../Header';
import ActionsDropdown from '../ActionsDropdown';
import LoadingState from '../LoadingState';
import AppCreationCard from '../AppCreationCard';
import AppPreviewCard from '../AppPreviewCard';
import { CONSTRUCTOR_TEXT } from '../../constants';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { AlertTriangle } from 'lucide-react';

interface PreviewPanelProps {
  isLoading: boolean;
  loadingProgress: number;
  isAppCreated: boolean;
  showLogs: boolean;
  onToggleLogs: () => void;
  onStartCreation: () => void;
  onTryFix?: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isLoading,
  loadingProgress,
  isAppCreated,
  showLogs,
  onToggleLogs,
  onStartCreation,
  onTryFix = () => console.log("Try fix clicked")
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const handleShowErrors = () => {
    setShowErrors(true);
  };

  const handleCloseErrors = () => {
    setShowErrors(false);
  };

  const handleTryFix = () => {
    if (onTryFix) {
      onTryFix();
    }
    setShowErrors(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b flex justify-between items-center bg-white p-4">
        <div className="flex items-center">
          <Header 
            title={CONSTRUCTOR_TEXT.PREVIEW}
            description={CONSTRUCTOR_TEXT.PREVIEW_DESCRIPTION}
            showBackButton={false}
          />
          
          {/* Display deploying message when app is created but not fully loaded */}
          {isAppCreated && isLoading && (
            <div className="ml-4 bg-primary/10 text-primary font-medium text-sm px-4 py-1.5 rounded-full animate-pulse">
              {CONSTRUCTOR_TEXT.APP_DEPLOYING}...
            </div>
          )}
        </div>
        <ActionsDropdown 
          showLogs={showLogs} 
          onToggleLogs={onToggleLogs}
          onShowErrors={handleShowErrors}
        />
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {showErrors ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-lg w-full">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 className="text-lg font-medium text-destructive">Обнаружены ошибки</h2>
              </div>
              <p className="text-base mb-6">
                В приложении обнаружены ошибки, которые могут повлиять на его работу.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleCloseErrors}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 self-end"
                >
                  Вернуться к предпросмотру
                </button>
                <ChatErrorMessage onTryFix={handleTryFix} />
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <LoadingState loadingProgress={loadingProgress} />
        ) : !isAppCreated ? (
          <AppCreationCard onStartCreation={onStartCreation} />
        ) : (
          <AppPreviewCard />
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
