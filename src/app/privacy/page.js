import PrivacyHero from '../../components/PrivacyHero'
import PrivacyContent from '../../components/PrivacyContent'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Privacy Policy - Piza Motors',
  description: 'Read our privacy policy to understand how Piza Motors collects, uses, and protects your personal information.',
  keywords: 'privacy policy, data protection, Piza Motors, personal information, cookies',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <PrivacyHero />
      <PrivacyContent />
      <Footer />
    </main>
  )
}