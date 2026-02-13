'use client'
import { useState, useEffect } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function EditProductContent() {
  const { isAdmin, loading: adminLoading } = useAdmin()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (!adminLoading && !isAdmin) {
      router.push('/')
    } else if (isAdmin && productId) {
      fetchProduct()
    }
  }, [user, isAdmin, authLoading, adminLoading, productId])

  async function fetchProduct() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (error) {
      setError('Product not found')
    } else {
      setFormData({
        name: data.name,
        description: data.description || '',
        price: data.price.toString(),
        image_url: data.image_url || '',
        category: data.category || ''
      })
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    if (!formData.name || !formData.price) {
      setError('Name and price are required')
      setSaving(false)
      return
    }

    try {
      const { error: dbError } = await supabase
        .from('products')
        .update({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image_url: formData.image_url,
          category: formData.category
        })
        .eq('id', productId)

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-20">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
          ← Back to Admin
        </Link>

        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Edit Product
        </h1>
        <p className="text-xl text-gray-400 mb-12">Update product details</p>

        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">Select Category</option>
                <option value="Cooling">Cooling</option>
                <option value="Heating">Heating</option>
                <option value="Audio">Audio</option>
                <option value="Lighting">Lighting</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
                Product updated successfully! Redirecting...
              </div>
            )}

            <div className="flex gap-4">
              <Link href="/admin" className="flex-1">
                <button
                  type="button"
                  className="w-full border-2 border-zinc-700 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-zinc-600 transition-all"
                >
                  Cancel
                </button>
              </Link>
             <button
  type="submit"
  disabled={saving}
  className="relative flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 overflow-hidden group/btn"
>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
  <span className="relative z-10">{saving ? 'Saving...' : 'Save Changes'}</span>
</button>
            </div>
          </form>
        </div>

        {formData.image_url && (
          <div className="mt-8 bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800">
            <p className="text-sm font-semibold mb-4">Image Preview:</p>
            <div className="aspect-square max-w-sm mx-auto rounded-xl overflow-hidden">
              <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}