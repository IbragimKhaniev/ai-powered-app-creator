
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

interface ChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges200 | undefined;
}

const ChangesModal: React.FC<ChangesModalProps> = ({ isOpen, onClose, data }) => {
  const parseContent = (content: string) => {
    try {
      return JSON.parse(content);
    } catch (error) {
      return content;
    }
  };

  const renderJsonContent = (jsonData: any, depth = 0) => {
    if (typeof jsonData === 'string') {
      return <span className="text-green-600">"{jsonData}"</span>;
    }
    
    if (typeof jsonData === 'number') {
      return <span className="text-blue-600">{jsonData}</span>;
    }
    
    if (typeof jsonData === 'boolean') {
      return <span className="text-purple-600">{jsonData.toString()}</span>;
    }
    
    if (jsonData === null) {
      return <span className="text-gray-500">null</span>;
    }
    
    if (Array.isArray(jsonData)) {
      return (
        <div className="ml-4">
          <span className="text-gray-700">[</span>
          {jsonData.map((item, index) => (
            <div key={index} className="ml-4">
              {renderJsonContent(item, depth + 1)}
              {index < jsonData.length - 1 && <span className="text-gray-700">,</span>}
            </div>
          ))}
          <span className="text-gray-700">]</span>
        </div>
      );
    }
    
    if (typeof jsonData === 'object') {
      return (
        <div className="ml-4">
          <span className="text-gray-700">{'{'}</span>
          {Object.entries(jsonData).map(([key, value], index, array) => (
            <div key={key} className="ml-4">
              <span className="text-red-600">"{key}"</span>
              <span className="text-gray-700">: </span>
              {renderJsonContent(value, depth + 1)}
              {index < array.length - 1 && <span className="text-gray-700">,</span>}
            </div>
          ))}
          <span className="text-gray-700">{'}'}</span>
        </div>
      );
    }
    
    return <span>{String(jsonData)}</span>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Изменения промта</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full">
          {data?.changes && data.changes.length > 0 ? (
            <div className="space-y-4">
              {data.changes.map((change, index) => {
                const parsedContent = parseContent(change.content || '');
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        Изменение #{index + 1}
                        <Badge variant="outline">
                          {change.createdAt ? new Date(change.createdAt).toLocaleString() : 'Неизвестно'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
                          {typeof parsedContent === 'object' ? 
                            renderJsonContent(parsedContent) : 
                            parsedContent
                          }
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Изменения не найдены
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ChangesModal;
