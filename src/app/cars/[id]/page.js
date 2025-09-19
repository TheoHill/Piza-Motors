// src/app/cars/[id]/page.js
import CarDetailsView from '../../../components/CarDetailsView'
import Footer from '../../../components/Footer'

export async function generateMetadata({ params }) {
  const { id } = await params
  return {
    title: `Car Details - Piza Motors`,
    description: 'View detailed information about this vehicle including specifications, images, and contact options.',
    keywords: 'car details, vehicle information, Piza Motors, car specifications',
  }
}

export default async function CarDetailsPage({ params }) {
  const { id } = await params
  
  return (
    <main className="min-h-screen">
      <CarDetailsView carId={id} />
      <Footer />
    </main>
  )
}