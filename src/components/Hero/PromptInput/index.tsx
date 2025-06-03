
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
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <Input.TextArea
        value={prompt}
        onChange={handlePromptChange}
        onKeyDown={handleKeyDown}
        placeholder={SITE_CONSTANTS.PROMPT_PLACEHOLDER}
        autoSize={{ minRows: 2, maxRows: 6 }}
        className="resize-none border-0 focus:shadow-none text-gray-700 placeholder:text-gray-400"
      />
      <div className="flex justify-between items-center mt-6">
        <button className="text-gray-400 flex items-center gap-2 text-sm hover:text-gray-600 transition-colors font-medium">
          Прикрепить файл
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Публичный</span>
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
