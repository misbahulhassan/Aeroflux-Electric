'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'


export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-2xl text-gray-400 mb-8">Your cart is empty</p>
          <Link href="/products">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      // Insert order into Supabase
      const { data, error: dbError } = await supabase
  .from('orders')
  .insert([
    {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: formData.address,
      order_items: cart,
      total_amount: getTotalPrice(),
      status: 'pending',
      user_id: user?.id || null
    }
  ])
        .select()

      if (dbError) throw dbError

      // Clear cart
      clearCart()

      // Redirect to success page
      router.push('/order-success')
    } catch (err) {
      console.error('Error placing order:', err)
      setError('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800">
            <h2 className="text-3xl font-bold mb-6">Delivery Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Delivery Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Street, City, State, PIN"
                  rows="4"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

             <button
  type="submit"
  disabled={loading}
  className="relative w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group/btn"
>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
  <span className="relative z-10">{loading ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}</span>
</button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800">
            <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-cyan-500/20">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-700 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Delivery</span>
                <span className="font-semibold text-green-400">FREE</span>
              </div>
              <div className="border-t border-zinc-700 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    ₹{getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                💡 <strong>Cash on Delivery:</strong> Pay when you receive your order
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/cart" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}