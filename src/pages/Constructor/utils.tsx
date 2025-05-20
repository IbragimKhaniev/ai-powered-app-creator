
import React from 'react';
import { Message } from './types';

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const renderLogLevel = (content: string): JSX.Element | null => {
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

export const createUserMessage = (content: string): Message => {
  return {
    id: Date.now().toString(),
    content,
    isUser: true,
    timestamp: new Date()
  };
};

export const createAIMessage = (content: string): Message => {
  return {
    id: (Date.now() + 1).toString(),
    content,
    isUser: false,
    timestamp: new Date()
  };
};
