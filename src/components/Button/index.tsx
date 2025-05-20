
import React, { useMemo } from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/es/button';
import { cn } from '@/lib/utils';

// Define custom props separate from Ant Design's ButtonProps
interface CustomButtonProps {
  variant?: 'default' | 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

// Combine our custom props with Ant Design's props, but omit 'type' and 'size' to avoid conflicts
interface ButtonProps extends Omit<AntButtonProps, 'type' | 'size'>, CustomButtonProps {}

const Button: React.FC<ButtonProps> = React.memo(({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'outline':
        return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      case 'ghost':
        return 'hover:bg-accent hover:text-accent-foreground';
      default:
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
    }
  }, [variant]);

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'h-8 px-3 text-xs';
      case 'lg':
        return 'h-12 px-6 text-lg';
      default:
        return 'h-10 py-2 px-4';
    }
  }, [size]);

  // Map our custom size and variant to Ant Design compatible props
  const antdSize = useMemo(() => {
    switch (size) {
      case 'sm': return 'small';
      case 'lg': return 'large';
      default: return 'middle';
    }
  }, [size]);

  return (
    <AntButton
      {...props}
      size={antdSize}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClasses,
        sizeClasses,
        className
      )}
    >
      {children}
    </AntButton>
  );
});

Button.displayName = 'Button';

export default Button;
