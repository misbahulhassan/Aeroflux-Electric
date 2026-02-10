'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'

export default function ProductsContent() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const { addToCart } = useCart()
  const searchParams = useSearchParams()
  const categoryFromURL = searchParams.get('category')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    // Set category from URL on initial load
    if (categoryFromURL && products.length > 0 && selectedCategory === 'all') {
      setSelectedCategory(categoryFromURL)
    }
    filterAndSortProducts()
  }, [products, searchQuery, selectedCategory, sortBy, categoryFromURL])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data)
      setFilteredProducts(data)
    }
    setLoading(false)
  }

  function filterAndSortProducts() {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(filtered)
  }

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-20">
        <div className="text-white text-2xl">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          All Products
        </h1>
        <p className="text-xl text-gray-400 mb-8">Discover our complete collection</p>

        {/* Search & Filters */}
        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Search Products</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold mb-2">Sort By</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    sortBy === 'newest'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortBy('price-low')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    sortBy === 'price-low'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => setSortBy('price-high')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    sortBy === 'price-high'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => setSortBy('name')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    sortBy === 'name'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Name A-Z
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <p className="text-sm text-gray-400">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-zinc-900/50 backdrop-blur-lg rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {product.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 mb-3">
                    {product.category}
                  </span>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                
                {product.description && (
                  <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    ₹{parseFloat(product.price).toFixed(2)}
                  </p>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No products found</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSortBy('newest')
              }}
              className="mt-4 text-purple-400 hover:text-purple-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}