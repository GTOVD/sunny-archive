'use client';

import React, { useState } from 'react';
import { ArtifactDetailView } from './ArtifactDetailView';
import { ShopifyProduct } from '@/lib/schema';
import { ArtifactDetail } from '@/types/artifact';

interface ArtifactDetailOverlayProps {
  product: ShopifyProduct;
}

/**
 * ArtifactDetailOverlay
 * Bridges Shopify product data to the high-fidelity ArtifactDetailView.
 * Implements the "Luxury Boutique" aesthetic for the Treasury.
 */
export const ArtifactDetailOverlay: React.FC<ArtifactDetailOverlayProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Transform Shopify product to ArtifactDetail
  const artifact: ArtifactDetail = {
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.images.nodes[0]?.url,
    lore: [
      "Extracted from the deep archives of the artisan guild.",
      "This item bears the signature of physical craftsmanship and temporal resilience.",
      "Analysis indicates a high probability of legacy preservation."
    ],
    rarity: 'Legendary', // Defaulting for the luxury aesthetic
    metadata: {
      origin: 'Unknown Artisan Node',
      era: 'Modern Reconstruction'
    },
    stats: {
      'Value': `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`,
      'Acquisition ID': product.id.split('/').pop() || 'N/A',
      'Status': 'Available for Manifestation'
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full h-full absolute inset-0 z-10 opacity-0 cursor-pointer"
        aria-label={`View details for ${product.title}`}
      />
      
      <ArtifactDetailView 
        artifact={artifact}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
