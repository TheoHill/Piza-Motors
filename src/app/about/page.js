import AboutHero from '../../components/AboutHero'
import AboutContent from '../../components/AboutContent'
import TeamSection from '../../components/TeamSection'
import StatsSection from '../../components/StatsSection'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'About Us - Piza Motors',
  description: 'Learn about Piza Motors - your trusted automotive partner. Discover our story, mission, and commitment to quality vehicles and customer satisfaction.',
  keywords: 'about Piza Motors, car dealership, automotive, our story, mission, team',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutContent />
      <StatsSection />
      <TeamSection />
      <Footer />
    </main>
  )
}