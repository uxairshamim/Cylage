'use client'

import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="/">
              <Image src="/cylage_logo.png" alt="Cylage" width={150} height={60} className="h-12 w-auto" />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">Home</a>
            <a href="/about" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">About Us</a>
            <a href="/services" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">Services & Packages</a>
            <a href="/contact" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">Contact</a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <a href="/" className="block text-gray-900 hover:text-gray-600 transition-colors font-medium">Home</a>
            <a href="/about" className="block text-gray-900 hover:text-gray-600 transition-colors font-medium">About Us</a>
            <a href="/services" className="block text-gray-900 hover:text-gray-600 transition-colors font-medium">Services & Packages</a>
            <a href="/contact" className="block text-gray-900 hover:text-gray-600 transition-colors font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}
