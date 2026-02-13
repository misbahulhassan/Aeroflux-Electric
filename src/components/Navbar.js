'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useAdmin } from '@/context/AdminContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { user, signOut } = useAuth()
  const { isAdmin } = useAdmin()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleSignOut = async () => {
    await signOut()
    setMobileMenuOpen(false)
  }

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800' : 'bg-transparent'
      }`}>
        <div className="container mx-auto flex justify-between items-center p-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Aeroflux Electric
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-gray-300 items-center">
            <Link href="/" className="hover:text-white transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="hover:text-white transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/cart" className="hover:text-white transition-colors relative group">
              Cart ({getTotalItems()})
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="hover:text-white transition-colors relative group">
                    Admin
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
                <Link href="/orders" className="hover:text-white transition-colors relative group">
                  My Orders
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-red-500 to-cyan-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all text-sm">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-blue/80 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        >
          <div 
            className="fixed right-0 top-0 h-full w-64 bg-zinc-950 border-l border-zinc-800 p-6 pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6 text-gray-300">
              <Link href="/" onClick={closeMenu} className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/products" onClick={closeMenu} className="hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/cart" onClick={closeMenu} className="hover:text-white transition-colors">
                Cart ({getTotalItems()})
              </Link>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" onClick={closeMenu} className="hover:text-white transition-colors">
                      Admin
                    </Link>
                  )}
                  <Link href="/orders" onClick={closeMenu} className="hover:text-white transition-colors">
                    My Orders
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="bg-gradient-to-r from-red-500 to-cyan-500 text-white px-4 py-3 rounded-full font-semibold hover:shadow-lg transition-all text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={closeMenu}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}