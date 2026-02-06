import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify';

async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders(),
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  const { data } = await response.json();
  return data?.products?.edges.map((edge: any) => edge.node) || [];
}

export default async function TreasuryPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-navy p-12 pt-32">
      <header className="mb-12 border-b border-gold/30 pb-6">
        <h1 className="font-serif text-5xl text-gold uppercase tracking-tighter">Treasury</h1>
        <p className="text-gold/60 mt-2 uppercase tracking-widest text-sm">Exclusive Goods & Artifacts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product: any) => (
          <div key={product.id} className="group border border-gold/10 p-6 bg-navy-light/20 hover:border-gold/50 transition-all duration-500">
            {product.images.edges[0] && (
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-navy-dark">
                <img 
                  src={product.images.edges[0].node.url} 
                  alt={product.images.edges[0].node.altText}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
              </div>
            )}
            <h2 className="font-serif text-2xl text-white uppercase mb-2">{product.title}</h2>
            <p className="text-gold/40 text-sm mb-6 line-clamp-2 uppercase tracking-wide">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-white font-mono">
                {product.variants.edges[0]?.node.price.amount} {product.variants.edges[0]?.node.price.currencyCode}
              </span>
              <button className="px-6 py-2 border border-gold text-gold uppercase text-xs tracking-widest hover:bg-gold hover:text-navy transition-all">
                Acquire
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-24 border border-dashed border-gold/20">
          <p className="text-gold/40 uppercase tracking-widest">The Treasury is currently being replenished...</p>
        </div>
      )}
    </div>
  );
}
