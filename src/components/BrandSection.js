'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import carsData from '../data/cars.json'

export default function BrandSection() {
  const router = useRouter()

  // Handle brand click to redirect to cars page with brand filter
  const handleBrandClick = (brandSlug, brandName) => {
    // Navigate to cars page with brand search parameter
    router.push(`/cars?brand=${encodeURIComponent(brandName)}`)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
            Top Brands
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Shop by Brand
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover quality vehicles from trusted automotive brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {carsData.brands.map((brand) => (
            <div
              key={brand.slug}
              onClick={() => handleBrandClick(brand.slug, brand.name)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-24 flex items-center justify-center group-hover:scale-105 group-hover:bg-yellow-50 border-2 border-transparent group-hover:border-yellow-500">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={80}
                  height={40}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <p className="text-center mt-3 font-medium text-gray-700 group-hover:text-yellow-600 transition-colors">
                {brand.name}
              </p>
            </div>
          ))}
        </div>

        {/* View All Brands Button */}
        <div className="text-center mt-12">
          <Link href="/cars" passHref>
            <button className="inline-flex items-center text-gray-600 hover:text-yellow-500 font-medium transition-colors">
              View more
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </Link>
        </div>
      </div>
    </section>
  )
}