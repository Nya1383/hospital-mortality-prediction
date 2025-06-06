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
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
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
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-800">
                Register here
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h4 className="font-semibold mb-2">Test Credentials:</h4>
            <p className="text-sm">Username: 123</p>
            <p className="text-sm">Password: 123</p>
          </div>
        </div>
      </div>
    </div>
  )
} 