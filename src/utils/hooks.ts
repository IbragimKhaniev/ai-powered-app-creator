
import { useEffect, useState } from 'react';

/**
 * Custom hook to set document title
 * @param title Page title
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
