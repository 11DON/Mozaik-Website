import HomeHero from "../components/homeHero"
import ContactSection from "../components/contactSection"
import Features from "../components/features"
import Services from "../components/services"
import Portfolio from "../components/portfolio"
import AboutUsSections from "../components/aboutUsSections"

export default function HomePage() {
    return (
        <div>
            <HomeHero />
            <AboutUsSections />
            <Services />
            <ContactSection />
            <Features />
            <Portfolio />
        </div>
    )
}