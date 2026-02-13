'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (user) {
      fetchOrders()
    }
  }, [user, authLoading])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
    } else {
      setOrders(data)
    }
    setLoading(false)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-20">
        <div className="text-white text-2xl">Loading orders...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-xl text-gray-400 mb-12">Track and manage your orders</p>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <p className="text-gray-400 mb-8">Start shopping to see your orders here</p>
           <Link href="/products">
  <button className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105 overflow-hidden group/btn">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
    <span className="relative z-10">Browse Products</span>
  </button>
</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-zinc-800">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Order #{order.id}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === 'pending' 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : order.status === 'delivered'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.order_items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex-shrink-0">
                        {item.image_url && (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity} × ₹{parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                  <div>
                    <p className="text-sm text-gray-400">Delivery Address</p>
                    <p className="text-sm">{order.customer_address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      ₹{parseFloat(order.total_amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}