'use client'
import { useState } from 'react'
import { Search, Menu, X, User } from 'lucide-react'
import Image from 'next/image'

export default function AboutHero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/aboutheader.jpg"
                    alt="About Piza Motors"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>

            {/* Navigation */}
            <div className="relative z-50 py-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/60 backdrop-blur-lg rounded-full shadow-lg border border-white/20">
                        <div className="flex justify-between items-center h-16 px-6">

                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Image
                                    src="/assets/PizaLogo.png"
                                    alt="Piza Motors"
                                    width={120}
                                    height={40}
                                    className="h-12 w-auto"
                                />
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex space-x-8">
                                {[
                                    { name: "Home", href: "/" },
                                    { name: "Cars", href: "/cars" },
                                    { name: "About", href: "/about", active: true },
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
                                    { name: "Home", href: "/" },
                                    { name: "Cars", href: "/cars" },
                                    { name: "About", href: "/about", active: true },
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
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 transform translate-y-10 md:translate-y-12">
                <div className="max-w-3xl w-full">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow">
                        About <span className="text-yellow-400">Piza Motors</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 text-shadow max-w-2xl mx-auto">
                        Your trusted automotive partner since day one.
                        Committed to quality, reliability, and exceptional customer service.
                    </p>
                </div>
            </div>
        </section>
    )
}