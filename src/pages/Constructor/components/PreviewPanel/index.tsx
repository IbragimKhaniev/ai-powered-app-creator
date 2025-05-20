
import React from 'react';
import Header from '../Header';
import ActionsDropdown from '../ActionsDropdown';
import LoadingState from '../LoadingState';
import AppCreationCard from '../AppCreationCard';
import AppPreviewCard from '../AppPreviewCard';
import { CONSTRUCTOR_TEXT } from '../../constants';

interface PreviewPanelProps {
  isLoading: boolean;
  loadingProgress: number;
  isAppCreated: boolean;
  showLogs: boolean;
  onToggleLogs: () => void;
  onStartCreation: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isLoading,
  loadingProgress,
  isAppCreated,
  showLogs,
  onToggleLogs,
  onStartCreation
}) => {
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
        <ActionsDropdown showLogs={showLogs} onToggleLogs={onToggleLogs} />
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {isLoading ? (
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
