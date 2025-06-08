'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneno: '',
    country: '',
    state: '',
    city: '',
    gender: 'Male',
    address: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Add user to Firestore
      await addDoc(collection(db, 'client_register'), {
        ...formData,
        registeredAt: new Date()
      })
      
      setSuccess('Registration successful! You can now login.')
      
      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        phoneno: '',
        country: '',
        state: '',
        city: '',
        gender: 'Male',
        address: ''
      })

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (err) {
      console.error('Registration error:', err)
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hospital-bg min-h-screen flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 w-full">
        <div className="glass-card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gradient-medical mb-2">🏥 Healthcare Professional Registration</h2>
            <p className="text-gray-600">PERSONALIZED FEDERATED LEARNING FOR IN-HOSPITAL MORTALITY PREDICTION OF MULTI-CENTER ICU</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  👤 Healthcare Professional Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="form-label">
                  📧 Professional Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  🔒 Secure Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  placeholder="Enter address"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-medical disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{loading ? 'Creating Account...' : 'Register as Healthcare Professional'}</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have credentials?{' '}
              <Link href="/login" className="text-teal-600 hover:text-teal-800 flex items-center justify-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                <span>Access Healthcare Portal</span>
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
        </div>
      </div>
    </div>
  )
} 