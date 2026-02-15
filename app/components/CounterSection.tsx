'use client'

import { useEffect, useRef, useState } from 'react'

const COUNTERS = [
  { value: 1300, label: 'Completed Projects', suffix: '+' },
  { value: 350, label: 'Talented Team Members', suffix: '+' },
  { value: 600, label: 'Satisfied Clients', suffix: '+' },
]

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function animateValue(
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
) {
  const startTime = performance.now()

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOutCubic(progress)
    const value = Math.floor(start + (end - start) * eased)
    onUpdate(value)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else if (onComplete) {
      onComplete()
    }
  }

  requestAnimationFrame(update)
}

export default function CounterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [displayValues, setDisplayValues] = useState<number[]>([0, 0, 0])
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true

            COUNTERS.forEach((counter, index) => {
              animateValue(
                0,
                counter.value,
                2000,
                (value) => {
                  setDisplayValues((prev) => {
                    const next = [...prev]
                    next[index] = value
                    return next
                  })
                }
              )
            })
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#101828]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top text block */}
        <div className="text-center w-[70%] mx-auto !mb-[60px]">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our journey of building success
          </h2>
          <p className="text-base sm:text-lg text-white leading-relaxed">
            We are a full-cycle product development company that combines
            creative thinking with technical expertise to create user-centric
            products that solve real problems and drive business growth.
          </p>
        </div>

        {/* Counter block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 lg:gap-24 text-center">
          {COUNTERS.map((counter, index) => (
            <div key={index} className="space-y-2 flex flex-col items-center justify-center text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums">
                {displayValues[index].toLocaleString()}
                {counter.suffix}
              </div>
              <p className="text-base sm:text-lg text-white">
                {counter.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
