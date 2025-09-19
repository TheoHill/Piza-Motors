import ContactHero from '../../components/ContactHero'
import ContactForm from '../../components/ContactForm'
import ContactInfo from '../../components/ContactInfo'
import MapSection from '../../components/MapSection'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Contact Us - Piza Motors',
  description: 'Get in touch with Piza Motors. Visit our showroom, call us, or send us a message. We\'re here to help you find your perfect vehicle.',
  keywords: 'contact Piza Motors, car dealership contact, Mzimba, Malawi, automotive contact',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <ContactForm />
        <ContactInfo />
      </div>
      <MapSection />
      <Footer />
    </main>
  )
}