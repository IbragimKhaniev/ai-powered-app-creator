
/**
 * Formats a date object to display only hours and minutes
 * @param date Date to format
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Checks if a log entry contains error or warning level
 * @param content Log content to check
 * @returns Boolean indicating if it's an error or warning
 */
export const isErrorOrWarning = (content: string): boolean => {
  return content.includes('[ERROR]') || content.includes('[WARNING]');
};

/**
 * Extracts the actual log message without the log level prefix
 * @param content Log content with level prefix
 * @returns Clean log message
 */
export const cleanLogMessage = (content: string): string => {
  return content.replace(/\[(INFO|WARNING|ERROR|DEBUG)\]\s/, '');
};
