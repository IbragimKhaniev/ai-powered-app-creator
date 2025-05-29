
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges200, IMongoModelChange } from "@/api/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface ChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges200 | undefined;
}

interface ParsedFileChange {
  filepath: string;
  type: string;
  content: string;
  change: IMongoModelChange;
}

const ChangesModal: React.FC<ChangesModalProps> = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState<string>("");

  const parseFileChanges = (): ParsedFileChange[] => {
    if (!data?.changes) return [];

    const fileChanges: ParsedFileChange[] = [];

    data.changes.forEach((change) => {
      if (change.content) {
        try {
          const parsedContent = JSON.parse(change.content);
          
          // Если это объект с информацией о файле
          if (parsedContent.filepath && parsedContent.type) {
            fileChanges.push({
              filepath: parsedContent.filepath,
              type: parsedContent.type,
              content: parsedContent.content || parsedContent.code || "",
              change
            });
          } else if (typeof parsedContent === 'object') {
            // Если это просто JSON объект без структуры файла
            fileChanges.push({
              filepath: `Change #${fileChanges.length + 1}`,
              type: change.changeType || "unknown",
              content: JSON.stringify(parsedContent, null, 2),
              change
            });
          }
        } catch (error) {
          // Если не удается распарсить как JSON, добавляем как текст
          fileChanges.push({
            filepath: `Change #${fileChanges.length + 1}`,
            type: change.changeType || "text",
            content: change.content,
            change
          });
        }
      }
    });

    return fileChanges;
  };

  const fileChanges = parseFileChanges();

  // Устанавливаем первую вкладку как активную при открытии
  if (fileChanges.length > 0 && !activeTab) {
    setActiveTab(fileChanges[0].filepath);
  }

  const renderCode = (content: string, type: string) => {
    // Если тип указывает на JSON или код выглядит как JSON
    if (type === 'json' || (content.trim().startsWith('{') && content.trim().endsWith('}'))) {
      try {
        const jsonData = JSON.parse(content);
        return (
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        );
      } catch (error) {
        // Если не удается распарсить, показываем как есть
      }
    }

    return (
      <pre className="text-sm font-mono whitespace-pre-wrap">
        {content}
      </pre>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Изменения промта</DialogTitle>
        </DialogHeader>
        
        {fileChanges.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[75vh]">
            <TabsList className="grid w-full grid-cols-auto overflow-x-auto">
              {fileChanges.map((fileChange, index) => (
                <TabsTrigger 
                  key={`${fileChange.filepath}-${index}`}
                  value={fileChange.filepath}
                  className="text-sm truncate max-w-48"
                >
                  {fileChange.filepath}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {fileChanges.map((fileChange, index) => (
              <TabsContent 
                key={`${fileChange.filepath}-${index}`}
                value={fileChange.filepath}
                className="h-full"
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <CardTitle className="text-lg">{fileChange.filepath}</CardTitle>
                      <Badge variant="outline">{fileChange.type}</Badge>
                      {fileChange.change.createdAt && (
                        <Badge variant="secondary">
                          {new Date(fileChange.change.createdAt).toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-120px)]">
                    <ScrollArea className="h-full w-full">
                      <div className="bg-slate-50 p-4 h-full">
                        {renderCode(fileChange.content, fileChange.type)}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Изменения не найдены
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChangesModal;
