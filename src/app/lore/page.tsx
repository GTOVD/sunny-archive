import InteractiveTerminal from '@/components/lore/InteractiveTerminal';
import { getLoreMetadata } from '@/lib/shopify';

/**
 * Lore Page - The Sacred Vault / Interactive Terminal
 * A high-fidelity, interactive terminal for exploring the Sunny Archive lore.
 * Dec 2026 Update: Gated behind Fallout-style hacking mini-game.
 */
export default async function LorePage() {
  // Fetch dynamic lore from Shopify Storefront API
  const dynamicLore = await getLoreMetadata();

  return (
    <div className="min-h-screen bg-[#020617] text-[#397789] p-4 md:p-8 pt-24 overflow-hidden font-mono selection:bg-[#d4af37] selection:text-[#020617]">
      {/* Background Phosphor Glow */}
      <div className="fixed inset-0 bg-[#020617] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,119,137,0.05)_0%,transparent_100%)] -z-10 pointer-events-none" />

      <InteractiveTerminal dynamicLore={dynamicLore} />
    </div>
  );
}
