
import React, { useState, useCallback, useEffect } from 'react';
import { Input, Switch } from 'antd';
import { SITE_CONSTANTS } from '@/config/constants';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface PromptInputProps {
  onSubmit?: (prompt: string, isPublic: boolean) => void;
}

const PromptInput: React.FC<PromptInputProps> = React.memo(({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }, []);

  const handleSwitchChange = useCallback((checked: boolean) => {
    setIsPublic(checked);
  }, []);

  const handleSubmit = useCallback(() => {
    if (prompt.trim()) {
      if (isAuthenticated && onSubmit) {
        onSubmit(prompt, isPublic);
      } else {
        setShowAuthDialog(true);
      }
    }
  }, [prompt, isPublic, onSubmit, isAuthenticated]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const handleAuthRedirect = useCallback(() => {
    navigate('/auth');
    setShowAuthDialog(false);
  }, [navigate]);

  const handleCloseDialog = useCallback(() => {
    setShowAuthDialog(false);
  }, []);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-xl border border-gray-700/30 rounded-3xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 p-8 relative overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-50"></div>
        
        <div className="relative z-10">
          <Input.TextArea
            value={prompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
            placeholder={SITE_CONSTANTS.PROMPT_PLACEHOLDER}
            autoSize={{ minRows: 4, maxRows: 8 }}
            className="resize-none border-0 focus:shadow-none text-white placeholder:text-gray-400 bg-transparent font-light text-lg"
            styles={{
              textarea: {
                backgroundColor: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important',
                color: 'white !important'
              }
            }}
          />
          <div className="flex justify-between items-center mt-6">
            <button className="text-gray-400 flex items-center gap-3 text-sm hover:text-blue-400 transition-colors font-light">
              <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
              Прикрепить файл
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80 font-light">Публичный</span>
              <Switch
                size="small"
                checked={isPublic}
                onChange={handleSwitchChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 border-gray-700/50">
          <DialogHeader>
            <DialogTitle className="text-white">Требуется авторизация</DialogTitle>
            <DialogDescription className="text-gray-400">
              Для создания приложения необходимо авторизоваться в системе.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button variant="outline" onClick={handleCloseDialog} className="border-gray-600 text-white hover:bg-gray-800">Отмена</Button>
            <Button onClick={handleAuthRedirect} className="bg-blue-600 hover:bg-blue-700">Перейти к авторизации</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

PromptInput.displayName = 'PromptInput';

export default PromptInput;
