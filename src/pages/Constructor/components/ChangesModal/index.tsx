
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

interface ParsedChange {
  filepath: string;
  changeType: string;
  content: string;
  createdAt?: string;
  changeId: string;
}

const ChangesModal: React.FC<ChangesModalProps> = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState<string>("");

  const parseChanges = (): ParsedChange[] => {
    if (!data?.changes) return [];

    const parsedChanges: ParsedChange[] = [];

    data.changes.forEach((change, index) => {
      if (change.content) {
        try {
          // Пытаемся распарсить content как JSON
          const parsedContent = JSON.parse(change.content);
          
          // Извлекаем filepath из распарсенного содержимого
          const filepath = parsedContent.filepath || `Change #${index + 1}`;
          
          parsedChanges.push({
            filepath,
            changeType: change.changeType || "unknown",
            content: change.content,
            createdAt: change.createdAt,
            changeId: change._id || `change-${index}`
          });
        } catch (error) {
          // Если не удается распарсить как JSON, используем fallback
          parsedChanges.push({
            filepath: `Change #${index + 1}`,
            changeType: change.changeType || "text",
            content: change.content,
            createdAt: change.createdAt,
            changeId: change._id || `change-${index}`
          });
        }
      }
    });

    return parsedChanges;
  };

  const changes = parseChanges();

  // Устанавливаем первую вкладку как активную при открытии
  if (changes.length > 0 && !activeTab) {
    setActiveTab(changes[0].changeId);
  }

  const formatContent = (content: string) => {
    try {
      const jsonData = JSON.parse(content);
      return JSON.stringify(jsonData, null, 2);
    } catch (error) {
      return content;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Изменения промта</DialogTitle>
        </DialogHeader>
        
        {changes.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[75vh]">
            <TabsList className="grid w-full overflow-x-auto" style={{ gridTemplateColumns: `repeat(${changes.length}, minmax(0, 1fr))` }}>
              {changes.map((change) => (
                <TabsTrigger 
                  key={change.changeId}
                  value={change.changeId}
                  className="text-sm truncate max-w-48"
                >
                  {change.filepath}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {changes.map((change) => (
              <TabsContent 
                key={change.changeId}
                value={change.changeId}
                className="h-full"
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <CardTitle className="text-lg">{change.filepath}</CardTitle>
                      <Badge variant="outline">{change.changeType}</Badge>
                      {change.createdAt && (
                        <Badge variant="secondary">
                          {new Date(change.createdAt).toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-120px)]">
                    <ScrollArea className="h-full w-full">
                      <div className="bg-slate-50 p-4 h-full">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
                          {formatContent(change.content)}
                        </pre>
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
