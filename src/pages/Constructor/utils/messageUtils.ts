
import { Message } from '../types';

/**
 * Creates a new user message
 * @param content Message content
 * @returns Message object
 */
export const createUserMessage = (content: string): Message => {
  return {
    id: Date.now().toString(),
    content,
    isUser: true,
    timestamp: new Date()
  };
};

/**
 * Creates a new AI message
 * @param content Message content
 * @param isError Optional flag to indicate if it's an error message
 * @returns Message object
 */
export const createAiMessage = (content: string, isError?: boolean): Message => {
  return {
    id: (Date.now() + 1).toString(),
    content,
    isUser: false,
    timestamp: new Date(),
    isError
  };
};
