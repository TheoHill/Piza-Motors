import HeroSection from '../components/HeroSection'
import BrandSection from '../components/BrandSection'
import CarGrid from '../components/CarGrid'
import OfferSection from '../components/OfferSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BrandSection />
      <CarGrid />
      <OfferSection />
      <Footer />
    </main>
  )
}