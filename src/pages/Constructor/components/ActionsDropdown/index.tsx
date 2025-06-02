
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Logs, FileText } from "lucide-react";
import { CONSTRUCTOR_TEXT } from '../../constants';
import { useToast } from '@/hooks/use-toast';
import { usePostApplicationsApplicationIdRestart } from '@/api/core';
import { useQueryClient } from '@tanstack/react-query';
import FilesModal from '../FilesModal';

interface ActionsDropdownProps {
  showLogs: boolean;
  onToggleLogs: () => void;
  applicationId?: string | null;
  domain: string;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ 
  showLogs, 
  onToggleLogs,
  applicationId,
  domain
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showFilesModal, setShowFilesModal] = useState(false);

  const { mutate: restartApplication, isPending: isRestarting } = usePostApplicationsApplicationIdRestart({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Успешно',
          description: 'Приложение перезагружено',
        });

        queryClient.invalidateQueries({ queryKey: ['getApplicationKey'] });
      },
      onError: (error) => {
        console.error('Error restarting application:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось перезагрузить приложение',
          variant: 'destructive'
        });
      }
    }
  });

  const handleRestartServer = () => {
    if (!applicationId) {
      toast({
        title: 'Ошибка',
        description: 'Приложение еще не создано',
        variant: 'destructive'
      });
      return;
    }
    
    restartApplication({ applicationId });
  };

  const handleOpenNewTab = () => {
    if (!applicationId) {
      toast({
        title: 'Ошибка',
        description: 'Приложение еще не создано',
        variant: 'destructive'
      });
      return;
    }
    
    // Open application in a new tab
    window.open(domain, '_blank');
  };

  const handleShowFiles = () => {
    if (!applicationId) {
      toast({
        title: 'Ошибка',
        description: 'Приложение еще не создано',
        variant: 'destructive'
      });
      return;
    }
    
    setShowFilesModal(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            {CONSTRUCTOR_TEXT.ACTIONS}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[220px] rounded-xl p-1 border-primary/10 shadow-lg bg-white/95 backdrop-blur-sm"
        >
          <DropdownMenuItem 
            onClick={handleRestartServer}
            disabled={isRestarting || !applicationId}
            className="rounded-lg py-2.5 px-3 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 transition-colors"
          >
            <RefreshCw className={`mr-3 h-4 w-4 ${isRestarting ? 'animate-spin' : 'text-primary'}`} />
            <span>{isRestarting ? 'Перезагрузка...' : CONSTRUCTOR_TEXT.RESTART_SERVER}</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={handleOpenNewTab}
            disabled={!applicationId}
            className="rounded-lg py-2.5 px-3 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 transition-colors"
          >
            <ExternalLink className="mr-3 h-4 w-4 text-primary" />
            <span>{CONSTRUCTOR_TEXT.OPEN_NEW_TAB}</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={handleShowFiles}
            disabled={!applicationId}
            className="rounded-lg py-2.5 px-3 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 transition-colors"
          >
            <FileText className="mr-3 h-4 w-4 text-primary" />
            <span>Файлы проекта</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={onToggleLogs}
            className="rounded-lg py-2.5 px-3 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 transition-colors"
          >
            <Logs className={`mr-3 h-4 w-4 ${showLogs ? 'text-orange-500' : 'text-primary'}`} />
            <span className={showLogs ? 'text-orange-500 font-medium' : ''}>
              {showLogs ? CONSTRUCTOR_TEXT.HIDE_LOGS : CONSTRUCTOR_TEXT.SHOW_LOGS}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {applicationId && (
        <FilesModal
          isOpen={showFilesModal}
          onClose={() => setShowFilesModal(false)}
          applicationId={applicationId}
        />
      )}
    </>
  );
};

export default ActionsDropdown;
