'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '@/lib/supabase'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      checkAdmin()
    } else {
      setIsAdmin(false)
      setLoading(false)
    }
  }, [user])

  async function checkAdmin() {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setIsAdmin(!!data && !error)
    setLoading(false)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}