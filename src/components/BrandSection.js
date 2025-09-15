'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import carsData from '../data/cars.json'

export default function BrandSection() {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    setBrands(carsData.brands.slice(0, 8))
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
            Premium Brands
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Browse by Brand
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose from our wide selection of trusted automotive brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="brand-card bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{brand.name}</h3>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-flex items-center text-gray-600 hover:text-yellow-500 font-medium transition-colors">
            View all
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}