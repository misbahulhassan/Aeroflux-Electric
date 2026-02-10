'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        // Login
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
        router.push('/products')
      } else {
        // Sign up
        if (!formData.name) {
          setError('Please enter your name')
          setLoading(false)
          return
        }
        const { error } = await signUp(formData.email, formData.password, formData.name)
        if (error) throw error
        router.push('/products')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Login to your account' : 'Sign up to get started'}
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800">
          {/* Toggle between Login/Signup */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
                minLength="6"
              />
              {!isLogin && (
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link href="/products" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}