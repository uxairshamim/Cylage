'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const packages = [
  {
    id: 'starter',
    title: 'Starter',
    subtitle: 'Perfect for first-time authors',
    price: '$999',
    features: [
      'Basic editing',
      'Cover design',
      'Interior formatting',
      'ISBN registration',
      'Amazon publishing',
    ],
    highlighted: false,
  },
  {
    id: 'professional',
    title: 'Professional',
    subtitle: 'For serious authors',
    price: '$2,499',
    features: [
      'Advanced editing',
      'Premium cover design',
      'Professional formatting',
      'Multi-platform publishing',
      'Marketing campaign',
      'Author website',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    title: 'Premium',
    subtitle: 'Complete publishing solution',
    price: '$4,999',
    features: [
      'Comprehensive editing',
      'Custom cover design',
      'Premium formatting',
      'Global distribution',
      'Full marketing suite',
      'Audiobook production',
      'PR & media outreach',
    ],
    highlighted: false,
  },
]

export default function PackagesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const stConfig = { start: 'top 85%', toggleActions: 'play none none reverse' as const }

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, ...stConfig } }
    )
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      )
    }
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.25 + i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="packages" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Author Publishing Packages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the package that fits your goals. From first-time authors to full-scale launches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              ref={el => { cardsRef.current[index] = el }}
              className={`relative rounded-xl flex flex-col border transition-all duration-300 hover:shadow-lg ${
                pkg.highlighted
                  ? 'bg-gray-900 text-white border-gray-900 shadow-xl md:-mt-2 md:mb-2 md:scale-[1.02] z-10'
                  : 'bg-white text-gray-900 border-gray-200 shadow-md hover:border-gray-300'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex-1 p-8 pt-10">
                <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.title}
                </h3>
                <p className={`text-sm mb-6 ${pkg.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                  {pkg.subtitle}
                </p>
                <div className={`text-4xl sm:text-5xl font-bold mb-8 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.price}
                </div>
                <ul className="space-y-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${pkg.highlighted ? 'text-gray-400' : 'text-gray-600'}`}
                        strokeWidth={2.5}
                      />
                      <span className={pkg.highlighted ? 'text-gray-200' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-6 border-t border-gray-200/50">
                <button
                  type="button"
                  className={`w-full py-4 rounded-md text-lg font-medium transition-colors ${
                    pkg.highlighted
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
