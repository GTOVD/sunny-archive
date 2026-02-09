export default function Loading() {
  return (
    <div className="min-h-screen bg-navy p-12 pt-32">
      <header className="mb-12 border-b border-gold/30 pb-6 animate-pulse">
        <div className="h-12 w-64 bg-gold/20 mb-2"></div>
        <div className="h-4 w-48 bg-gold/10"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-gold/10 p-6 bg-navy-light/5 animate-pulse">
            <div className="aspect-[3/4] bg-gold/5 mb-6"></div>
            <div className="h-8 bg-gold/10 mb-2 w-3/4"></div>
            <div className="h-4 bg-gold/5 mb-6 w-1/2"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 w-24 bg-gold/10"></div>
              <div className="h-10 w-28 bg-gold/20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
