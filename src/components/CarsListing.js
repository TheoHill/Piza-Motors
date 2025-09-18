'use client'
import { useState, useEffect } from 'react'
import { Heart, Eye, Gauge, Calendar, Fuel, Settings, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import carsData from '../data/cars.json'
import CarsFilter from './CarsFilter'

export default function CarsListing() {
    const [cars, setCars] = useState([])
    const [favorites, setFavorites] = useState(new Set())
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState('newest')
    const carsPerPage = 6

    useEffect(() => {
        // Duplicate cars data to have more items for demonstration
        const extendedCars = [...carsData.cars, ...carsData.cars.map(car => ({
            ...car,
            id: car.id + 100,
            name: car.name + ' Premium'
        }))]

        setCars(extendedCars)
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

    // Pagination
    const indexOfLastCar = currentPage * carsPerPage
    const indexOfFirstCar = indexOfLastCar - carsPerPage
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar)
    const totalPages = Math.ceil(cars.length / carsPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex gap-8">
                    {/* Sidebar Filter */}
                    <div className="hidden lg:block flex-shrink-0">
                        <CarsFilter />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-6">
                            <button className="flex items-center justify-center w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors">
                                <Filter className="h-5 w-5 mr-2" />
                                Show Filters
                            </button>
                        </div>

                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    Available Cars
                                </h2>
                                <p className="text-gray-600">
                                    Showing {indexOfFirstCar + 1}-{Math.min(indexOfLastCar, cars.length)} of {cars.length} results
                                </p>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-4">
                                <label className="text-sm text-gray-600">Sort by:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm bg-white"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="mileage">Lowest Mileage</option>
                                </select>
                            </div>
                        </div>

                        {/* Cars Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                            {currentCars.map((car) => (
                                <div
                                    key={car.id}
                                    className="card-hover bg-white rounded-xl shadow-lg overflow-hidden group border border-gray-100"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
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
                                                className={`p-2 rounded-full transition-colors backdrop-blur-sm ${favorites.has(car.id)
                                                        ? 'bg-yellow-500 text-black'
                                                        : 'bg-white/90 text-gray-600 hover:bg-yellow-50'
                                                    }`}
                                            >
                                                <Heart className={`h-4 w-4 ${favorites.has(car.id) ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="bg-black text-white p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-bold">{car.name}</h3>
                                            <p className="text-xl font-bold text-yellow-400">{formatPrice(car.price)}</p>
                                        </div>

                                        {/* Car Details */}
                                        <div className="flex justify-between items-center text-sm mb-4">
                                            <div className="flex items-center gap-1">
                                                <Gauge className="w-4 h-4" />
                                                <span>{car.mileage}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Fuel className="w-4 h-4" />
                                                <span>{car.fuelType}</span>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition-colors text-sm">
                                            View Details
                                        </button>
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
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1
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
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === pageNumber
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
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {/* No Results Message */}
                        {cars.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Search className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
                                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
