
import { UserApp } from "../types";

/**
 * Calculate the percentage of tokens used
 */
export const calculateTokenPercentage = (used: number, total: number): number => {
  if (total === 0) return 0;
  return (used / total) * 100;
};

/**
 * Format date string to a more readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU').format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};
