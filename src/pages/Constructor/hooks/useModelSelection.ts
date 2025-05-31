
import { useState, useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { usePutApplicationsApplicationId } from '@/api/core';

export const useModelSelection = (applicationId: string | null, currentModel?: string) => {
  const [selectedModel, setSelectedModel] = useState(currentModel || '');

  const isShownConfirmButton = useMemo(() => selectedModel !== currentModel, [currentModel, selectedModel]);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateApplication, isPending: isChangingModel } = usePutApplicationsApplicationId({
    mutation: {
      onSuccess() {
        toast({
          title: 'Модель изменена',
          description: `ИИ модель изменена на ${selectedModel}`,
        });
  
        queryClient.invalidateQueries({ queryKey: ['getApplicationKey'] });
      },
      onError(error) {
        console.error('Error updating application:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить приложение',
          variant: 'destructive'
        });
      },
    }
  });

  const handleModelChange = useCallback((newModel: string) => {
    setSelectedModel(newModel);
  }, []);

  const confirmModelChange = useCallback(async () => {
    if (!applicationId || !selectedModel) return;
    
    updateApplication({
      applicationId,
      data: { modelAi: selectedModel }
    });
  }, [applicationId, selectedModel, updateApplication]);

  return {
    selectedModel,
    isChangingModel,
    showConfirmButton: isShownConfirmButton,
    handleModelChange,
    confirmModelChange
  };
};
