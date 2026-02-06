import { HeroVideo } from '@/components/layout/HeroVideo';
import { GatewayMenu } from '@/components/layout/GatewayMenu';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroVideo />
      <GatewayMenu />
    </main>
  );
}
