
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Message } from './types';
import { createUserMessage, createAIMessage } from './utils';
import { mockLogs } from './mockData';
import ChatPanel from './components/ChatPanel';
import PreviewPanel from './components/PreviewPanel';
import { toast } from "@/components/ui/sonner";

const Constructor: React.FC = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      content: 'Привет! Я готов помочь вам с созданием вашего приложения. Опишите, что вы хотите создать.', 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  
  const [showLogs, setShowLogs] = useState(false);

  // Extract appId from URL if present
  const appId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('appId');
  }, [location.search]);

  // Effect to load app data when appId is present
  useEffect(() => {
    if (appId) {
      toast.success(`Загружено приложение с ID: ${appId}`);
      console.log(`Loading app with ID: ${appId}`);
    }
  }, [appId]);

  const handleSendMessage = useCallback((content: string) => {
    // Add user message
    const userMessage = createUserMessage(content);
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = createAIMessage('Я получил ваше сообщение. Сейчас я работаю над вашим запросом...');
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);
  }, []);

  const handleToggleLogs = useCallback(() => {
    setShowLogs(prevState => !prevState);
  }, []);

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen"
      >
        {/* Chat Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <ChatPanel 
            messages={messages} 
            onSendMessage={handleSendMessage} 
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Preview/Logs Panel */}
        <ResizablePanel defaultSize={60}>
          <PreviewPanel
            showLogs={showLogs}
            onToggleLogs={handleToggleLogs}
            logs={mockLogs}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Constructor;
