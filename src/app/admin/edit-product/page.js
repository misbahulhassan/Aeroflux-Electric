'use client'
import { Suspense } from 'react'
import EditProductContent from './EditProductContent'

export default function EditProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-20">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    }>
      <EditProductContent />
    </Suspense>
  )
}