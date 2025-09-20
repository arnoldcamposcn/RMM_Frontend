import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return (
    <p className={`paragraph-magazine ${className}`}>
      {children}
    </p>
  );
};

export default Paragraph;
