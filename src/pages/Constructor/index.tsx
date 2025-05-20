
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, RefreshCw, ExternalLink, Logs } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Constructor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      content: 'Привет! Я готов помочь вам с созданием вашего приложения. Опишите, что вы хотите создать.', 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
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
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen"
      >
        {/* Chat Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h2 className="text-xl font-bold">Чат с ИИ</h2>
              <p className="text-sm text-muted-foreground">Опишите что вы хотите создать</p>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="mb-1">{message.content}</div>
                      <div className={`text-xs ${message.isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t p-4">
              <div className="flex flex-col gap-2">
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
                  className="min-h-[80px] resize-none"
                />
                <Button onClick={handleSendMessage} className="self-end">
                  <Send className="h-4 w-4 mr-2" />
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Preview Panel */}
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Превью</h2>
                <p className="text-sm text-muted-foreground">Здесь будет отображаться разрабатываемое приложение</p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Действия
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Перезапустить сервер
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Открыть в новой вкладке
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Logs className="mr-2 h-4 w-4" />
                    Прочитать логи
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              <div className="h-full flex items-center justify-center">
                <Card className="w-full max-w-md p-8 text-center">
                  <h3 className="text-xl font-medium mb-4">Превью создаваемого приложения</h3>
                  <p className="text-muted-foreground mb-6">
                    По мере развития вашего диалога с ИИ, здесь будет отображаться интерфейс разрабатываемого приложения.
                  </p>
                  <div className="p-8 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">Область предпросмотра приложения</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Constructor;
