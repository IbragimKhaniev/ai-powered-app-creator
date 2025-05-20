
import React from 'react';
import { Log } from '../../types';
import PanelHeader from '../PanelHeader';
import PreviewContent from '../PreviewContent';
import LogsList from '../LogsList';

interface PreviewPanelProps {
  showLogs: boolean;
  onToggleLogs: () => void;
  logs: Log[];
}

const PreviewPanel: React.FC<PreviewPanelProps> = React.memo(({ 
  showLogs, 
  onToggleLogs,
  logs 
}) => {
  return (
    <div className="flex h-full flex-col">
      <PanelHeader showLogs={showLogs} onToggleLogs={onToggleLogs} />
      
      {showLogs ? (
        <LogsList logs={logs} />
      ) : (
        <PreviewContent />
      )}
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
