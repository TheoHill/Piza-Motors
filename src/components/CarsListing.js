'use client'
import { useState, useEffect } from 'react'
import { Heart, Eye, Gauge, Calendar, Fuel, Settings, Search, Filter, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import carsData from '../data/cars.json'
import CarsFilter from './CarsFilter'

export default function CarsListing() {
  const [allCars, setAllCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const carsPerPage = 6
  
  const searchParams = useSearchParams()

  useEffect(() => {
    // Duplicate cars data to have more items for demonstration
    const extendedCars = [...carsData.cars, ...carsData.cars.map(car => ({
      ...car,
      id: car.id + 100,
      name: car.name + ' Premium'
    }))]
    setAllCars(extendedCars)
    setFilteredCars(extendedCars)

    // Check for search query from URL parameters
    const query = searchParams.get('search')
    if (query) {
      setSearchTerm(query)
      performSearch(query, extendedCars)
    }
  }, [searchParams])

  const performSearch = (query, carsToSearch = allCars) => {
  if (!query.trim()) {
    setFilteredCars(carsToSearch)
    return
  }

  // Normalize query:
  // - remove $ and commas
  // - turn "15,500 - 18,000" → "15500-18000"
  const normalizedQuery = query
    .toLowerCase()
    .replace(/\$/g, '')
    .replace(/,/g, '')
    .replace(/\s*-\s*/g, '-') // clean up dash with spaces

  const searchTokens = normalizedQuery.trim().split(/\s+/)

  let minPrice = null
  let maxPrice = null

  const otherTokens = searchTokens.filter(token => {
    const rangeMatch = token.match(/^(\d+)-(\d+)$/)
    if (rangeMatch) {
      minPrice = parseInt(rangeMatch[1], 10)
      maxPrice = parseInt(rangeMatch[2], 10)
      return false
    }
    return true
  })

  const filtered = carsToSearch.filter(car => {
    const carString = `
      ${car.name} 
      ${car.brand} 
      ${car.year} 
      ${car.fuelType} 
      ${car.condition} 
      ${car.category || ''} 
      ${car.price} 
    `.toLowerCase()

    const matchesText = otherTokens.every(token => carString.includes(token))

    const matchesPrice =
      minPrice === null || maxPrice === null
        ? true
        : car.price >= minPrice && car.price <= maxPrice

    return matchesText && matchesPrice
  })

  setFilteredCars(filtered)
  setCurrentPage(1)
}


  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(searchTerm)
  }

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Perform real-time search as user types
    performSearch(value)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setFilteredCars(allCars)
    setCurrentPage(1)
  }

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

  const handleSort = (sortValue) => {
    setSortBy(sortValue)
    let sortedCars = [...filteredCars]
    
    switch (sortValue) {
      case 'price-low':
        sortedCars.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sortedCars.sort((a, b) => b.price - a.price)
        break
      case 'year-new':
        sortedCars.sort((a, b) => b.year - a.year)
        break
      case 'year-old':
        sortedCars.sort((a, b) => a.year - b.year)
        break
      case 'mileage':
        sortedCars.sort((a, b) => {
          const aMileage = parseInt(a.mileage.replace(/[^\d]/g, ''))
          const bMileage = parseInt(b.mileage.replace(/[^\d]/g, ''))
          return aMileage - bMileage
        })
        break
      case 'brand':
        sortedCars.sort((a, b) => a.brand.localeCompare(b.brand))
        break
      default: // newest
        sortedCars.sort((a, b) => b.year - a.year)
    }
    
    setFilteredCars(sortedCars)
    setCurrentPage(1)
  }

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)
  const totalPages = Math.ceil(filteredCars.length / carsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex gap-8">
          {/* Sidebar Filter - Desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <CarsFilter />
          </div>

          {/* Mobile Filter - Overlay */}
          {isFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsFilterOpen(false)}>
              <div className="absolute left-0 top-0 h-full w-80 max-w-[80vw] bg-white p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <CarsFilter />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by car name, brand, year, fuel type..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Search
                </button>
              </form>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                Show Filters
              </button>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 'Available Cars'}
                </h2>
                <p className="text-gray-600">
                  Showing {indexOfFirstCar + 1}-{Math.min(indexOfLastCar, filteredCars.length)} of {filteredCars.length} results
                </p>
                {searchTerm && filteredCars.length > 0 && (
                  <button
                    onClick={clearSearch}
                    className="text-yellow-500 hover:text-yellow-600 text-sm mt-1 inline-flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear search
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="year-new">Year: Newest</option>
                  <option value="year-old">Year: Oldest</option>
                  <option value="mileage">Lowest Mileage</option>
                  <option value="brand">Brand A-Z</option>
                </select>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {currentCars.map((car) => (
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
                      <Link href={`/cars/${car.id}`} passHref>
                        <button className="p-2 bg-white text-gray-600 hover:bg-yellow-50 rounded-full transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
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
                    <Link href={`/cars/${car.id}`} passHref>
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'
                  }`}
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-yellow-500 text-black'
                          : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'
                    }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* No Results Message */}
            {filteredCars.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? `No cars found for "${searchTerm}"` : 'No cars found'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? 'Try searching with different keywords or check your spelling.' 
                    : 'Try adjusting your filters to see more results.'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Show All Cars
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
