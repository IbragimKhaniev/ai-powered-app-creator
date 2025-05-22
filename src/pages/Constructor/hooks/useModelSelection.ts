
import { useState, useEffect, useCallback } from 'react';

export const useModelSelection = (defaultModel: string = 'gpt-4o', availableModels: string[] = []) => {
  const [selectedModel, setSelectedModel] = useState<string>(defaultModel);

  // Set default model when available models change
  useEffect(() => {
    if (availableModels && availableModels.length > 0) {
      setSelectedModel(availableModels[0]);
    }
  }, [availableModels]);

  const handleModelChange = useCallback((model: string) => {
    setSelectedModel(model);
  }, []);

  return {
    selectedModel,
    handleModelChange
  };
};
