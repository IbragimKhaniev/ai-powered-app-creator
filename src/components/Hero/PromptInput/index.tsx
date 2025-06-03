
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

  // Проверка статуса авторизации при монтировании компонента
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
        // Если пользователь не авторизован, показываем диалог
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
    <div className="w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 p-6 hover:border-cyan-400/40 hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Holographic border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -skew-x-12 animate-pulse"></div>
      
      <Input.TextArea
        value={prompt}
        onChange={handlePromptChange}
        onKeyDown={handleKeyDown}
        placeholder={SITE_CONSTANTS.PROMPT_PLACEHOLDER}
        autoSize={{ minRows: 2, maxRows: 6 }}
        className="resize-none border-0 focus:shadow-none text-gray-100 placeholder:text-gray-400 bg-transparent relative z-10"
      />
      <div className="flex justify-between items-center mt-6 relative z-10">
        <button className="text-cyan-400 flex items-center gap-2 text-sm hover:text-cyan-300 transition-colors font-medium">
          Прикрепить файл
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300 font-medium">Публичный</span>
          <Switch
            size="small"
            checked={isPublic}
            onChange={handleSwitchChange}
          />
        </div>
      </div>

      {/* Диалоговое окно авторизации */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Требуется авторизация</DialogTitle>
            <DialogDescription>
              Для создания приложения необходимо авторизоваться в системе.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button variant="outline" onClick={handleCloseDialog}>Отмена</Button>
            <Button onClick={handleAuthRedirect}>Перейти к авторизации</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});

PromptInput.displayName = 'PromptInput';

export default PromptInput;
