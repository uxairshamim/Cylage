'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TeamSection from '../components/TeamSection'
import CTASection from '../components/CTASection'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const visionSectionRef = useRef<HTMLElement>(null)
  const visionImagesRef = useRef<HTMLDivElement>(null)
  const visionTextRef = useRef<HTMLDivElement>(null)
  const whySectionRef = useRef<HTMLElement>(null)
  const whyHeaderRef = useRef<HTMLDivElement>(null)
  const whyGridRef = useRef<HTMLDivElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const teamWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stConfig = { start: 'top 85%', toggleActions: 'play none none reverse' as const }

    // Vision & Mission section: image left, text right
    if (visionSectionRef.current) {
      gsap.fromTo(visionSectionRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: visionSectionRef.current, ...stConfig } })
      if (visionImagesRef.current) gsap.fromTo(visionImagesRef.current, { opacity: 0, x: -80, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: visionSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
      if (visionTextRef.current) gsap.fromTo(visionTextRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: visionSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
    }

    // Why Cylage section
    if (whySectionRef.current) {
      gsap.fromTo(whySectionRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: whySectionRef.current, ...stConfig } })
      if (whyHeaderRef.current) gsap.fromTo(whyHeaderRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: whySectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
      if (whyGridRef.current?.children?.length) gsap.fromTo(whyGridRef.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.25, scrollTrigger: { trigger: whySectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
    }

    // CTA wrap
    if (ctaWrapRef.current) gsap.fromTo(ctaWrapRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ctaWrapRef.current, ...stConfig } })

    // Team wrap
    if (teamWrapRef.current) gsap.fromTo(teamWrapRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: teamWrapRef.current, ...stConfig } })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src="/services-1.jpeg"
              alt="Books banner"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto py-16">
              <p className="text-sm font-semibold tracking-wide text-white/90 uppercase mb-4">
                About Cylage
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Crafting stories
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                Cylage is a publishing and marketing studio dedicated to turning powerful ideas
                into beautifully crafted books and campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={visionSectionRef} className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div ref={visionImagesRef} className="space-y-6">
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/services-2.jpeg"
                alt="Stack of books on a desk"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/services-3.jpeg"
                alt="Author writing and planning"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div ref={visionTextRef} className="space-y-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the trusted creative partner for authors and businesses who want more
                than just a book or a campaign—they want a legacy. We envision a world where
                every meaningful story finds the audience it deserves.
              </p>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to combine editorial excellence, thoughtful design, and
                strategic marketing into a seamless journey—from first draft to global
                launch. We guide you through each chapter: planning, publishing, and
                promoting with clarity and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cylage */}
      <section ref={whySectionRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={whyHeaderRef} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why work with Cylage?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From concept to bookstore shelves, we bring together a team of editors,
              designers, and marketers who treat your project like their own.
            </p>
          </div>

          <div ref={whyGridRef} className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Editorial Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Developmental editing, line editing, and proofreading to ensure your story
                is clear, compelling, and polished.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Design that Speaks</h3>
              <p className="text-gray-600 leading-relaxed">
                Thoughtful cover and interior design that align with your genre, audience,
                and brand identity.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Strategic Marketing</h3>
              <p className="text-gray-600 leading-relaxed">
                Launch plans, campaigns, and ongoing support to position your book and
                brand where readers already are.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div ref={ctaWrapRef}>
        <CTASection />
      </div>

      <div ref={teamWrapRef}>
        <TeamSection />
      </div>

      <Footer />
    </div>
  )
}

