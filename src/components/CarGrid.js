'use client'
import { useState, useEffect } from 'react'
import { Heart, Eye } from 'lucide-react'
import Image from 'next/image'
import carsData from '../data/cars.json'

export default function CarGrid() {
  const [cars, setCars] = useState([])
  const [favorites, setFavorites] = useState(new Set())

  useEffect(() => {
    setCars(carsData.cars)
  }, [])

  const toggleFavorite = (carId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId)
    } else {
      newFavorites.add(carId)
    }
    setFavorites(newFavorites)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
            Featured Vehicles
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Popular Picks Just for You
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our most in-demand models: reliable, stylish, and affordable
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cars.map((car) => (
            <div
              key={car.id}
              className="card-hover bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Condition Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {car.condition}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(car.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.has(car.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(car.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white text-gray-600 hover:bg-yellow-50 rounded-full transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-4">{formatPrice(car.price)}</p>
                
                {/* Car Details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {car.mileage}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {car.fuelType}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {car.year}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {car.brand}
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className="inline-flex items-center text-gray-600 hover:text-yellow-500 font-medium transition-colors">
            View more
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}