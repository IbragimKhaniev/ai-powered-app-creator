
import React, { useMemo } from 'react';
import Header from '../Header';
import ActionsDropdown from '../ActionsDropdown';
import AppCreationCard from '../AppCreationCard';
import AppPreviewCard from '../AppPreviewCard';
import { CONSTRUCTOR_TEXT } from '../../constants';

interface PreviewPanelProps {
  isLoading: boolean;
  isAppCreated: boolean;
  showLogs: boolean;
  onToggleLogs: () => void;
  onStartCreation: () => void;
  domain: string;
  keyIframe: string;
  applicationId?: string | null;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isLoading,
  isAppCreated,
  showLogs,
  onToggleLogs,
  onStartCreation,
  domain,
  keyIframe,
  applicationId,
}) => {
  const parsedDir = useMemo(() => `https://${domain}.easyappz.ru`, [domain]);

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
          applicationId={applicationId}
        />
      </div>

      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {isLoading ? <AppPreviewCard /> : !isAppCreated ? <AppCreationCard onStartCreation={onStartCreation} /> : (
          <iframe
            key={keyIframe}
            id="preview-iframe"
            src={parsedDir}
            className="w-full h-full rounded-lg bg-white"
            title="Превью"
            sandbox="allow-scripts allow-forms"
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
