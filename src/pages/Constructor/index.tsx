import React, { useState, useCallback, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, RefreshCw, ExternalLink, Logs, ArrowLeft, Loader, MessageSquarePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { showErrorToast } from "@/components/ui/error-toast";
import ChatErrorMessage from "@/components/ui/chat-error-message";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

interface LogEntry {
  id: string;
  content: string;
  timestamp: Date;
}

// Моковые данные для логов
const mockLogs = [
  { id: '1', content: '[INFO] Server started on port 3000', timestamp: new Date('2025-05-20T10:00:00') },
  { id: '2', content: '[INFO] Application initialized successfully', timestamp: new Date('2025-05-20T10:00:05') },
  { id: '3', content: '[INFO] User authentication successful', timestamp: new Date('2025-05-20T10:15:22') },
  { id: '4', content: '[WARNING] Memory usage is high (85%)', timestamp: new Date('2025-05-20T10:30:15') },
  { id: '5', content: '[ERROR] Failed to connect to database', timestamp: new Date('2025-05-20T10:45:30') },
  { id: '6', content: '[INFO] Database connection reestablished', timestamp: new Date('2025-05-20T10:46:25') },
  { id: '7', content: '[INFO] New user registered: user@example.com', timestamp: new Date('2025-05-20T11:00:00') },
  { id: '8', content: '[DEBUG] Processing request: GET /api/users', timestamp: new Date('2025-05-20T11:15:10') },
  { id: '9', content: '[INFO] Request completed in 120ms', timestamp: new Date('2025-05-20T11:15:11') },
  { id: '10', content: '[INFO] Show more projects', timestamp: new Date('2025-05-20T19:49:26') }
];

const Constructor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      content: 'Привет! Я готов помочь вам с созданием вашего приложения. Опишите, что вы хотите создать.', 
      isUser: false, 
      timestamp: new Date() 
    },
    {
      id: '2',
      content: 'Приложение имеет ошибки',
      isUser: false,
      timestamp: new Date(),
      isError: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAppCreated, setIsAppCreated] = useState(false);

  // Имитация загрузки приложения
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 500); // Небольшая задержка перед показом содержимого
            return 100;
          }
          return newProgress;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Демонстрация вызова toast при загрузке компонента
  useEffect(() => {
    // Для демонстрационных целей показываем ошибку через 2 секунды после загрузки
    const timer = setTimeout(() => {
      showErrorToast({
        onTryFix: () => {
          console.log("Attempting to fix errors");
          // Здесь можно было бы добавить логику исправления ошибок
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTryFix = () => {
    console.log("Attempting to fix errors");
    // Here you could add logic to fix errors
    
    // Add a response message
    const fixResponseMessage: Message = {
      id: Date.now().toString(),
      content: 'Я пытаюсь исправить ошибки в приложении...',
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, fixResponseMessage]);
  };
  
  const handleTryFixLog = (logContent: string) => {
    console.log(`Attempting to fix: ${logContent}`);
    
    // Add a response message about fixing the specific log issue
    const fixLogResponseMessage: Message = {
      id: Date.now().toString(),
      content: `Я пытаюсь исправить проблему: ${logContent.replace(/\[(INFO|WARNING|ERROR|DEBUG)\]\s/, '')}`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, fixLogResponseMessage]);
    
    // Optional: Switch back to chat view to show the response
    setShowLogs(false);
  };

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Set app as created once user sends a message
    if (!isAppCreated) {
      setIsAppCreated(true);
    }
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Я получил ваше сообщение. Сейчас я работаю над вашим запросом...',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  }, [inputMessage, isAppCreated]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleToggleLogs = useCallback(() => {
    setShowLogs(!showLogs);
  }, [showLogs]);

  const isErrorOrWarning = (content: string) => {
    return content.includes('[ERROR]') || content.includes('[WARNING]');
  };

  const renderLogLevel = (content: string) => {
    if (content.includes('[INFO]')) {
      return <span className="text-blue-500 font-medium">[INFO]</span>;
    } else if (content.includes('[WARNING]')) {
      return <span className="text-yellow-500 font-medium">[WARNING]</span>;
    } else if (content.includes('[ERROR]')) {
      return <span className="text-red-500 font-medium">[ERROR]</span>;
    } else if (content.includes('[DEBUG]')) {
      return <span className="text-green-500 font-medium">[DEBUG]</span>;
    }
    return null;
  };

  return (
    <div className="h-screen w-full bg-background">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen"
      >
        {/* Chat Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4 flex justify-between items-center bg-white">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2" 
                  asChild
                >
                  <Link to="/profile">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Назад к профилю</span>
                  </Link>
                </Button>
                <div>
                  <h2 className="text-xl font-bold">Чат с ИИ</h2>
                  <p className="text-sm text-muted-foreground">Опишите что вы хотите создать</p>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4 bg-background">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.isError ? (
                      <ChatErrorMessage 
                        message={message.content} 
                        onTryFix={handleTryFix}
                      />
                    ) : (
                      <div
                        className={`max-w-[80%] rounded-xl p-4 ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-white border border-gray-100 shadow-sm'
                        }`}
                      >
                        <div className="mb-1">{message.content}</div>
                        <div className={`text-xs ${message.isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t p-4 bg-white">
              <div className="relative">
                <Textarea
                  placeholder="Введите сообщение..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="min-h-[80px] resize-none pr-12 rounded-xl border-gray-200 focus:border-blue-300 shadow-sm"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="absolute bottom-3 right-3 rounded-full w-8 h-8 p-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Preview/Logs Panel */}
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4 flex justify-between items-center bg-white">
              <div className="flex items-center">
                {showLogs && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleToggleLogs} 
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Назад</span>
                  </Button>
                )}
                <div>
                  <h2 className="text-xl font-bold">{showLogs ? "Логи" : "Превью"}</h2>
                  <p className="text-sm text-muted-foreground">
                    {showLogs 
                      ? "Просмотр логов приложения" 
                      : "Здесь будет отображаться разрабатываемое приложение"}
                  </p>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Действия
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] rounded-xl">
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Перезапустить сервер
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Открыть в новой вкладке
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleToggleLogs}>
                    <Logs className="mr-2 h-4 w-4" />
                    {showLogs ? "Скрыть логи" : "Прочитать логи"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {showLogs ? (
              <ScrollArea className="flex-1 p-4 bg-gray-50">
                <div className="space-y-2">
                  {mockLogs.map((log) => (
                    <div key={log.id} className="font-mono text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <div>
                            {renderLogLevel(log.content)} 
                            <span className="ml-2">{log.content.replace(/\[(INFO|WARNING|ERROR|DEBUG)\]\s/, '')}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatTime(log.timestamp)}
                          </div>
                        </div>
                        
                        {isErrorOrWarning(log.content) && (
                          <Button 
                            onClick={() => handleTryFixLog(log.content)}
                            className="bg-orange-500 hover:bg-orange-600 text-white mt-1 self-start rounded-full"
                            size="sm"
                          >
                            Попробовать исправить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 overflow-auto p-6 bg-gray-50">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Card className="w-full max-w-md p-8 text-center shadow-card">
                      <h3 className="text-xl font-medium mb-4">Ваше приложение разворачивается</h3>
                      <div className="flex justify-center mb-6">
                        <Loader className="h-10 w-10 animate-spin text-blue-500" />
                      </div>
                      <Progress value={loadingProgress} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">{loadingProgress}% завершено</p>
                    </Card>
                  </div>
                ) : !isAppCreated ? (
                  <div className="h-full flex items-center justify-center">
                    <Card className="w-full max-w-md p-8 text-center shadow-card">
                      <h3 className="text-xl font-medium mb-4">Создайте свое приложение</h3>
                      <div className="flex justify-center mb-6">
                        <MessageSquarePlus className="h-16 w-16 text-blue-200" />
                      </div>
                      <p className="text-muted-foreground mb-6">
                        Создайте свое приложение просто написав сообщение в чат
                      </p>
                      <Button 
                        onClick={() => document.querySelector('textarea')?.focus()}
                        className="w-full rounded-full bg-blue-500 hover:bg-blue-600"
                      >
                        Начать создание
                      </Button>
                    </Card>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <Card className="w-full max-w-md p-8 text-center shadow-card">
                      <h3 className="text-xl font-medium mb-4">Превью создаваемого приложения</h3>
                      <p className="text-muted-foreground mb-6">
                        По мере развития вашего диалога с ИИ, здесь будет отображаться интерфейс разрабатываемого приложения.
                      </p>
                      <div className="p-8 border border-dashed rounded-lg border-gray-200">
                        <p className="text-muted-foreground">Область предпросмотра приложения</p>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Constructor;
