import HeroSection from './HeroSection';
import CarAnimation from './CarAnimation';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';

/**
 * Home Page - Car Scroll Animation
 * 
 * Premium hero section with scroll-based car animation
 * Demonstrates smooth motion, load animations, and scroll-triggered interactions
 */
export default function Home() {
    return (
        <div className="w-full">
            <HeroSection />
            <CarAnimation />
            <FeaturesSection />
            <Footer />
        </div>
    );
}