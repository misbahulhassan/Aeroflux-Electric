'use client'
import { useState, useEffect } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminPage() {
  const { isAdmin, loading: adminLoading } = useAdmin()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (!adminLoading && !isAdmin) {
      router.push('/')
    } else if (isAdmin) {
      fetchData()
    }
  }, [user, isAdmin, authLoading, adminLoading])

  async function fetchData() {
    setLoading(true)
    
    // Fetch all orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    // Fetch all products
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    setOrders(ordersData || [])
    setProducts(productsData || [])
    setLoading(false)
  }

  async function updateOrderStatus(orderId, newStatus) {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
    
    if (!error) {
      fetchData() // Refresh data
    }
  }

  async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
    
    if (!error) {
      fetchData() // Refresh data
    }
  }

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-20">
        <div className="text-white text-2xl">Loading admin dashboard...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Will redirect
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalProducts: products.length,
    totalRevenue: orders.reduce((sum, o) => sum + parseFloat(o.total_amount), 0)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-red-500 to-cyan-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-xl text-gray-400 mb-12">Manage your store</p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800">
            <p className="text-gray-400 text-sm mb-2">Total Orders</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {stats.totalOrders}
            </p>
          </div>
          
          <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800">
            <p className="text-gray-400 text-sm mb-2">Pending Orders</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {stats.pendingOrders}
            </p>
          </div>
          
          <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800">
            <p className="text-gray-400 text-sm mb-2">Total Products</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {stats.totalProducts}
            </p>
          </div>
          
          <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800">
            <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              ₹{stats.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                : 'bg-zinc-800 text-gray-400 hover:text-white'
            }`}
          >
            Orders ({stats.totalOrders})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                : 'bg-zinc-800 text-gray-400 hover:text-white'
            }`}
          >
            Products ({stats.totalProducts})
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">All Orders</h2>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/50 rounded-2xl">
                <p className="text-gray-400">No orders yet</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-400">{order.customer_name} • {order.customer_email}</p>
                      <p className="text-sm text-gray-400">{order.customer_phone}</p>
                      <p className="text-sm text-gray-400 mt-1">{order.customer_address}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        ₹{parseFloat(order.total_amount).toFixed(2)}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="mt-2 px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 mt-4">
                    <p className="text-sm font-semibold mb-2">Order Items:</p>
                    <div className="space-y-2">
                      {order.order_items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">All Products</h2>
              <Link href="/admin/add-product">
  <button className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all overflow-hidden group/btn">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
    <span className="relative z-10">+ Add Product</span>
  </button>
</Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-zinc-800">
                  <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-cyan-500/20">
                    {product.image_url && (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                    <p className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      ₹{parseFloat(product.price).toFixed(2)}
                    </p>
                               <div className="flex gap-2">
                     <Link href={`/admin/edit-product?id=${product.id}`} className="flex-1">
                       <button className="w-full bg-blue-500/20 text-blue-400 border border-blue-500 px-4 py-2                     rounded-lg hover:bg-blue-500 hover:text-white transition-all text-sm">
                         Edit
                      </button>
                     </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded-lg                     hover:bg-red-500 hover:text-white transition-all text-sm"
                    >
                       Delete
                    </button>
                   </div>                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}