import { useGetConfig } from "@/api/core";
import { ExtendedApplicationData } from "../../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModelSelection } from "../../hooks";
import Button from "@/components/Button";
import { Check, Loader2 } from "lucide-react";

interface IChangeModelAiProps {
  application: ExtendedApplicationData;

  disabled?: boolean;
}

export const ChangeModelAi = ({ application, disabled }: IChangeModelAiProps) => {
  // Получаем конфигурацию с моделями
  const { data: config } = useGetConfig();
  
  // Хук для работы с выбором модели
  const {
    selectedModel,
    isChangingModel,
    showConfirmButton,
    handleModelChange,
    confirmModelChange
  } = useModelSelection(application._id, application.modelAi);
  
  return (
    <div className="px-4 pb-2 border-b">
      <div className="flex items-center gap-3">
        <div className="min-w-[150px]">
          <Select value={selectedModel} onValueChange={handleModelChange} disabled={disabled}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите модель" />
            </SelectTrigger>
            <SelectContent>
              {config?.modelsAi?.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showConfirmButton && (
          <Button
            onClick={confirmModelChange}
            disabled={isChangingModel}
            size="sm"
            className="bg-green-600 hover:bg-green-700 self-end"
          >
            {isChangingModel ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
