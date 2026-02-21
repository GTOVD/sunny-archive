import React from 'react';

interface ProvenanceData {
  birthDate: string;
  craftsman: string;
  loreHash: string;
  originNode: string;
}

interface SacredProvenanceProps {
  artifactName: string;
  provenance: ProvenanceData;
}

/**
 * SacredProvenance Component
 * Displays the immutable history and verification data for a Treasury artifact.
 * Part of the 'Luxury Boutique' high-fidelity interaction substrate.
 */
const SacredProvenance: React.FC<SacredProvenanceProps> = ({ artifactName, provenance }) => {
  return (
    <div className="sacred-provenance-container p-6 border border-[#397789]/20 bg-black/40 backdrop-blur-md rounded-lg">
      <div className="flex items-center justify-between mb-6 border-b border-[#397789]/10 pb-4">
        <h3 className="text-lg font-['Cinzel'] tracking-[0.2em] text-[#397789] uppercase">
          Sacred Provenance
        </h3>
        <div className="status-indicator flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#397789] animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-[#397789]/60">Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="provenance-field">
          <label className="block text-[10px] uppercase tracking-tighter text-[#397789]/40 mb-1">
            Designation
          </label>
          <p className="text-sm font-mono text-[#397789]">{artifactName}</p>
        </div>

        <div className="provenance-field">
          <label className="block text-[10px] uppercase tracking-tighter text-[#397789]/40 mb-1">
            Temporal Origin
          </label>
          <p className="text-sm font-mono text-[#397789]">{provenance.birthDate}</p>
        </div>

        <div className="provenance-field">
          <label className="block text-[10px] uppercase tracking-tighter text-[#397789]/40 mb-1">
            Master Craftsman / Agent
          </label>
          <p className="text-sm font-mono text-[#397789]">{provenance.craftsman}</p>
        </div>

        <div className="provenance-field">
          <label className="block text-[10px] uppercase tracking-tighter text-[#397789]/40 mb-1">
            Lore Node Link
          </label>
          <p className="text-sm font-mono text-[#397789]">{provenance.originNode}</p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-[#397789]/10">
        <label className="block text-[10px] uppercase tracking-tighter text-[#397789]/40 mb-2">
          Immutable Lore Hash
        </label>
        <div className="bg-black/20 p-3 rounded font-mono text-[10px] text-[#397789]/70 break-all leading-relaxed border border-[#397789]/5">
          {provenance.loreHash}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="text-[9px] uppercase tracking-[0.3em] text-[#397789]/50 hover:text-[#397789] transition-colors flex items-center gap-2">
          <span>Verify via Terminal</span>
          <span className="text-xs">→</span>
        </button>
      </div>
    </div>
  );
};

export default SacredProvenance;
