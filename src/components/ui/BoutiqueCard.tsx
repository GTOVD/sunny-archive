'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GLASSMorphism } from '@/styles/glassmorphism';

interface BoutiqueCardProps {
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  isPremium?: boolean;
}

/**
 * A luxury glassmorphism card with motion effects.
 * Part of the 'Luxury Boutique' design language.
 */
export const BoutiqueCard = ({ 
  number, 
  title, 
  description, 
  href, 
  cta, 
  isPremium = false 
}: BoutiqueCardProps) => {
  const styles = isPremium ? GLASSMorphism.premium : GLASSMorphism.card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link href={href} style={{ textDecoration: 'none' }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: styles.background,
          border: styles.border,
          backdropFilter: styles.backdropFilter,
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          transition: styles.transition,
        }}>
          <span style={{ 
            fontFamily: 'Cinzel, serif', 
            fontSize: '0.625rem', 
            letterSpacing: '0.4em', 
            color: 'rgba(212, 175, 55, 0.4)' 
          }}>
            {number}
          </span>
          
          <h3 style={{ 
            fontSize: '1.875rem', 
            fontFamily: 'Playfair Display, serif', 
            color: 'white', 
            margin: 0 
          }}>
            {title}
          </h3>
          
          <p style={{ 
            fontSize: '0.56rem', 
            color: '#64748b', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em', 
            lineHeight: 1.6, 
            margin: 0 
          }}>
            {description}
          </p>
          
          <div style={{ 
            paddingTop: '1.5rem', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <span style={{ 
              color: 'rgba(212, 175, 55, 0.6)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              fontSize: '0.625rem', 
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)' 
            }}>
              {cta}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
