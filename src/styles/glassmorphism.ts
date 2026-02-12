// Glassmorphism effects for 'Luxury Boutique' aesthetic
export const GLASSMorphism = {
  card: {
    background: "rgba(15, 23, 42, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    "&:hover": {
      background: "rgba(15, 23, 42, 0.7)",
      borderColor: "rgba(212, 175, 55, 0.2)",
      transform: "translateY(-4px)"
    }
  },
  premium: {
    background: "rgba(15, 23, 42, 0.5)",
    border: "1px solid rgba(212, 175, 55, 0.1)",
    backdropFilter: "blur(12px)",
    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    "&:hover": {
      background: "rgba(15, 23, 42, 0.7)",
      borderColor: "rgba(212, 175, 55, 0.3)",
      transform: "translateY(-4px)"
    }
  }
};
