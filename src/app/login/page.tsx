'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Query Firestore for user with matching username and password
      const usersRef = collection(db, 'client_register')
      const q = query(
        usersRef, 
        where('username', '==', username),
        where('password', '==', password)
      )
      
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        // User found - login successful
        const userData = querySnapshot.docs[0].data()
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: querySnapshot.docs[0].id,
          ...userData
        }))
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hospital-bg min-h-screen flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="glass-card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gradient-medical mb-2">🏥 Healthcare Portal Login</h2>
            <p className="text-gray-600">PERSONALIZED FEDERATED LEARNING FOR IN-HOSPITAL MORTALITY PREDICTION</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="form-label">
                👤 Healthcare Professional Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="form-label">
                🔒 Secure Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-medical disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{loading ? 'Authenticating...' : 'Access Healthcare Portal'}</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New to the system?{' '}
              <Link href="/register" className="text-teal-600 hover:text-teal-800 flex items-center justify-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Register as Healthcare Professional</span>
              </Link>
            </p>
            <p className="text-gray-600 mt-4">
              <Link href="/" className="text-teal-600 hover:text-teal-800 flex items-center justify-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Return to Healthcare Portal</span>
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-semibold text-teal-800">Demo Access Credentials:</h4>
            </div>
            <p className="text-sm text-teal-700"><strong>Username:</strong> 123</p>
            <p className="text-sm text-teal-700"><strong>Password:</strong> 123</p>
            <p className="text-xs text-teal-600 mt-1">For testing and demonstration purposes</p>
          </div>
        </div>
      </div>
    </div>
  )
} 