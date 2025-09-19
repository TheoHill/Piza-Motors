import { MapPin, Navigation } from 'lucide-react'

export default function MapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Our <span className="text-yellow-500">Location</span>
          </h2>
          <p className="text-lg text-gray-600">
            Visit our showroom and experience our collection firsthand
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
              {/* This would be replaced with an actual map component */}
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
                <p className="text-gray-500">Map integration would go here</p>
                <p className="text-sm text-gray-400 mt-2">Mzuzu, Malawi</p>
              </div>
              
              {/* Decorative map lines */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <path d="M50 50 L350 50 L350 250 L50 250 Z" stroke="#6B7280" strokeWidth="2" fill="none" />
                  <path d="M100 50 L100 250" stroke="#6B7280" strokeWidth="1" />
                  <path d="M200 50 L200 250" stroke="#6B7280" strokeWidth="1" />
                  <path d="M300 50 L300 250" stroke="#6B7280" strokeWidth="1" />
                  <path d="M50 100 L350 100" stroke="#6B7280" strokeWidth="1" />
                  <path d="M50 150 L350 150" stroke="#6B7280" strokeWidth="1" />
                  <path d="M50 200 L350 200" stroke="#6B7280" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Our Location</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <p className="font-semibold text-gray-900">Piza Motors Showroom</p>
                <p>Mzimba, Northern Region</p>
                <p>Malawi</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Directions</h3>
              <p className="text-gray-700 mb-4">
                Located in the heart of Mzimba, easily accessible from all major roads. 
                Look for our distinctive Piza Motors signage.
              </p>
              <button className="flex items-center text-yellow-600 hover:text-yellow-700 font-semibold">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Parking</h3>
              <p className="text-gray-600">
                Free parking available on-site for all customers and visitors. 
                Secure and well-lit parking area.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Nearby Landmarks</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Mzuzu City Center</li>
                <li>• Mzuzu University</li>
                <li>• Central Market</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}