'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const contactWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contactWrapRef.current) {
      gsap.fromTo(
        contactWrapRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactWrapRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
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
                Contact Us
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Let&apos;s Start a Conversation
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                Have a project in mind? We&apos;d love to hear from you. Reach out and let&apos;s discuss how we can bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div ref={contactWrapRef}>
        <ContactSection />
      </div>

      <Footer />
    </div>
  )
}
