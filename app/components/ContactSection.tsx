'use client'

import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'

const SUCCESS_MESSAGE = "Thank you! Your message has been sent. We'll get back to you soon."
const ERROR_FALLBACK = 'Failed to send message. Please try again later.'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (!popup) return
    const t = setTimeout(() => setPopup(null), 5000)
    return () => clearTimeout(t)
  }, [popup])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPopup(null)
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setPopup({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
        return
      }

      setPopup({ type: 'success', message: SUCCESS_MESSAGE })
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch {
      setPopup({ type: 'error', message: ERROR_FALLBACK })
    } finally {
      setLoading(false)
    }
  }

  function closePopup() {
    setPopup(null)
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have a project in mind? We&apos;d love to hear from you. Fill out the form and our
              team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-gray-900 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Our Location</h4>
                  <p className="text-gray-600">
                    123 Publishing Avenue
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 h-64 sm:h-72 lg:h-80">
              <iframe
                src="https://www.google.com/maps?q=123+Publishing+Avenue+New+York+NY+10001&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cylage office location"
                className="w-full h-full min-h-[256px]"
              />
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-900 mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us about your project"
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-lg rounded-md font-medium transition-colors"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Result popup */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
          onClick={closePopup}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 text-center animate-[fadeInScale_0.3s_ease-out_0.05s_forwards]"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {popup.type === 'success' && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="contact-popup-icon-wrap success">
                    <svg className="contact-popup-check" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="contact-popup-circle" cx="26" cy="26" r="24" strokeWidth="2" />
                      <path className="contact-popup-check-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 26l8 8 16-18" />
                    </svg>
                  </div>
                </div>
                <h3 id="popup-title" className="text-xl font-semibold text-gray-900 mb-2">Success</h3>
                <p className="text-gray-600">{popup.message}</p>
              </>
            )}

            {popup.type === 'error' && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="contact-popup-icon-wrap error">
                    <svg className="contact-popup-x" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="contact-popup-circle" cx="26" cy="26" r="24" strokeWidth="2" />
                      <path className="contact-popup-x-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 18l16 16M34 18L18 34" />
                    </svg>
                  </div>
                </div>
                <h3 id="popup-title" className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
                <p className="text-gray-600">{popup.message}</p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
