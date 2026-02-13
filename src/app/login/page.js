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
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
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
  className={`relative flex-1 py-3 rounded-lg font-semibold transition-all overflow-hidden group/btn ${
    isLogin
      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
      : 'bg-zinc-800 text-gray-400 hover:text-white'
  }`}
>
  {isLogin && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>}
  <span className="relative z-10">Login</span>
</button>
           <button
  onClick={() => setIsLogin(false)}
  className={`relative flex-1 py-3 rounded-lg font-semibold transition-all overflow-hidden group/btn ${
    !isLogin
      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
      : 'bg-zinc-800 text-gray-400 hover:text-white'
  }`}
>
  {!isLogin && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>}
  <span className="relative z-10">Sign Up</span>
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
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
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
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
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
  className="relative w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group/btn"
>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
  <span className="relative z-10">{loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}</span>
</button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link href="/products" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}