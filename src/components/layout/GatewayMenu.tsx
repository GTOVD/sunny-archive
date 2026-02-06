import React from 'react';
import Link from 'next/link';

const menuItems = [
  { title: 'Archive', href: '/archive', desc: 'The Sacred Lore' },
  { title: 'Gallery', href: '/gallery', desc: 'Artistic Credits' },
  { title: 'Treasury', href: '/treasury', desc: 'Exclusive Goods' },
];

export const GatewayMenu = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col md:flex-row h-auto md:h-48 border-t border-gold/30 bg-navy/40 backdrop-blur-md">
      {menuItems.map((item) => (
        <Link 
          key={item.title} 
          href={item.href}
          className="flex-1 group border-b md:border-b-0 md:border-r border-gold/20 last:border-0 hover:flex-[1.5] transition-all duration-500 ease-in-out p-8 flex flex-col justify-center overflow-hidden"
        >
          <span className="text-gold text-xs tracking-widest uppercase mb-1">{item.desc}</span>
          <h3 className="font-serif text-2xl text-white group-hover:text-gold-light transition-colors duration-300 uppercase tracking-widest">
            {item.title}
          </h3>
        </Link>
      ))}
    </div>
  );
};
