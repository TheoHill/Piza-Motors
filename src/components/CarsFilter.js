'use client'
import { useState, useEffect } from 'react'
import { Search, Plus, Minus, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import carsData from '../data/cars.json'

export default function CarsFilter({ onFilterChange, initialFilters = {} }) {
  const searchParams = useSearchParams()
  
  // Get brand from URL parameters
  const brandFromUrl = searchParams.get('brand')
  
  const [filters, setFilters] = useState({
    brand: brandFromUrl ? [brandFromUrl] : [],
    priceRange: { min: '', max: '' },
    buildYear: { min: '', max: '' },
    bodyType: [],
    transmission: [],
    fuelType: [],
    condition: [],
    ...initialFilters
  })

  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    price: false,
    buildYear: false,
    bodyType: false,
    transmission: false,
    fuelType: false,
    condition: false
  })

  // Extract unique values from cars data
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    bodyTypes: [],
    transmissions: [],
    fuelTypes: [],
    conditions: [],
    years: { min: 2000, max: new Date().getFullYear() },
    prices: { min: 0, max: 100000 }
  })

  useEffect(() => {
    // Extract unique filter options from cars data
    const brands = [...new Set(carsData.cars.map(car => car.brand))].sort()
    const bodyTypes = [...new Set(carsData.cars.map(car => car.category || 'Sedan'))].sort()
    const transmissions = ['Automatic', 'Manual', 'CVT'] // Common transmission types
    const fuelTypes = [...new Set(carsData.cars.map(car => car.fuelType))].sort()
    const conditions = [...new Set(carsData.cars.map(car => car.condition))].sort()
    
    // Get year and price ranges
    const years = carsData.cars.map(car => car.year)
    const prices = carsData.cars.map(car => car.price)
    
    setFilterOptions({
      brands,
      bodyTypes,
      transmissions,
      fuelTypes,
      conditions,
      years: { min: Math.min(...years), max: Math.max(...years) },
      prices: { min: Math.min(...prices), max: Math.max(...prices) }
    })
  }, [])

  // Update filters when URL parameters change
  useEffect(() => {
    if (brandFromUrl) {
      setFilters(prevFilters => ({
        ...prevFilters,
        brand: [brandFromUrl]
      }))
    }
  }, [brandFromUrl])

  useEffect(() => {
    // Call parent's filter change handler whenever filters change
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }, [filters, onFilterChange])

  const handleBrandChange = (brand) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand]
    
    setFilters({ ...filters, brand: newBrands })
  }

  const handleArrayFilterChange = (filterType, value) => {
    const currentValues = filters[filterType] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    setFilters({ ...filters, [filterType]: newValues })
  }

  const handlePriceChange = (type, value) => {
    setFilters({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: value ? parseInt(value) : ''
      }
    })
  }

  const handleYearChange = (type, value) => {
    setFilters({
      ...filters,
      buildYear: {
        ...filters.buildYear,
        [type]: value ? parseInt(value) : ''
      }
    })
  }

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      brand: [],
      priceRange: { min: '', max: '' },
      buildYear: { min: '', max: '' },
      bodyType: [],
      transmission: [],
      fuelType: [],
      condition: []
    }
    setFilters(clearedFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.brand.length > 0) count += filters.brand.length
    if (filters.priceRange.min || filters.priceRange.max) count += 1
    if (filters.buildYear.min || filters.buildYear.max) count += 1
    if (filters.bodyType.length > 0) count += filters.bodyType.length
    if (filters.transmission.length > 0) count += filters.transmission.length
    if (filters.fuelType.length > 0) count += filters.fuelType.length
    if (filters.condition.length > 0) count += filters.condition.length
    return count
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm h-fit sticky top-8">
      {/* Header */}
      <div className="bg-black text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Find your car</h3>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear ({getActiveFilterCount()})
          </button>
        )}
      </div>

      <div className="p-6">
        {/* Brand Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('brand')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-gray-900">Brand</span>
            {expandedSections.brand ? 
              <Minus className="h-4 w-4 text-gray-500" /> : 
              <Plus className="h-4 w-4 text-gray-500" />
            }
          </button>
          
          {expandedSections.brand && (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {filterOptions.brands.map((brand) => (
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
          )}
        </div>

        {/* Price Range */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-gray-900">Price Range</span>
            {expandedSections.price ? 
              <Minus className="h-4 w-4 text-gray-500" /> : 
              <Plus className="h-4 w-4 text-gray-500" />
            }
          </button>

          {expandedSections.price && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max Price</label>
                  <input
                    type="number"
                    placeholder="100000"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Range: {formatPrice(filterOptions.prices.min)} - {formatPrice(filterOptions.prices.max)}
              </div>
            </div>
          )}
        </div>

        {/* Build Year */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('buildYear')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-gray-900">Build Year</span>
            {expandedSections.buildYear ? 
              <Minus className="h-4 w-4 text-gray-500" /> : 
              <Plus className="h-4 w-4 text-gray-500" />
            }
          </button>

          {expandedSections.buildYear && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From Year</label>
                  <input
                    type="number"
                    placeholder={filterOptions.years.min.toString()}
                    value={filters.buildYear.min}
                    onChange={(e) => handleYearChange('min', e.target.value)}
                    min={filterOptions.years.min}
                    max={filterOptions.years.max}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To Year</label>
                  <input
                    type="number"
                    placeholder={filterOptions.years.max.toString()}
                    value={filters.buildYear.max}
                    onChange={(e) => handleYearChange('max', e.target.value)}
                    min={filterOptions.years.min}
                    max={filterOptions.years.max}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Available: {filterOptions.years.min} - {filterOptions.years.max}
              </div>
            </div>
          )}
        </div>

        {/* Body Type */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('bodyType')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-gray-900">Body Type</span>
            {expandedSections.bodyType ? 
              <Minus className="h-4 w-4 text-gray-500" /> : 
              <Plus className="h-4 w-4 text-gray-500" />
            }
          </button>

          {expandedSections.bodyType && (
            <div className="space-y-3">
              {filterOptions.bodyTypes.map((bodyType) => (
                <label key={bodyType} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.bodyType.includes(bodyType)}
                    onChange={() => handleArrayFilterChange('bodyType', bodyType)}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 text-sm">{bodyType}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Transmission */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('transmission')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-gray-900">Transmission</span>
            {expandedSections.transmission ? 
              <Minus className="h-4 w-4 text-gray-500" /> : 
              <Plus className="h-4 w-4 text-gray-500" />
            }
          </button>

          {expandedSections.transmission && (
            <div className="space-y-3">
              {filterOptions.transmissions.map((transmission) => (
                <label key={transmission} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.transmission.includes(transmission)}
                    onChange={() => handleArrayFilterChange('transmission', transmission)}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 text-sm">{transmission}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fuel Type */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('fuelType')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-gray-900">Fuel Type</span>
            {expandedSections.fuelType ? 
              <Minus className="h-4 w-4 text-gray-500" /> : 
              <Plus className="h-4 w-4 text-gray-500" />
            }
          </button>

          {expandedSections.fuelType && (
            <div className="space-y-3">
              {filterOptions.fuelTypes.map((fuelType) => (
                <label key={fuelType} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.fuelType.includes(fuelType)}
                    onChange={() => handleArrayFilterChange('fuelType', fuelType)}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 text-sm">{fuelType}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('condition')}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-medium text-gray-900">Condition</span>
            {expandedSections.condition ? 
              <Minus className="h-4 w-4 text-gray-500" /> : 
              <Plus className="h-4 w-4 text-gray-500" />
            }
          </button>

          {expandedSections.condition && (
            <div className="space-y-3">
              {filterOptions.conditions.map((condition) => (
                <label key={condition} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.condition.includes(condition)}
                    onChange={() => handleArrayFilterChange('condition', condition)}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 text-sm">{condition}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Apply Filters Button */}
        <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Search className="h-5 w-5" />
          Apply Filters
          {getActiveFilterCount() > 0 && (
            <span className="bg-yellow-500 text-black rounded-full px-2 py-1 text-xs font-bold">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}