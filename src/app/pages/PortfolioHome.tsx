import { ParallaxBackground } from '../components/ParallaxBackground';
import { SparkleParticles } from '../components/SparkleParticles';
import { PortfolioNav } from '../components/PortfolioNav';
import { PortfolioHero } from '../components/PortfolioHero';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { IntroSection } from '../components/IntroSection';
import { Services } from '../components/Services';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PortfolioContact } from '../components/PortfolioContact';
import { PortfolioLoading } from '../components/PortfolioLoading';
import { usePortfolio } from '../contexts/PortfolioContext';

// Using a high-quality dark abstract background from Unsplash
// In production, replace this URL with your own image in /src/assets/images/background.jpg
// Then import it with: import backgroundImage from '../../assets/images/background.jpg';
const backgroundImage = 'https://images.unsplash.com/photo-1761044590816-5180b35e99eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjBncmFkaWVudCUyMGJhY2tncm91bmQlMjBwcmVtaXVtfGVufDF8fHx8MTc3MjUwNjI3NXww&ixlib=rb-4.1.0&q=80&w=1080';

export function PortfolioHome() {
  const { isLoading } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <ParallaxBackground imageUrl={backgroundImage} />
      <SparkleParticles />

      {isLoading ? (
        <PortfolioLoading />
      ) : (
        <>
          <PortfolioNav />

          <main>
            <PortfolioHero />
            <FeaturedProjects />
            <IntroSection />
            <Services />
            <TestimonialsSection />
            <PortfolioContact />
          </main>
        </>
      )}
    </div>
  );
}
