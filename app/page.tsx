'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Star, Calendar } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Footer from './components/Footer'
import TeamSection from './components/TeamSection'
import ContactSection from './components/ContactSection'
import CTASection from './components/CTASection'
import CounterSection from './components/CounterSection'
import PortfolioSection from './components/PortfolioSection'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const processSectionRef = useRef<HTMLElement>(null)
  const processCirclesRef = useRef<(HTMLDivElement | null)[]>([])
  const processBoxesRef = useRef<(HTMLDivElement | null)[]>([])
  const processArrowsRef = useRef<(SVGElement | null)[]>([])
  const processArrowHeadsRef = useRef<(SVGElement | null)[]>([])

  // Refs for GSAP scroll animations (same style as services page)
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesHeaderRef = useRef<HTMLDivElement>(null)
  const servicesGridRef = useRef<HTMLDivElement>(null)
  const portfolioWrapRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const counterWrapRef = useRef<HTMLDivElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const teamWrapRef = useRef<HTMLDivElement>(null)
  const reviewsSectionRef = useRef<HTMLElement>(null)
  const reviewsHeaderRef = useRef<HTMLDivElement>(null)
  const reviewsGridRef = useRef<HTMLDivElement>(null)
  const contactWrapRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      title: 'Publishing Services',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when.It is a long established fact that a reader will be distracted by the readable content of a page when.'
    },
    {
      title: 'Business Marketing',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when.It is a long established fact that a reader will be distracted by the readable content of a page when.'
    },
    {
      title: 'Author Marketing',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when.It is a long established fact that a reader will be distracted by the readable content of a page when.'
    }
  ]

  const process = [
    { step: '01', title: 'Consultation', description: 'We discuss your goals and vision' },
    { step: '02', title: 'Strategy', description: 'Custom plan tailored to your needs' },
    { step: '03', title: 'Execution', description: 'Professional implementation' },
    { step: '04', title: 'Review', description: 'We refine and perfect every detail' },
    { step: '05', title: 'Feedback', description: 'Your input shapes the final result' },
    { step: '06', title: 'Refinement', description: 'Final tweaks based on your feedback' },
    { step: '07', title: 'Launch', description: 'Your success story begins' },
    { step: '08', title: 'Support', description: 'Ongoing support for your success' }
  ]

  const reviews = [
    { name: 'Jennifer Williams', rating: 5, text: 'Cylage transformed my manuscript into a bestseller. Their attention to detail is unmatched!' },
    { name: 'David Thompson', rating: 5, text: 'The marketing team helped my business reach new heights. Highly recommended!' },
    { name: 'Amanda Lee', rating: 5, text: 'Professional, creative, and results-driven. Cylage is the partner every author needs.' }
  ]

  useEffect(() => {
    if (!processSectionRef.current || processCirclesRef.current.length === 0) return

    const circles = processCirclesRef.current.filter(Boolean) as HTMLDivElement[]
    const boxes = processBoxesRef.current.filter(Boolean) as HTMLDivElement[]
    if (circles.length === 0) return

    // Create a master timeline - optimized for performance
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: processSectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * circles.length * 0.6}`, // Reduced scroll distance
        pin: true,
        scrub: 0.5, // Smoother scrubbing
        anticipatePin: 1,
        markers: false,
        pinSpacing: true,
        onLeave: () => {
          gsap.set(circles, { clearProps: 'backgroundColor' })
          gsap.set(boxes, { clearProps: 'backgroundColor' })
          const glowEffects = circles.map(c => c.querySelector('.glow-effect')).filter(Boolean) as HTMLElement[]
          gsap.set(glowEffects, { clearProps: 'backgroundColor,opacity' })
          const arrows = processArrowsRef.current.filter(Boolean) as SVGElement[]
          const arrowHeads = processArrowHeadsRef.current.filter(Boolean) as SVGElement[]
          gsap.set(arrows, { clearProps: 'stroke' })
          gsap.set(arrowHeads, { clearProps: 'fill' })
        },
        onLeaveBack: () => {
          gsap.set(circles, { backgroundColor: '#0f172a' })
          gsap.set(boxes, { backgroundColor: '#1e293b' })
          const glowEffects = circles.map(c => c.querySelector('.glow-effect')).filter(Boolean) as HTMLElement[]
          gsap.set(glowEffects, { backgroundColor: '#0f172a', opacity: 0.5 })
          const arrows = processArrowsRef.current.filter(Boolean) as SVGElement[]
          const arrowHeads = processArrowHeadsRef.current.filter(Boolean) as SVGElement[]
          gsap.set(arrows, { stroke: '#0f172a' })
          gsap.set(arrowHeads, { fill: '#0f172a' })
        }
      }
    })

    // Animate each circle and box sequentially
    circles.forEach((circle, index) => {
      const startProgress = index / circles.length
      const endProgress = (index + 1) / circles.length

      // Get the glow effect element
      const glowEffect = circle.querySelector('.glow-effect') as HTMLElement
      const box = boxes[index]

      // Change background color for this circle - prominent active state
      masterTl.to(circle, {
        backgroundColor: '#334155', // Slate-700 for active
        duration: 0.15,
        ease: 'none', // Linear for better performance
        force3D: true // GPU acceleration
      }, startProgress)

      // Animate glow effect to match
      if (glowEffect) {
        masterTl.to(glowEffect, {
          backgroundColor: '#334155',
          opacity: 0.6,
          duration: 0.15,
          ease: 'none',
          force3D: true
        }, startProgress)
      }

      // Animate process box background color - prominent active
      if (box) {
        masterTl.to(box, {
          backgroundColor: '#334155', // Slate-700 for active box
          duration: 0.15,
          ease: 'none',
          force3D: true
        }, startProgress)
      }

      // Animate arrow colors (arrow after this circle)
      if (index < circles.length - 1) {
        const arrow = processArrowsRef.current[index]
        const arrowHead = processArrowHeadsRef.current[index]

        if (arrow) {
          masterTl.to(arrow, {
            stroke: '#334155',
            duration: 0.15,
            ease: 'none',
            force3D: true
          }, startProgress)
        }

        if (arrowHead) {
          masterTl.to(arrowHead, {
            fill: '#334155',
            duration: 0.15,
            ease: 'none',
            force3D: true
          }, startProgress)
        }
      }

      // Keep it active until next one starts
      if (index < circles.length - 1) {
        masterTl.to(circle, {
          backgroundColor: '#334155',
          duration: 0.05,
          ease: 'none'
        }, endProgress - 0.05)

        if (box) {
          masterTl.to(box, {
            backgroundColor: '#334155',
            duration: 0.05,
            ease: 'none'
          }, endProgress - 0.05)
        }

        const arrow = processArrowsRef.current[index]
        const arrowHead = processArrowHeadsRef.current[index]

        if (arrow) {
          masterTl.to(arrow, {
            stroke: '#334155',
            duration: 0.05,
            ease: 'none'
          }, endProgress - 0.05)
        }

        if (arrowHead) {
          masterTl.to(arrowHead, {
            fill: '#334155',
            duration: 0.05,
            ease: 'none'
          }, endProgress - 0.05)
        }
      }
    })

    // Reset all to original at the end - optimized
    masterTl.to(circles, {
      backgroundColor: '#0f172a',
      duration: 0.08,
      ease: 'none',
      force3D: true
    }, 0.98)

    // Reset glow effects - optimized
    const glowEffects = circles.map(circle => circle.querySelector('.glow-effect')).filter(Boolean) as HTMLElement[]
    masterTl.to(glowEffects, {
      backgroundColor: '#0f172a',
      opacity: 0.5,
      duration: 0.08,
      ease: 'none',
      force3D: true
    }, 0.98)

    // Reset process boxes to original background
    masterTl.to(boxes, {
      backgroundColor: '#1e293b',
      duration: 0.08,
      ease: 'none',
      force3D: true
    }, 0.98)

    // Reset arrows to original color
    const arrows = processArrowsRef.current.filter(Boolean) as SVGElement[]
    const arrowHeads = processArrowHeadsRef.current.filter(Boolean) as SVGElement[]
    masterTl.to(arrows, {
      stroke: '#0f172a',
      duration: 0.08,
      ease: 'none',
      force3D: true
    }, 0.98)
    masterTl.to(arrowHeads, {
      fill: '#0f172a',
      duration: 0.08,
      ease: 'none',
      force3D: true
    }, 0.98)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === processSectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  // GSAP scroll animations for all sections except Our Process
  // Defer setup until after paint so refs and layout are ready; use .to() for hero to avoid flash
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const stConfig = { start: 'top 85%', toggleActions: 'play none none reverse' as const }

        // Hero: elements start with initial styles (opacity 0) in JSX; animate in with .to() so no flash
        if (heroSectionRef.current) {
          gsap.to(heroSectionRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', overwrite: true })
          if (heroTextRef.current) gsap.to(heroTextRef.current, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1, overwrite: true })
          if (heroImageRef.current) gsap.to(heroImageRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.1, overwrite: true })
        }

        // Services
        if (servicesSectionRef.current) {
          gsap.fromTo(servicesSectionRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: servicesSectionRef.current, ...stConfig } })
          if (servicesHeaderRef.current) gsap.fromTo(servicesHeaderRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: servicesSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
          if (servicesGridRef.current?.children?.length) gsap.fromTo(servicesGridRef.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.25, scrollTrigger: { trigger: servicesSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
        }

        // Portfolio
        if (portfolioWrapRef.current) gsap.fromTo(portfolioWrapRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: portfolioWrapRef.current, ...stConfig } })

        // About
        if (aboutSectionRef.current) {
          gsap.fromTo(aboutSectionRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: aboutSectionRef.current, ...stConfig } })
          if (aboutContentRef.current) gsap.fromTo(aboutContentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: aboutSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
        }

        // Counter
        if (counterWrapRef.current) gsap.fromTo(counterWrapRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: counterWrapRef.current, ...stConfig } })

        // CTA
        if (ctaWrapRef.current) gsap.fromTo(ctaWrapRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ctaWrapRef.current, ...stConfig } })

        // Team
        if (teamWrapRef.current) gsap.fromTo(teamWrapRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: teamWrapRef.current, ...stConfig } })

        // Reviews
        if (reviewsSectionRef.current) {
          gsap.fromTo(reviewsSectionRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: reviewsSectionRef.current, ...stConfig } })
          if (reviewsHeaderRef.current) gsap.fromTo(reviewsHeaderRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: reviewsSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
          if (reviewsGridRef.current?.children?.length) gsap.fromTo(reviewsGridRef.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.25, scrollTrigger: { trigger: reviewsSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
        }

        // Contact
        if (contactWrapRef.current) gsap.fromTo(contactWrapRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: contactWrapRef.current, ...stConfig } })
      })
    })

    const onRefresh = () => ScrollTrigger.refresh()
    const refreshId = setTimeout(onRefresh, 400)
    if (typeof window !== 'undefined') window.addEventListener('load', onRefresh)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(refreshId)
      if (typeof window !== 'undefined') window.removeEventListener('load', onRefresh)
      ScrollTrigger.getAll().forEach(t => {
        const triggerEl = t.trigger as HTMLElement | undefined
        if (triggerEl && triggerEl !== processSectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section ref={heroSectionRef} id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={heroTextRef} className="space-y-6" style={{ opacity: 0, transform: 'translateX(-60px)' }}>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Story, <br />
                <span className="text-gray-600">Our Expertise</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Cylage brings your publishing dreams to life with professional services in book publishing and strategic marketing solutions for businesses and authors.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-md font-medium transition-colors">
                  Get Started
                </button>
                <button className="inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 hover:bg-gray-50 px-8 py-6 text-lg rounded-md font-medium transition-colors">
                  View Our Work
                </button>
              </div>
            </div>
            <div ref={heroImageRef} className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl" style={{ opacity: 0, transform: 'translateX(80px) scale(0.95)' }}>
              <Image
                src="/home-banner.jpeg"
                alt="Books collection"
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesSectionRef} id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#101828]">
        <div className="max-w-7xl mx-auto">
          <div ref={servicesHeaderRef} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Comprehensive solutions tailored to bring your vision to life
            </p>
          </div>

          <div ref={servicesGridRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-glass-card group rounded-2xl bg-white border border-[#101828] shadow-sm p-6 lg:p-8 cursor-pointer"
              >
                <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="relative z-10 text-base text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={aboutContentRef} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cylage is a dynamic publishing and marketing company dedicated to helping authors and businesses achieve their goals.
              With years of experience and a passion for storytelling, we provide comprehensive solutions that combine creativity with strategy.
            </p>
          </div>
        </div>
      </section>

      <div ref={counterWrapRef}>
        <CounterSection />
      </div>

      <div ref={portfolioWrapRef}>
        <PortfolioSection />
      </div>

      <div ref={ctaWrapRef}>
        <CTASection />
      </div>

      <div ref={teamWrapRef}>
        <TeamSection />
      </div>

      <section
        ref={processSectionRef}
        data-skip-animation
        className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">Simple steps to bring your project to life</p>
          </div>

          <div className="relative mb-12">
            <div className="grid md:grid-cols-4 gap-4 lg:gap-8 relative items-stretch">
              {process.map((item, index) => (
                <div key={index} className="relative z-10 flex flex-col h-full">
                  <div className="text-center flex flex-col h-full">
                    <div className="relative inline-block mb-4" style={{ margin: '0 auto' }}>
                      {/* Step Circle - 96px (w-24 h-24) */}
                      <div 
                        ref={(el) => {
                          processCirclesRef.current[index] = el
                        }}
                        className="process-circle relative w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        style={{ backgroundColor: '#0f172a' }}
                      >
                        <span className="relative z-10">{item.step}</span>
                        {/* Subtle glow effect that will animate with background */}
                        <div className="glow-effect absolute inset-0 rounded-full opacity-50 blur-xl" style={{ backgroundColor: '#0f172a' }}></div>
                      </div>
                      {/* Center line marker for debugging - remove in production */}
                    </div>
                    
                    {/* Step Content */}
                    <div 
                      ref={(el) => {
                        processBoxesRef.current[index] = el
                      }}
                      className="rounded-xl p-4 lg:p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex-1 flex flex-col"
                      style={{ backgroundColor: '#1e293b', marginTop: '12px' }}
                    >
                      <h4 className="text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">{item.title}</h4>
                      <p className="text-slate-200 text-sm lg:text-base leading-relaxed flex-1">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Curved Arrow Connectors */}
                  {index < process.length - 1 && (
                    <>
                      {/* Desktop: Horizontal curved arrow (no vertical arrow between row 1 and 2) */}
                      {index !== 3 && (
                        <div 
                          className="hidden md:block absolute pointer-events-none z-0"
                          style={{ 
                            top: '48px',
                            left: '55%',
                            width: '90%',
                            height: '80px',
                            transform: 'translateY(-50%)'
                          }}
                        >
                          <svg 
                            width="100%" 
                            height="80" 
                            viewBox="0 0 200 80" 
                            preserveAspectRatio="none"
                            style={{ overflow: 'visible', minWidth: '60px' }}
                          >
                            <path 
                              ref={(el) => {
                                processArrowsRef.current[index] = el
                              }}
                              d="M 0 40 Q 100 15, 200 40" 
                              stroke="#0f172a"
                              strokeWidth="3.5" 
                              fill="none" 
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <polygon 
                              ref={(el) => {
                                processArrowHeadsRef.current[index] = el
                              }}
                              points="185,33 200,40 185,47" 
                              fill="#0f172a"
                            />
                          </svg>
                        </div>
                      )}
                      
                      {/* Mobile: Vertical curved arrow (hidden between step 4 and 5) */}
                      {index !== 3 && (
                      <div 
                        className="md:hidden absolute top-full left-1/2 pointer-events-none z-0"
                        style={{ 
                          height: '4rem',
                          width: '48px',
                          transform: 'translateX(-50%)',
                          marginTop: '0.5rem'
                        }}
                      >
                        <svg 
                          width="48" 
                          height="64" 
                          viewBox="0 0 48 64" 
                          preserveAspectRatio="xMidYMid meet"
                          style={{ overflow: 'visible' }}
                        >
                          <defs>
                            <linearGradient id={`arrowVert${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#0f172a" />
                              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.7" />
                            </linearGradient>
                          </defs>
                          {/* Curved vertical path */}
                          <path 
                            ref={(el) => {
                              processArrowsRef.current[index] = el
                            }}
                            d="M 24 5 Q 24 30, 24 50" 
                            stroke="#0f172a"
                            strokeWidth="4" 
                            fill="none" 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Filled arrowhead */}
                          <polygon 
                            ref={(el) => {
                              processArrowHeadsRef.current[index] = el
                            }}
                            points="20,42 24,50 28,42" 
                            fill="#0f172a"
                          />
                        </svg>
                      </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-600 mb-8">Schedule a consultation with our team to discuss your project</p>
            <button className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-md font-medium transition-colors">
              <Calendar className="w-5 h-5 mr-2" />
              Book a Zoom Meeting
            </button>
          </div>
        </div>
      </section>

      <section ref={reviewsSectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={reviewsHeaderRef} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Reviews</h2>
            <p className="text-xl text-gray-600">What our clients say about us</p>
          </div>

          <div ref={reviewsGridRef} className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="rounded-lg bg-white shadow-lg p-8"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                <p className="font-bold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div ref={contactWrapRef}>
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
