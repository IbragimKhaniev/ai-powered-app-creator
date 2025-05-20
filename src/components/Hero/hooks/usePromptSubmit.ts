
import { useCallback } from 'react';

/**
 * Custom hook for handling prompt submissions
 */
export const usePromptSubmit = () => {
  const handlePromptSubmit = useCallback((prompt: string, isPublic: boolean) => {
    console.log('Prompt submitted:', prompt, 'Public:', isPublic);
    // Handle prompt submission logic here
  }, []);

  return {
    handlePromptSubmit
  };
};
