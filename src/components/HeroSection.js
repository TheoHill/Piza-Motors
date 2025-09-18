'use client'
import { useState } from 'react'
import { Search, Menu, X, User } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link"

export default function HeroSection() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeFilter, setActiveFilter] = useState('All')
    const [filters, setFilters] = useState({
        brand: 'Toyota',
        model: 'Corolla XSE',
        year: '2021',
        priceRange: '$15,500 - $18,000'
    })

    return (
        <section className="relative h-[600px] md:h-[700px] overflow-visible mb-32 md:mb-40">
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

            {/* Integrated Navigation - Glassmorphism NavBar */}
            <div className="relative z-50 py-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/60 backdrop-blur-lg rounded-full shadow-lg border border-white/20">
                        <div className="flex justify-between items-center h-16 px-6">

                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" passHref>
                                    <Image
                                        src="/assets/PizaLogo.png"
                                        alt="Piza Motors"
                                        width={120}
                                        height={40}
                                        className="h-12 w-auto cursor-pointer"
                                    />
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex space-x-8">
                                {[
                                    { name: "Home", href: "/", active: true },
                                    { name: "Cars", href: "/cars" },
                                    { name: "About", href: "/about" },
                                    { name: "Contact", href: "/contact" }
                                ].map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`px-3 py-2 text-sm font-medium transition-colors relative group ${link.active
                                            ? 'text-yellow-500'
                                            : 'text-gray-800 hover:text-yellow-500'
                                            }`}
                                    >
                                        {link.name}
                                        <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${link.active ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}></span>
                                    </a>
                                ))}
                            </nav>

                            {/* Search + Profile */}
                            <div className="hidden md:flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-white/60 backdrop-blur-md border border-white/30 placeholder-gray-500 text-gray-800 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white/70 w-48 transition-all"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                                <button className="p-2 text-gray-800 hover:text-yellow-500 transition-colors rounded-full hover:bg-white/40 backdrop-blur-md">
                                    <User className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-gray-800 hover:text-yellow-500 p-2 rounded-full hover:bg-white/40 backdrop-blur-md transition-colors"
                                >
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden absolute top-20 left-4 right-4 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl">
                            <nav className="px-6 py-6 space-y-4">
                                {[
                                    { name: "Home", href: "/", active: true },
                                    { name: "Cars", href: "/cars" },
                                    { name: "About", href: "/about" },
                                    { name: "Contact", href: "/contact" }
                                ].map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`block py-2 text-sm font-medium transition-colors ${link.active
                                            ? 'text-yellow-500'
                                            : 'text-gray-800 hover:text-yellow-500'
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="pt-4 border-t border-white/20">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="bg-white/40 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full text-gray-800 placeholder-gray-500"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                    </div>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </div>


            {/* Hero Content */}
            <div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
                style={{ minHeight: 'calc(100vh - 120px)', paddingTop: '2rem' }}
            >
                {/* Hero Text & Buttons */}
                <div className="max-w-2xl mb-8 md:mb-16 md:ml-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-shadow leading-snug">
                        Drive Your <br />
                        <span className="text-yellow-400">Dream Car</span> <br />
                        Today
                    </h1>

                    <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 text-shadow max-w-md mx-auto md:mx-0">
                        Affordable, reliable, and certified vehicles <br />
                        for every lifestyle. Find your perfect ride <br />
                        with Piza Motors
                    </p>

                    {/* Action Buttons */}
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 items-center md:items-start md:justify-start justify-center">
                        <Link href="/cars" passHref>
                            <button className="relative px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base text-white transition-all group text-center w-[200px] sm:w-auto">
                                <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-yellow-400 to-white opacity-80 group-hover:opacity-100">
                                    <span className="block bg-black/30 backdrop-blur-md rounded-full"></span>
                                </span>
                                <span className="relative">Browse Cars</span>
                            </button>
                        </Link>

                        <Link href="/contact" passHref>
                            <button className="bg-white/30 backdrop-blur-lg border border-white/20 hover:bg-white/50 text-white hover:text-black font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-colors text-sm md:text-base shadow-lg text-center w-[200px] sm:w-auto">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Search Filters */}
                <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 max-w-5xl w-full mx-auto transform -translate-y-8 md:-translate-y-6">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {['All', 'New Cars', 'Old Cars'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-colors text-sm md:text-base ${activeFilter === filter
                                    ? 'bg-yellow-500 text-black'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Filter Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Brands</label>
                            <select
                                value={filters.brand}
                                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm md:text-base"
                            >
                                <option>Toyota</option>
                                <option>Honda</option>
                                <option>BMW</option>
                                <option>Mercedes</option>
                                <option>Ford</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Models</label>
                            <select
                                value={filters.model}
                                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm md:text-base"
                            >
                                <option>Corolla XSE</option>
                                <option>Civic</option>
                                <option>3 Series</option>
                                <option>GLA</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Years</label>
                            <select
                                value={filters.year}
                                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm md:text-base"
                            >
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Price ranges</label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm md:text-base"
                            >
                                <option>$15,500 - $18,000</option>
                                <option>$20,000 - $30,000</option>
                                <option>$30,000 - $50,000</option>
                                <option>$50,000+</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="sm:w-auto w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base min-w-[150px] mx-auto">
                        <Search className="h-5 w-5" />
                        Search Now
                    </button>
                </div>
            </div>
        </section>
    )
}