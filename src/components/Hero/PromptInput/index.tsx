
import React, { useState, useCallback } from 'react';
import { Input, Switch } from 'antd';
import { SITE_CONSTANTS } from '@/config/constants';

interface PromptInputProps {
  onSubmit?: (prompt: string, isPublic: boolean) => void;
}

const PromptInput: React.FC<PromptInputProps> = React.memo(({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }, []);

  const handleSwitchChange = useCallback((checked: boolean) => {
    setIsPublic(checked);
  }, []);

  const handleSubmit = useCallback(() => {
    if (prompt.trim() && onSubmit) {
      onSubmit(prompt, isPublic);
    }
  }, [prompt, isPublic, onSubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-5">
      <Input.TextArea
        value={prompt}
        onChange={handlePromptChange}
        onKeyDown={handleKeyDown}
        placeholder={SITE_CONSTANTS.PROMPT_PLACEHOLDER}
        autoSize={{ minRows: 2, maxRows: 6 }}
        className="resize-none border-0 focus:shadow-none"
      />
      <div className="flex justify-between items-center mt-5">
        <button className="text-gray-500 flex items-center gap-2 text-sm hover:text-gray-700 transition-colors">
          <span className="i-lucide-paperclip h-4 w-4"></span>
          Attach
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Public</span>
          <Switch
            size="small"
            checked={isPublic}
            onChange={handleSwitchChange}
          />
        </div>
      </div>
    </div>
  );
});

PromptInput.displayName = 'PromptInput';

export default PromptInput;
