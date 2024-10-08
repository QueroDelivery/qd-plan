import React from 'react';
import { cn } from 'src/config/lib/shadcn/utils';

type HeadingProps = {
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h1
      className={cn(
        'text-xl md:text-2xl font-bold text-purple-500 px-6 py-4',
        className
      )}
    >
      {children}
    </h1>
  );
};

export { Heading };
