// Glassmorphism effects for 'Luxury Boutique' aesthetic
export const GLASSMorphism = {
  card: {
    background: "rgba(0, 0, 0, 0.6)",
    border: "1px solid rgba(57, 119, 137, 0.2)", /* Using customer bronze #397789 */
    backdropFilter: "blur(12px)",
    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    "&:hover": {
      background: "rgba(57, 17, 25, 0.3)", /* Using customer deep accent #391119 */
      borderColor: "rgba(57, 119, 137, 0.4)",
      transform: "translateY(-4px)"
    }
  },
  premium: {
    background: "rgba(0, 0, 0, 0.6)",
    border: "1px solid rgba(57, 119, 137, 0.4)",
    backdropFilter: "blur(12px)",
    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    "&:hover": {
      background: "rgba(57, 17, 25, 0.4)",
      borderColor: "rgba(57, 119, 137, 0.6)",
      transform: "translateY(-4px)"
    }
  }
};
