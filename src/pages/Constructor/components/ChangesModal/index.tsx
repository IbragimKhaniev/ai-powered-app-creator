
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges200 } from "@/api/core";
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

    data.changes.forEach((change, changeIndex) => {
      if (change.content) {
        try {
          const parsedContent = JSON.parse(change.content);
          
          if (Array.isArray(parsedContent)) {
            parsedContent.forEach((item, contentIndex) => {
              const filepath = item.filepath || `Change #${changeIndex + 1}-${contentIndex + 1}`;
              parsedChanges.push({
                filepath,
                changeType: item.type || change.changeType || "unknown",
                content: item.content || change.content,
                createdAt: change.createdAt,
                changeId: `change-${changeIndex}-${contentIndex}`
              });
            });
          } else {
            const filepath = parsedContent.filepath || `Change #${changeIndex + 1}`;
            parsedChanges.push({
              filepath,
              changeType: parsedContent.type || change.changeType || "unknown",
              content: parsedContent.content || change.content,
              createdAt: change.createdAt,
              changeId: `change-${changeIndex}`
            });
          }
        } catch (error) {
          parsedChanges.push({
            filepath: `Change #${changeIndex + 1}`,
            changeType: change.changeType || "text",
            content: change.content,
            createdAt: change.createdAt,
            changeId: change._id || `change-${changeIndex}`
          });
        }
      }
    });

    return parsedChanges;
  };

  const changes = parseChanges();

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
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Изменения промта</DialogTitle>
        </DialogHeader>
        
        {changes.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
            <TabsList className="flex-shrink-0 grid w-full overflow-x-auto" style={{ gridTemplateColumns: `repeat(${changes.length}, minmax(0, 1fr))` }}>
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
                className="flex-1 min-h-0 mt-4"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex-shrink-0 pb-3">
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
                  <CardContent className="flex-1 min-h-0 p-0">
                    <ScrollArea className="h-full w-full">
                      <div className="bg-slate-50 p-4">
                        <pre className="text-sm font-mono whitespace-pre-wrap break-words">
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
