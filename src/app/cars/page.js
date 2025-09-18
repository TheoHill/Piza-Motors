import CarsHero from '../../components/CarsHero'
import CarsFilter from '../../components/CarsFilter'
import CarsListing from '../../components/CarsListing'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Browse Cars - Piza Motors',
  description: 'Browse our extensive collection of quality vehicles. Find your perfect car with advanced filtering options.',
  keywords: 'cars, vehicles, browse cars, car listings, Piza Motors',
}

export default function CarsPage() {
  return (
    <main className="min-h-screen">
      <CarsHero />
      <CarsFilter />
      <CarsListing />
      <Footer />
    </main>
  )
}