import React from 'react';

const Alert = ({ className, variant = "default", ...props }) => {
  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 ${
        variant === "destructive" 
          ? "border-destructive/50 text-destructive dark:border-destructive" 
          : "bg-background text-foreground"
      } ${className}`}
      {...props}
    />
  );
};

const AlertTitle = ({ className, ...props }) => {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    />
  );
};

const AlertDescription = ({ className, ...props }) => {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  );
};

export { Alert, AlertTitle, AlertDescription };