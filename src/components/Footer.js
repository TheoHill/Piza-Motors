import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="/assets/PizaLogo.png"
              alt="Piza Motors"
              width={150}
              height={50}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              At Piza Motors, we offer more than just a vehicle – we provide quality, trust, reliability, and customer satisfaction. We've got you covered.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-300">Mzuzu, Malawi</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-300">pizamotors@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-300">+265 888 888 000</span>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-yellow-500 font-semibold text-lg mb-4">PAGES</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Cars</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-yellow-500 font-semibold text-lg mb-4">SUBSCRIBE TO US</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest offers and new arrivals</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-r-lg transition-colors">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Piza Motors. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}