import Link from 'next/link';
import { ShopifyProduct } from '@/lib/schema';
import { getProducts, createCheckout } from '@/lib/shopify';
import { redirect } from 'next/navigation';

export default async function TreasuryPage() {
  const products: ShopifyProduct[] = await getProducts(24);

  async function handleAcquire(formData: FormData) {
    'use server';
    const variantId = formData.get('variantId') as string;
    if (!variantId) return;
    
    const checkoutUrl = await createCheckout(variantId);
    if (checkoutUrl) {
      redirect(checkoutUrl);
    }
  }

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: '8rem',
      paddingBottom: '6rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      backgroundColor: '#020617',
      color: '#e2e8f0'
    }}>
      {/* Background Ornament */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', backgroundColor: 'rgba(212, 175, 55, 0.02)', zIndex: -10, filter: 'blur(100px)' }}></div>

      <header style={{ maxWidth: '80rem', margin: '0 auto 5rem auto' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.6em', color: '#d4af37', textTransform: 'uppercase' }}>
          Department of Acquisitions
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'Playfair Display, serif', color: 'white', textTransform: 'lowercase', tracking: '-0.05em', margin: '1rem 0' }}>
          The <span style={{ fontStyle: 'italic', color: '#d4af37' }}>Treasury</span>
        </h1>
        <div style={{ height: '1px', width: '8rem', backgroundColor: 'rgba(212, 175, 55, 0.3)', marginTop: '2rem' }}></div>
        <p style={{ maxWidth: '28rem', color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.6, marginTop: '2rem' }}>
          Unique artifacts sourced from independent American artisans. 
          Hand-crafted legacy items for the modern explorer.
        </p>
      </header>

      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '4rem' 
      }}>
        {products.map((product) => (
          <div key={product.id} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ 
              position: 'relative', 
              aspectRatio: '4/5', 
              overflow: 'hidden', 
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.5s ease'
            }}>
              {product.images.nodes[0] ? (
                <img 
                  src={product.images.nodes[0].url} 
                  alt={product.images.nodes[0].altText || product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'all 0.7s ease' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', color: 'rgba(212, 175, 55, 0.2)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Image Pending</span>
                </div>
              )}
              
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(2, 6, 23, 0.4)', opacity: 0, transition: 'opacity 0.5s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <form action={handleAcquire}>
                  <input type="hidden" name="variantId" value={product.variants.nodes[0]?.id} />
                  <button type="submit" style={{ padding: '0.75rem 2rem', backgroundColor: '#d4af37', color: '#020617', fontFamily: 'Cinzel, serif', fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
                    Acquire Artifact
                  </button>
                </form>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', color: 'white', textTransform: 'uppercase', margin: 0 }}>
                  {product.title}
                </h2>
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(212, 175, 55, 0.6)' }}>
                  {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </span>
              </div>
              <p style={{ fontSize: '0.625rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center', padding: '10rem 0', border: '1px dashed rgba(255, 255, 255, 0.05)' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.625rem', color: 'rgba(212, 175, 55, 0.3)', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
            The vault is currently awaiting replenishment...
          </p>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '8rem' }}>
        <Link href="/" style={{ color: 'rgba(212, 175, 55, 0.4)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '0.625rem', textDecoration: 'none' }}>
          ← Return to Vault
        </Link>
      </div>
    </div>
  );
}
