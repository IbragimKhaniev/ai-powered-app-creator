
import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { LoadingPlaceholderProps } from './types';

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({ message }) => {
  return (
    <div className="py-8 flex flex-col items-center gap-4">
      <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default LoadingPlaceholder;
