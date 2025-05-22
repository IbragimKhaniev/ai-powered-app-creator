
import React, { useMemo } from 'react';
import Header from '../Header';
import ActionsDropdown from '../ActionsDropdown';
import AppCreationCard from '../AppCreationCard';
import AppPreviewCard from '../AppPreviewCard';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
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
  deployingError?: string | null;
  onTryFixDeployError?: () => void;
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
  deployingError,
  onTryFixDeployError
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
          {isAppCreated && isLoading && !deployingError && (
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
        {/* Display deployment error alert if exists */}
        {deployingError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Ошибка развертывания</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="text-sm mb-3 whitespace-pre-wrap">{deployingError}</div>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onTryFixDeployError}
              >
                {CONSTRUCTOR_TEXT.TRY_TO_FIX}
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
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
