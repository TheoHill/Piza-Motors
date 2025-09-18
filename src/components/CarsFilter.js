'use client'
import { useState } from 'react'
import { Search, Plus } from 'lucide-react'

export default function CarsFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    brand: [],
    price: '',
    buildYear: '',
    bodyType: '',
    transmission: '',
    seating: '',
    capacity: ''
  })

  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Ford', 'Nissan']

  const handleBrandChange = (brand) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand]
    
    const newFilters = { ...filters, brand: newBrands }
    setFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
      {/* Header */}
      <div className="bg-black text-white px-4 py-3 rounded-t-lg -mx-6 -mt-6 mb-6">
        <h3 className="font-semibold">Find your car</h3>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700 text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Price */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center justify-between w-full text-left">
            <span className="font-medium text-gray-900">Price</span>
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Build Year */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center justify-between w-full text-left">
            <span className="font-medium text-gray-900">Build Year</span>
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Body Type */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center justify-between w-full text-left">
            <span className="font-medium text-gray-900">Body Type</span>
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Transmission */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center justify-between w-full text-left">
            <span className="font-medium text-gray-900">Transmission</span>
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Seating */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center justify-between w-full text-left">
            <span className="font-medium text-gray-900">Seating</span>
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Capacity */}
        <div className="pb-4">
          <button className="flex items-center justify-between w-full text-left">
            <span className="font-medium text-gray-900">Capacity</span>
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors mt-6">
        Search
      </button>
    </div>
  )
}