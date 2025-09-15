'use client'
import { useState } from 'react'
import { Search, Menu, X, User } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg relative z-50">
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
            <a href="#" className="text-gray-700 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">
              Cars
            </a>
            <a href="#" className="text-gray-700 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Search and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars..."
                className="bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="p-2 text-gray-700 hover:text-yellow-500 transition-colors">
              <User className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-yellow-500 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-2">
              <a href="#" className="block text-gray-700 hover:text-yellow-500 py-2 text-sm font-medium">
                Home
              </a>
              <a href="#" className="block text-gray-700 hover:text-yellow-500 py-2 text-sm font-medium">
                Cars
              </a>
              <a href="#" className="block text-gray-700 hover:text-yellow-500 py-2 text-sm font-medium">
                About
              </a>
              <a href="#" className="block text-gray-700 hover:text-yellow-500 py-2 text-sm font-medium">
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search cars..."
                    className="bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}