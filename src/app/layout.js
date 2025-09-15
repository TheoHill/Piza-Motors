import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Piza Motors - Drive Your Dream Car Today',
  description: 'Affordable, reliable, and certified vehicles for every lifestyle. Find your perfect ride with Piza Motors - premium cars at unbeatable prices.',
  keywords: 'cars, vehicles, automotive, used cars, new cars, car dealership, Piza Motors',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}