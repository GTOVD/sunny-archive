// Framer Motion variants for 'Vault Opening' experience
export const VAULT_ANIMATIONS = {
  reveal: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  },
  stagger: {
    visible: { transition: { staggerChildren: 0.1 } }
  }
};
