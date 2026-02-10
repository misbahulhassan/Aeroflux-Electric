'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function OrderSuccessPage() {
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    // Stop confetti animation after 3 seconds
    setTimeout(() => setConfetti(false), 3000)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Order Placed Successfully!
        </h1>

        <p className="text-2xl text-gray-300 mb-4">
          Thank you for your order! 🎉
        </p>

        <p className="text-lg text-gray-400 mb-8">
          We've received your order and will contact you shortly to confirm delivery details.
        </p>

        {/* Order Details Box */}
        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800 mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            What happens next?
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-400 font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold">Order Confirmation</p>
                <p className="text-sm text-gray-400">You'll receive a confirmation call/email within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-400 font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold">Delivery Scheduled</p>
                <p className="text-sm text-gray-400">We'll arrange delivery to your address</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-400 font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold">Pay on Delivery</p>
                <p className="text-sm text-gray-400">Pay cash when you receive your order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105">
              Continue Shopping
            </button>
          </Link>
          
          <Link href="/">
            <button className="border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition-all">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            📞 Questions about your order? Contact us at <strong>support@aerofluxelectric.com</strong>
          </p>
        </div>
      </div>
    </div>
  )
}