// src/components/CarDetailsView.js
'use client'
import { useState, useEffect } from 'react'
import { 
  Heart, 
  Share2, 
  Phone, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings, 
  Car, 
  Shield, 
  Award,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import carsData from '../data/cars.json'

export default function CarDetailsView({ carId }) {
  const [car, setCar] = useState(null)
  const [relatedCars, setRelatedCars] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    // Find the car by ID
    const foundCar = carsData.cars.find(c => c.id === parseInt(carId))
    if (foundCar) {
      // Add multiple images for demonstration
      const carWithImages = {
        ...foundCar,
        images: [
          foundCar.image,
          foundCar.image, // In real app, these would be different images
          foundCar.image,
          foundCar.image
        ]
      }
      
      // Add specifications separately to avoid serialization issues
      carWithImages.specifications = {
        engine: '2.0L 4-Cylinder',
        transmission: 'Automatic',
        drivetrain: 'FWD',
        fuelEconomy: '28/36 MPG',
        seating: '5 passengers',
        doors: '4 doors',
        bodyStyle: 'Sedan',
        color: 'Silver',
        vin: 'ABC123456789',
        features: [
          'Bluetooth Connectivity',
          'Backup Camera',
          'Cruise Control',
          'Power Windows',
          'Air Conditioning',
          'Alloy Wheels',
          'Keyless Entry',
          'Safety Package'
        ]
      }
      
      setCar(carWithImages)

      // Get related cars (same brand or category)
      const related = carsData.cars
        .filter(c => 
          c.id !== parseInt(carId) && 
          (c.brand === foundCar.brand || c.category === foundCar.category)
        )
        .slice(0, 3)
      setRelatedCars(related)
    }
  }, [carId])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const nextImage = () => {
    if (car?.images) {
      setCurrentImageIndex((prev) => 
        prev === car.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (car?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? car.images.length - 1 : prev - 1
      )
    }
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Car not found</h2>
          <Link href="/cars" className="text-yellow-500 hover:text-yellow-600">
            Return to cars listing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/cars" 
              className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Cars
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={car.images[currentImageIndex]}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex 
                          ? 'bg-yellow-500' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex 
                          ? 'border-yellow-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${car.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Specifications */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Engine</span>
                    <span className="font-semibold">{car.specifications.engine}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Transmission</span>
                    <span className="font-semibold">{car.specifications.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Drivetrain</span>
                    <span className="font-semibold">{car.specifications.drivetrain}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Fuel Economy</span>
                    <span className="font-semibold">{car.specifications.fuelEconomy}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Seating</span>
                    <span className="font-semibold">{car.specifications.seating}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Doors</span>
                    <span className="font-semibold">{car.specifications.doors}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Body Style</span>
                    <span className="font-semibold">{car.specifications.bodyStyle}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Color</span>
                    <span className="font-semibold">{car.specifications.color}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Features & Equipment</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.specifications.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Car Info and Actions */}
          <div className="lg:col-span-1">
            {/* Car Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {car.condition}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{car.name}</h1>
                <p className="text-4xl font-bold text-green-600 mb-6">{formatPrice(car.price)}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500">Year</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Gauge className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500">Mileage</p>
                    <p className="font-semibold">{car.mileage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500">Fuel</p>
                    <p className="font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-500">Brand</p>
                    <p className="font-semibold">{car.brand}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Contact Dealer
                </button>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-lg transition-colors">
                  Reserve Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="h-8 w-8 text-green-500" />
                    <span className="text-xs text-gray-600">Certified</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <span className="text-xs text-gray-600">Quality</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Phone className="h-8 w-8 text-blue-500" />
                    <span className="text-xs text-gray-600">Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Cars Section */}
        {relatedCars.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Cars</h2>
              <p className="text-gray-600">You might also be interested in these vehicles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCars.map((relatedCar) => (
                <Link 
                  key={relatedCar.id} 
                  href={`/cars/${relatedCar.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover group">
                    <div className="relative h-48">
                      <Image
                        src={relatedCar.image}
                        alt={relatedCar.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {relatedCar.condition}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedCar.name}</h3>
                      <p className="text-xl font-bold text-green-600 mb-4">{formatPrice(relatedCar.price)}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {relatedCar.year}
                        </div>
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4" />
                          {relatedCar.mileage}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Dealer</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="I'm interested in this car..."
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}