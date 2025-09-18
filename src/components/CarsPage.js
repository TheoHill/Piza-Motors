'use client'
import { useState, useEffect, useMemo } from 'react'
import { Search, Menu, X, User, Heart, Eye, Filter, SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import carsData from '../data/cars.json'
import Footer from '../components/Footer'

export default function CarsPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [favorites, setFavorites] = useState(new Set())
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('price-low')
    const [currentPage, setCurrentPage] = useState(1)
    const carsPerPage = 9

    // Filter states
    const [filters, setFilters] = useState({
        brand: '',
        condition: '',
        priceRange: '',
        year: '',
        fuelType: '',
        category: ''
    })

    // Get unique values for filter options
    const filterOptions = useMemo(() => {
        const brands = [...new Set(carsData.cars.map(car => car.brand))].sort()
        const conditions = [...new Set(carsData.cars.map(car => car.condition))].sort()
        const years = [...new Set(carsData.cars.map(car => car.year))].sort((a, b) => b - a)
        const fuelTypes = [...new Set(carsData.cars.map(car => car.fuelType))].sort()
        const categories = [...new Set(carsData.cars.map(car => car.category))].sort()
        
        return { brands, conditions, years, fuelTypes, categories }
    }, [])

    // Filter and search cars
    const filteredCars = useMemo(() => {
        let filtered = carsData.cars.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                car.brand.toLowerCase().includes(searchQuery.toLowerCase())
            
            const matchesBrand = !filters.brand || car.brand === filters.brand
            const matchesCondition = !filters.condition || car.condition === filters.condition
            const matchesYear = !filters.year || car.year.toString() === filters.year
            const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType
            const matchesCategory = !filters.category || car.category === filters.category
            
            let matchesPrice = true
            if (filters.priceRange) {
                switch (filters.priceRange) {
                    case '0-20000':
                        matchesPrice = car.price <= 20000
                        break
                    case '20000-30000':
                        matchesPrice = car.price > 20000 && car.price <= 30000
                        break
                    case '30000-50000':
                        matchesPrice = car.price > 30000 && car.price <= 50000
                        break
                    case '50000+':
                        matchesPrice = car.price > 50000
                        break
                }
            }
            
            return matchesSearch && matchesBrand && matchesCondition && 
                   matchesYear && matchesFuelType && matchesCategory && matchesPrice
        })

        // Sort cars
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'year-new':
                filtered.sort((a, b) => b.year - a.year)
                break
            case 'year-old':
                filtered.sort((a, b) => a.year - b.year)
                break
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            default:
                break
        }

        return filtered
    }, [searchQuery, filters, sortBy])

    // Pagination
    const totalPages = Math.ceil(filteredCars.length / carsPerPage)
    const paginatedCars = filteredCars.slice(
        (currentPage - 1) * carsPerPage,
        currentPage * carsPerPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [filters, searchQuery])

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

    const clearFilters = () => {
        setFilters({
            brand: '',
            condition: '',
            priceRange: '',
            year: '',
            fuelType: '',
            category: ''
        })
        setSearchQuery('')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Image
                                src="/assets/PizaLogo.png"
                                alt="Piza Motors"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Cars", href: "/cars", active: true },
                                { name: "About", href: "#" },
                                { name: "Contact", href: "#" }
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`px-3 py-2 text-sm font-medium transition-colors relative group ${
                                        link.active 
                                        ? 'text-yellow-500' 
                                        : 'text-gray-700 hover:text-yellow-500'
                                    }`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                                        link.active ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                                </a>
                            ))}
                        </nav>

                        {/* Search + Profile */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search cars..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent w-64 transition-all"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                            <button className="p-2 text-gray-600 hover:text-yellow-500 transition-colors">
                                <User className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 hover:text-yellow-500 p-2"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t border-gray-200">
                            <nav className="px-4 py-6 space-y-4">
                                {[
                                    { name: "Home", href: "/" },
                                    { name: "Cars", href: "/cars", active: true },
                                    { name: "About", href: "#" },
                                    { name: "Contact", href: "#" }
                                ].map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`block py-2 text-sm font-medium transition-colors ${
                                            link.active 
                                            ? 'text-yellow-500' 
                                            : 'text-gray-700 hover:text-yellow-500'
                                        }`}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="pt-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search cars..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="border border-gray-300 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Page Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse All Cars</h1>
                    <p className="text-gray-300">Find your perfect vehicle from our extensive collection</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters & Controls */}
                <div className="mb-8">
                    {/* Mobile Filter Toggle */}
                    <div className="flex items-center justify-between mb-4 md:hidden">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg"
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                        </button>
                        
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600'}`}
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600'}`}
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">
                                Showing {filteredCars.length} of {carsData.cars.length} cars
                            </span>
                            {(Object.values(filters).some(v => v) || searchQuery) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="year-new">Year: Newest First</option>
                                    <option value="year-old">Year: Oldest First</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-white border text-gray-600'}`}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-white border text-gray-600'}`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    <div className={`bg-white rounded-lg shadow-sm border p-6 mb-6 ${showFilters || window.innerWidth >= 768 ? 'block' : 'hidden md:block'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                <select
                                    value={filters.brand}
                                    onChange={(e) => setFilters({...filters, brand: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">All Brands</option>
                                    {filterOptions.brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                                <select
                                    value={filters.condition}
                                    onChange={(e) => setFilters({...filters, condition: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">All Conditions</option>
                                    {filterOptions.conditions.map(condition => (
                                        <option key={condition} value={condition}>{condition}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                <select
                                    value={filters.priceRange}
                                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">All Prices</option>
                                    <option value="0-20000">Under $20,000</option>
                                    <option value="20000-30000">$20,000 - $30,000</option>
                                    <option value="30000-50000">$30,000 - $50,000</option>
                                    <option value="50000+">$50,000+</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                <select
                                    value={filters.year}
                                    onChange={(e) => setFilters({...filters, year: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">All Years</option>
                                    {filterOptions.years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                                <select
                                    value={filters.fuelType}
                                    onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">All Fuel Types</option>
                                    {filterOptions.fuelTypes.map(fuelType => (
                                        <option key={fuelType} value={fuelType}>{fuelType}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                >
                                    <option value="">All Categories</option>
                                    {filterOptions.categories.map(category => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cars Grid/List */}
                {paginatedCars.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <div className="text-gray-400 mb-4">
                                <Search className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                            <p className="text-gray-600 mb-4">
                                Try adjusting your search criteria or filters to find more vehicles.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" 
                        : "space-y-6 mb-12"
                    }>
                        {paginatedCars.map((car) => (
                            viewMode === 'grid' ? (
                                // Grid View
                                <div
                                    key={car.id}
                                    className="card-hover bg-white rounded-xl shadow-lg overflow-hidden group"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {car.condition}
                                            </span>
                                        </div>

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

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                                        <p className="text-2xl font-bold text-green-600 mb-4">{formatPrice(car.price)}</p>
                                        
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

                                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // List View
                                <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="md:flex">
                                        <div className="md:w-1/3 relative h-64 md:h-48">
                                            <Image
                                                src={car.image}
                                                alt={car.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    {car.condition}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
                                                        <p className="text-2xl font-bold text-green-600">{formatPrice(car.price)}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => toggleFavorite(car.id)}
                                                            className={`p-2 rounded-full transition-colors ${
                                                                favorites.has(car.id)
                                                                    ? 'bg-red-500 text-white'
                                                                    : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                                                            }`}
                                                        >
                                                            <Heart className={`h-4 w-4 ${favorites.has(car.id) ? 'fill-current' : ''}`} />
                                                        </button>
                                                        <button className="p-2 bg-gray-100 text-gray-600 hover:bg-yellow-50 rounded-full transition-colors">
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-6">
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
                                            </div>

                                            <div className="flex justify-end">
                                                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {(currentPage - 1) * carsPerPage + 1}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {Math.min(currentPage * carsPerPage, filteredCars.length)}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">{filteredCars.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(page => {
                                            if (totalPages <= 7) return true
                                            if (page === 1 || page === totalPages) return true
                                            if (Math.abs(page - currentPage) <= 1) return true
                                            return false
                                        })
                                        .map((page, index, array) => {
                                            const showEllipsis = index > 0 && array[index - 1] < page - 1
                                            return (
                                                <div key={page}>
                                                    {showEllipsis && (
                                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                                                            ...
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                                            currentPage === page
                                                                ? 'bg-yellow-500 text-black'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                </div>
                                            )
                                        })}

                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}