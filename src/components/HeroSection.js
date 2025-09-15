'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [filters, setFilters] = useState({
    brand: 'Toyota',
    model: 'Corolla XSE',
    year: '2021',
    priceRange: '$15,500 - $18,000'
  })

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/header.jpg"
          alt="Luxury car showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
            Drive Your{' '}
            <span className="text-yellow-400">Dream Car</span>{' '}
            Today
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 text-shadow">
            Affordable, reliable, and certified vehicles for every lifestyle. Find your perfect ride with Piza Motors
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
              Browse Cars
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 rounded-lg transition-colors">
              Contact Us
            </button>
          </div>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-5xl">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'New Cars', 'Old Cars'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brands</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option>Toyota</option>
                <option>Honda</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Ford</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Models</label>
              <select
                value={filters.model}
                onChange={(e) => setFilters({...filters, model: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option>Corolla XSE</option>
                <option>Civic</option>
                <option>3 Series</option>
                <option>GLA</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ranges</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option>$15,500 - $18,000</option>
                <option>$20,000 - $30,000</option>
                <option>$30,000 - $50,000</option>
                <option>$50,000+</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Search className="h-5 w-5" />
            Search Now
          </button>
        </div>
      </div>
    </section>
  )
}