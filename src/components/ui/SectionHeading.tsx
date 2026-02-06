import React from 'react';

interface SectionHeadingProps {
  title: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, align = 'left' }) => {
  return (
    <div className={`flex items-center gap-4 my-8 ${align === 'center' ? 'justify-center' : ''}`}>
      <h2 className="font-serif text-3xl uppercase tracking-widest text-navy whitespace-nowrap">
        {title}
      </h2>
      <div className="h-[1px] bg-gold flex-grow" />
    </div>
  );
};
