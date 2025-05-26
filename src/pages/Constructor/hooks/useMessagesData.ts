
import { useState, useEffect, useRef } from 'react';
import { useGetApplicationsApplicationIdMessages } from '@/api/core';

export const useMessagesData = (applicationId: string | null) => {
  // Get messages for the current application
  const { data: messages } = useGetApplicationsApplicationIdMessages(applicationId, {
    query: {
      queryKey: ['getMessagesKey', applicationId],
      enabled: !!applicationId,
      refetchInterval: 3000,
    },
  });

  return {
    messages
  };
};
