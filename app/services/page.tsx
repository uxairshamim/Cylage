'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PackagesSection from '../components/PackagesSection'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'editing',
    title: 'Editing',
    tagline: 'Developmental & Line Editing',
    description: 'Our editorial team works closely with you to strengthen structure, voice, and clarity. From big-picture developmental editing to sentence-level line editing, we help your manuscript become the best version of itself before it reaches readers.',
    image: '/services-1.jpeg',
    layout: 'image-left',
  },
  {
    id: 'proofreading',
    title: 'Proofreading',
    tagline: 'Polish Before Publication',
    description: 'We catch grammar, spelling, punctuation, and consistency issues so your book reads flawlessly. Our proofreaders follow industry standards and your style guide, ensuring a professional finish for print and digital editions.',
    image: '/services-2.jpeg',
    layout: 'image-right',
  },
  {
    id: 'printing',
    title: 'Printing',
    tagline: 'Quality Physical Books',
    description: 'From cover design to paper choice and binding, we manage the full print production process. Whether you need a short run for events or a larger distribution print run, we deliver high-quality physical books that look and feel exceptional.',
    image: '/services-3.jpeg',
    layout: 'image-left',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    tagline: 'Reach Your Readers',
    description: 'We build tailored marketing plans for authors and brands—launch campaigns, social content, email sequences, and PR support. Our goal is to put your book or campaign in front of the right audience and drive meaningful engagement.',
    image: '/home-banner.jpeg',
    layout: 'image-right',
  },
]

export default function ServicesPage() {
  const bannerRef = useRef<HTMLElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    sectionRefs.current.forEach((section, i) => {
      if (!section) return
      const imageEl = imageRefs.current[i]
      const textEl = textRefs.current[i]
      const isLeft = services[i].layout === 'image-left'

      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      if (imageEl) {
        gsap.fromTo(
          imageEl,
          { opacity: 0, x: isLeft ? -80 : 80, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (textEl) {
        gsap.fromTo(
          textEl,
          { opacity: 0, x: isLeft ? 60 : -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <section ref={bannerRef} className="pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src="/services-1.jpeg"
              alt="Services banner"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto py-16">
              <p className="text-sm font-semibold tracking-wide text-white/90 uppercase mb-4">
                Our Services
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Editing, Proofreading, Printing & Marketing
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                End-to-end publishing and marketing support to bring your book and brand to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          ref={(el) => {
            sectionRefs.current[index] = el
          }}
          id={service.id}
          className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                service.layout === 'image-right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                className={service.layout === 'image-right' ? 'lg:order-2' : 'lg:order-1'}
              >
                <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>
              <div
                ref={(el) => {
                  textRefs.current[index] = el
                }}
                className={service.layout === 'image-right' ? 'lg:order-1' : 'lg:order-2'}
              >
                <span className="inline-block text-sm font-semibold tracking-wide text-gray-500 uppercase mb-3">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-6">{service.tagline}</p>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <PackagesSection />

      <Footer />
    </div>
  )
}
