export interface ArtifactDetail {
  id: string;
  title: string;
  description: string;
  lore: string[];
  imageUrl?: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Artifact';
  stats?: Record<string, string | number>;
  metadata: {
    origin: string;
    era: string;
    discoveredAt?: string;
  };
  components?: ArtifactComponent[];
}

export interface ArtifactComponent {
  id: string;
  name: string;
  description: string;
  type: 'Material' | 'Power Source' | 'Relic' | 'Unknown';
  status: 'Functional' | 'Damaged' | 'Depleted' | 'Fragmented';
}

export interface ArtifactDetailProps {
  artifact: ArtifactDetail;
  onClose: () => void;
  isOpen: boolean;
}
