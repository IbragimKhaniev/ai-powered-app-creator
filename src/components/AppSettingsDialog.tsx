
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AppSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: AppSettings) => void;
}

export interface AppSettings {
  appName: string;
  aiModel: string;
  appType: string;
}

const AppSettingsDialog: React.FC<AppSettingsDialogProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [settings, setSettings] = useState<AppSettings>({
    appName: "Новое приложение",
    aiModel: "gpt-4o",
    appType: "web",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(settings);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Настройки нового приложения</DialogTitle>
          <DialogDescription>
            Заполните базовые настройки для вашего нового приложения
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appName" className="text-right">
                Название
              </Label>
              <Input
                id="appName"
                value={settings.appName}
                onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                className="col-span-3"
                placeholder="Введите название приложения"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="aiModel" className="text-right">
                Модель ИИ
              </Label>
              <Select
                value={settings.aiModel}
                onValueChange={(value) => setSettings({ ...settings, aiModel: value })}
              >
                <SelectTrigger id="aiModel" className="col-span-3">
                  <SelectValue placeholder="Выберите модель ИИ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appType" className="text-right">
                Тип приложения
              </Label>
              <Select
                value={settings.appType}
                onValueChange={(value) => setSettings({ ...settings, appType: value })}
              >
                <SelectTrigger id="appType" className="col-span-3">
                  <SelectValue placeholder="Выберите тип приложения" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Веб-приложение</SelectItem>
                  <SelectItem value="mobile">Мобильное приложение</SelectItem>
                  <SelectItem value="desktop">Десктопное приложение</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="rounded-full">
              Создать приложение
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppSettingsDialog;
