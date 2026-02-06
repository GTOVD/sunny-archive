import React from 'react';

interface GildedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export const GildedButton: React.FC<GildedButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-2 border transition-all duration-300 tracking-widest uppercase font-sans text-sm";
  const variants = {
    primary: "bg-navy text-gold border-gold hover:bg-gold hover:text-white",
    ghost: "bg-transparent text-navy border-gold hover:bg-gold hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
