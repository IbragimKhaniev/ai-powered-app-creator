
import React, { useState, useEffect, useRef } from 'react';

interface TypedMessageProps {
  content: string;
  className?: string;
  showAnimation: boolean;
  typingSpeed?: number;
  showPulseAlways?: boolean;
}

const TypedMessage: React.FC<TypedMessageProps> = ({
  content,
  className = '',
  showAnimation = true,
  typingSpeed = 20,
  showPulseAlways
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(!showAnimation);
  const contentRef = useRef(content);

  useEffect(() => {
    // If animation should not be shown, display entire content immediately
    if (!showAnimation) {
      setDisplayedContent(content);
      setIsComplete(true);
      return;
    }

    let currentIndex = 0;
    const totalLength = content.length;

    const typingInterval = setInterval(() => {
      if (currentIndex < totalLength) {
        setDisplayedContent(prev => content.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [content, showAnimation, typingSpeed]);

  return (
    <div className={className}>
      {displayedContent}
      {(!isComplete || showPulseAlways) && <span className="animate-pulse">▌</span>}
    </div>
  );
};

export default TypedMessage;
