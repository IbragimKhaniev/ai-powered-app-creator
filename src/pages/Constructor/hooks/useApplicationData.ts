
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useGetApplicationsId,
  usePostApplications,
  useGetConfig
} from '@/api/core';

export const useApplicationData = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const applicationId = searchParams.get('appId');

  // Get application details if we have an ID
  const { data: appData, isLoading: isLoadingAppData } = useGetApplicationsId(
    applicationId || '',
    {
      query: {
        enabled: !!applicationId,
        queryKey: ['getApplicationKey', applicationId],
        refetchInterval: 5000, // Poll every 5 seconds
      }
    }
  );

  // Fetch configuration data
  const { data: configData } = useGetConfig({
    query: {
      staleTime: 3600000, // Cache for 1 hour
    }
  });

  // Create application mutation
  const { mutate: createApplication, isPending: isCreatingApp } = usePostApplications({
    mutation: {
      onSuccess: (data) => {
        console.log('Application created:', data);
        toast({
          title: 'Успешно!',
          description: 'Приложение создано',
        });
        window.location.href = `/constructor?appId=${data._id}`;
      },
      onError: (error) => {
        console.error('Error creating application:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось создать приложение',
          variant: 'destructive'
        });
      }
    }
  });

  return {
    applicationId,
    appData,
    isLoadingAppData,
    configData,
    createApplication,
    isCreatingApp
  };
};
