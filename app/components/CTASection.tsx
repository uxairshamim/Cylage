'use client'

import { Star } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Place Your Order With Us Today
          </h2>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Our professional writers start most orders within{' '}
            <span className="font-bold text-white">30 minutes!</span>
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button 
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 text-base rounded-md font-medium transition-colors min-w-[180px]"
            >
              Lets Get Started
            </button>
            
            <button 
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-base rounded-md font-medium transition-colors min-w-[180px]"
            >
              Live Chat
            </button>
            
            <button 
              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 text-base rounded-md font-medium transition-colors min-w-[180px]"
            >
              (213) 444-4178
            </button>
          </div>
          
          {/* Rating Section */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star 
                className="w-5 h-5 fill-yellow-400/50 text-yellow-400"
              />
            </div>
            <span className="text-white text-base font-medium">4.5/5</span>
            <span className="text-gray-300 text-base">35 Customer Reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
