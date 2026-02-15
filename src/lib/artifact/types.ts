export type ArtifactCategory = 'Sacred' | 'Common' | 'Forbidden' | 'Lost';

export interface Artifact {
  id: string;
  name: string;
  description: string;
  category: ArtifactCategory;
  lore: string;
  imageUrl?: string;
  rarity: number; // 1-100
  discoveredAt: string;
}

export interface ArtifactState {
  artifacts: Artifact[];
  loading: boolean;
  error: string | null;
}
