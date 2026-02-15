import React from 'react';

interface MetadataChipProps {
  label: string;
  value: string;
}

/**
 * MetadataChip
 * 
 * A stylized, "Luxury Boutique" metadata display component.
 * Features etched-glass aesthetics and high-fidelity typography.
 */
export const MetadataChip: React.FC<MetadataChipProps> = ({ label, value }) => {
  return (
    <div className="group flex flex-col gap-1.5 p-4 rounded-sm border border-stone-200/60 bg-white/40 backdrop-blur-sm transition-all duration-500 hover:border-stone-300 hover:bg-white/80">
      <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium group-hover:text-stone-500 transition-colors">
        {label}
      </span>
      <span className="text-sm font-serif text-stone-800 tracking-wide">
        {value}
      </span>
    </div>
  );
};
