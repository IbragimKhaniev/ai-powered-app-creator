
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
    <div className="w-full bg-slate-800/60 backdrop-blur-sm border border-slate-600/40 rounded-2xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 p-6 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Input.TextArea
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          placeholder={SITE_CONSTANTS.PROMPT_PLACEHOLDER}
          autoSize={{ minRows: 3, maxRows: 6 }}
          className="resize-none border-0 focus:shadow-none text-white placeholder:text-slate-400 bg-transparent font-light"
          style={{
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important'
          }}
        />
        <div className="flex justify-between items-center mt-4">
          <button className="text-slate-400 flex items-center gap-2 text-sm hover:text-blue-400 transition-colors font-light">
            Прикрепить файл
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300 font-light">Публичный</span>
            <Switch
              size="small"
              checked={isPublic}
              onChange={handleSwitchChange}
            />
          </div>
        </div>
      </div>

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

      <style jsx global>{`
        .ant-input:focus,
        .ant-input-focused {
          background-color: transparent !important;
          border-color: transparent !important;
          box-shadow: none !important;
        }
        
        .ant-input {
          background-color: transparent !important;
          border: none !important;
          color: white !important;
        }
        
        .ant-input::placeholder {
          color: rgb(148 163 184) !important;
        }
      `}</style>
    </div>
  );
});

PromptInput.displayName = 'PromptInput';

export default PromptInput;
