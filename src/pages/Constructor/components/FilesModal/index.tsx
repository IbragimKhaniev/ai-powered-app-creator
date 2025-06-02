
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { X, File, Folder, FolderOpen, Save } from 'lucide-react';
import { useGetApplicationsIdFiles, useGetApplicationsApplicationIdFilesFile, usePutApplicationsApplicationIdFilesFile } from '@/api/core';
import { FileSystemItem } from '@/api/core/types/fileSystemItem';
import { useToast } from '@/hooks/use-toast';

interface FilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
}

const FilesModal: React.FC<FilesModalProps> = ({
  isOpen,
  onClose,
  applicationId
}) => {
  const { toast } = useToast();
  const [selectedFilePath, setSelectedFilePath] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Fetch files list
  const { data: filesData, isLoading: isLoadingFiles } = useGetApplicationsIdFiles(applicationId, {
    query: { enabled: isOpen }
  });

  // Fetch file content
  const { data: fileData, isLoading: isLoadingFile } = useGetApplicationsApplicationIdFilesFile(
    applicationId,
    { filePath: selectedFilePath },
    {
      query: {
        enabled: Boolean(selectedFilePath),
      }
    }
  );

  // Save file mutation
  const { mutate: saveFile, isPending: isSaving } = usePutApplicationsApplicationIdFilesFile({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Успешно',
          description: 'Файл сохранен',
        });
        setIsEditing(false);
      },
      onError: (error) => {
        console.error('Error saving file:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось сохранить файл',
          variant: 'destructive'
        });
      }
    }
  });

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileSelect = (filePath: string) => {
    setSelectedFilePath(filePath);
  };

  const handleSaveFile = () => {
    if (!selectedFilePath) return;

    saveFile({
      applicationId,
      data: {
        filePath: selectedFilePath,
        content: fileContent
      }
    });
  };

  const renderFileTree = (items: FileSystemItem[], level = 0) => {
    return items?.map((item) => {
      const itemPath = item.path || '';
      const isExpanded = expandedFolders.has(itemPath);

      if (item.type === 'directory') {
        return (
          <div key={itemPath} style={{ marginLeft: `${level * 16}px` }}>
            <div
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded text-sm"
              onClick={() => toggleFolder(itemPath)}
            >
              {isExpanded ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
              <span>{item.name}</span>
            </div>
            {isExpanded && item.children && renderFileTree(item.children, level + 1)}
          </div>
        );
      }

      return (
        <div
          key={itemPath}
          className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded text-sm ${
            selectedFilePath === itemPath ? 'bg-blue-100' : ''
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => handleFileSelect(itemPath)}
        >
          <File className="h-4 w-4" />
          <span>{item.name}</span>
        </div>
      );
    });
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedFilePath('');
      setFileContent('');
      setIsEditing(false);
      setExpandedFolders(new Set());
    }
  }, [isOpen]);

  useEffect(() => {
    setFileContent(fileData?.content || '');
  }, [fileData?.content]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Файлы проекта
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[70vh] gap-4">
          {/* Files tree */}
          <div className="w-1/3 border-r pr-4">
            <ScrollArea className="h-full">
              {isLoadingFiles ? (
                <div className="text-center py-4">Загрузка файлов...</div>
              ) : filesData?.files ? (
                <div className="space-y-1">
                  {renderFileTree(filesData.files)}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">Файлы не найдены</div>
              )}
            </ScrollArea>
          </div>

          {/* File content */}
          <div className="flex-1 flex flex-col min-h-0">
            {selectedFilePath ? (
              <>
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <span className="text-sm font-medium">{selectedFilePath}</span>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        disabled={isLoadingFile}
                      >
                        Редактировать
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFileContent(fileData?.content || '');
                          }}
                        >
                          Отмена
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveFile}
                          disabled={isSaving}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden">
                  {isLoadingFile ? (
                    <div className="text-center py-8">Загрузка содержимого...</div>
                  ) : isEditing ? (
                    <Textarea
                      value={fileContent}
                      onChange={(e) => setFileContent(e.target.value)}
                      className="h-full font-mono text-sm resize-none border overflow-auto"
                      placeholder="Содержимое файла..."
                    />
                  ) : (
                    <div className="h-full border rounded overflow-hidden">
                      <ScrollArea className="h-full w-full">
                        <pre className="text-sm font-mono whitespace-pre-wrap p-4 bg-gray-50 min-h-full">
                          {fileContent || 'Файл пуст'}
                        </pre>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Выберите файл для просмотра
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilesModal;
