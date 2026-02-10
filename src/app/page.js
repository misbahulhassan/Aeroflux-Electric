'use client'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setFormMessage('')

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([contactForm])

      if (error) throw error

      setFormMessage('Message sent successfully! We\'ll get back to you soon.')
      setContactForm({ name: '', email: '', message: '' })
    } catch (err) {
      setFormMessage('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-zinc-950 to-zinc-950"></div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto py-32">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
            Aeroflux Electric
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            Premium Electronics for Every Season
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of cooling fans, heating solutions, and innovative electronic accessories designed to enhance your comfort all year round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                Shop Now
              </button>
            </Link>
            <a href="#contact">
              <button className="border-2 border-purple-500 text-purple-400 px-10 py-4 rounded-full text-lg font-semibold hover:bg-purple-500 hover:text-white transition-all">
                Contact Us
              </button>
            </a>
          </div>
        </div>

        {/* Rainbow floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </section>

      {/* Product Categories */}
      <section className="py-24 px-8 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Shop by Category</h2>
          <p className="text-xl text-gray-500 text-center mb-16">Find the perfect solution for your needs</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/products?category=Cooling">
              <div className="group relative bg-zinc-900/50 backdrop-blur-lg rounded-3xl p-8 border border-zinc-800 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer">
                <div className="text-6xl mb-4">❄️</div>
                <h3 className="text-2xl font-semibold mb-2">Cooling Solutions</h3>
                <p className="text-gray-400 mb-4">Fans, air coolers, and portable cooling devices to beat the heat</p>
                <span className="text-blue-400 group-hover:text-blue-300">Explore Cooling →</span>
              </div>
            </Link>

            <Link href="/products?category=Heating">
              <div className="group relative bg-zinc-900/50 backdrop-blur-lg rounded-3xl p-8 border border-zinc-800 hover:border-orange-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer">
                <div className="text-6xl mb-4">🔥</div>
                <h3 className="text-2xl font-semibold mb-2">Heating Solutions</h3>
                <p className="text-gray-400 mb-4">Heaters, radiators, and warmers for cozy winters</p>
                <span className="text-orange-400 group-hover:text-orange-300">Explore Heating →</span>
              </div>
            </Link>

            <Link href="/products?category=Accessories">
              <div className="group relative bg-zinc-900/50 backdrop-blur-lg rounded-3xl p-8 border border-zinc-800 hover:border-green-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-semibold mb-2">Accessories</h3>
                <p className="text-gray-400 mb-4">Smart gadgets, lighting, and premium electronic accessories</p>
                <span className="text-green-400 group-hover:text-green-300">Explore More →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8 bg-gradient-to-b from-zinc-950 to-zinc-900 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Why Choose Aeroflux Electric?
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">Excellence in every product</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-400">Carefully curated products from trusted brands</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-400">Competitive pricing with no hidden costs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-400">Quick and reliable shipping to your doorstep</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-400">Always here to help with your queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">We'd love to hear from you</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:support@aerofluxelectric.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                      support@aerofluxelectric.comnp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:+919876543210" className="text-gray-400 hover:text-purple-400 transition-colors">
                      +91 76677 61797
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Address</p>
                    <p className="text-gray-400">
                      Patna, Bihar, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Business Hours</p>
                    <p className="text-gray-400">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-400">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800">
              <h3 className="text-2xl font-bold mb-6">Quick Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
                  required
                />
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
                  required
                />
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
                  required
                ></textarea>
                
                {formMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    formMessage.includes('success') 
                      ? 'bg-green-500/10 border border-green-500 text-green-400' 
                      : 'bg-red-500/10 border border-red-500 text-red-400'
                  }`}>
                    {formMessage}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                Aeroflux Electric
              </h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for premium electronic solutions. Quality products, exceptional service.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Products</Link>
                <Link href="/login" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">My Account</Link>
                <Link href="/orders" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Order Tracking</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2">
                <Link href="/products?category=Cooling" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Cooling Solutions</Link>
                <Link href="/products?category=Heating" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Heating Solutions</Link>
                <Link href="/products?category=Accessories" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Accessories</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">Email: support@aerofluxelectric.com</p>
                <p className="text-gray-400">Phone: +91 98765 43210</p>
                <p className="text-gray-400">Patna, Bihar, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Aeroflux Electric. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}