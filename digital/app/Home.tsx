import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';


export default function Home() {
    return (
        <div className="w-full">
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
}