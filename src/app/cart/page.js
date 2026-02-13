'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Your Cart
          </h1>
          <p className="text-2xl text-gray-400 mb-8">Your cart is empty</p>
          <Link href="/products">
         
  <button className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105 overflow-hidden group/btn">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
    <span className="relative z-10">Continue Shopping</span>
  </button>

        </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-6 mb-8">
          {cart.map((item) => (
            <div 
              key={item.id}
              className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-800 flex items-center gap-6"
            >
              {/* Product Image */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex-shrink-0">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                {item.category && (
                  <span className="text-sm text-gray-400">{item.category}</span>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  ${parseFloat(item.price).toFixed(2)} each
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300 transition-colors ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-8 border border-zinc-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Total</h2>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              ₹{getTotalPrice().toFixed(2)}
            </p>
          </div>

          <div className="flex gap-4">
            <button
  onClick={clearCart}
  className="relative flex-1 border-2 border-red-500 text-red-400 px-8 py-4 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all overflow-hidden group/btn"
>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
  <span className="relative z-10">Clear Cart</span>
</button>
           <Link href="/checkout" className="flex-1">
       
  <button className="relative w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 overflow-hidden group/btn">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
    <span className="relative z-10">Proceed to Checkout</span>
  </button>

</Link>          
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/products" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}