'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

const portfolioItems = [
  {
    title: 'Starlight Sonata',
    author: 'Kimberly Rodriguez',
    tagline: "She's human, he's not. Can they defy the odds?",
    image: '/services-1.jpeg',
  },
  {
    title: 'Sunset Dreaming',
    author: 'Lorraine Sherman',
    tagline: 'Illustrated by Eduardo Rivera',
    image: '/services-2.jpeg',
  },
  {
    title: 'Sunsets with Annie',
    author: 'Gretchen Ferguson',
    tagline: 'A journey through light and memory',
    image: '/services-3.jpeg',
  },
  {
    title: 'Darkness, Fade',
    author: 'James Lopez',
    tagline: 'Based on the Lamplight Award - Best Short Story winner',
    image: '/home-banner.jpeg',
  },
  {
    title: 'The Edge of the Universe',
    author: 'Nathan Harrington',
    tagline: 'A gripping story that will leave you on the edge of your seat',
    image: '/services-1.jpeg',
  },
]

function getSlidesPerView(): number {
  if (typeof window === 'undefined') return 1
  const w = window.innerWidth
  if (w >= 1280) return 4
  if (w >= 1024) return 3
  if (w >= 640) return 2
  return 1
}

export default function PortfolioSection() {
  const [index, setIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    const update = () => setSlidesPerView(getSlidesPerView())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, portfolioItems.length - slidesPerView)
  const displayIndex = maxIndex === 0 ? 0 : Math.min(index, maxIndex)

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1))
  }, [maxIndex])

  const goNext = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  useEffect(() => {
    const id = setInterval(goNext, 4000)
    return () => clearInterval(id)
  }, [goNext])

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 rounded-full bg-amber-50 text-gray-800 font-semibold text-sm uppercase tracking-wide mb-4">
            Our Portfolios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            A catalogue that inspires dialogue.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re here to help you whenever you need it. A whole range of book writing and publishing services are available at Cylage.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${displayIndex * (100 / slidesPerView)}%)`,
              }}
            >
              {portfolioItems.map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{ width: `calc((100% - ${(slidesPerView - 1) * 24}px) / ${slidesPerView})` }}
                >
                  <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg sm:text-xl leading-tight mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/90">{item.author}</p>
                        {item.tagline && (
                          <p className="text-xs text-white/80 mt-1 line-clamp-2">
                            {item.tagline}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === displayIndex ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
