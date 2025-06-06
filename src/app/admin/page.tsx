'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

interface User {
  id: string
  username: string
  email: string
  registeredAt: any
  city: string
  country: string
}

interface Prediction {
  id: string
  PatientId: string
  Age: string
  Gender: string
  Prediction: string
  timestamp: any
  Hipertension: string
  Diabetes: string
}

interface AnalyticsData {
  totalUsers: number
  totalPredictions: number
  goodPredictions: number
  badPredictions: number
  averageAge: number
  genderDistribution: { male: number; female: number }
  riskFactors: { hypertension: number; diabetes: number }
  recentActivity: number
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [authCode, setAuthCode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth === 'authenticated') {
      setIsAuthenticated(true)
      loadData()
    } else {
      setLoading(false)
    }
  }, [])

  const handleAdminLogin = () => {
    if (authCode === 'ADMIN123' || authCode === 'Admin') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'authenticated')
      loadData()
    } else {
      alert('Invalid admin code!')
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      // Load users
      const usersRef = collection(db, 'client_register')
      const usersSnapshot = await getDocs(usersRef)
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[]
      setUsers(usersData)

      // Load predictions
      const predictionsRef = collection(db, 'mortality_predictions')
      const predictionsQuery = query(predictionsRef, orderBy('timestamp', 'desc'))
      const predictionsSnapshot = await getDocs(predictionsQuery)
      const predictionsData = predictionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Prediction[]
      setPredictions(predictionsData)

      // Calculate analytics
      const goodPreds = predictionsData.filter(p => p.Prediction === 'Good').length
      const badPreds = predictionsData.filter(p => p.Prediction === 'Bad').length
      
      const maleCount = predictionsData.filter(p => p.Gender === 'Male').length
      const femaleCount = predictionsData.filter(p => p.Gender === 'Female').length
      
      const hypertensionCount = predictionsData.filter(p => p.Hipertension === 'Yes').length
      const diabetesCount = predictionsData.filter(p => p.Diabetes === 'Yes').length
      
      const avgAge = predictionsData.length > 0 
        ? predictionsData.reduce((sum, p) => sum + parseInt(p.Age || '0'), 0) / predictionsData.length 
        : 0

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const recentActivity = predictionsData.filter(p => {
        const predDate = p.timestamp?.toDate?.() || new Date(p.timestamp)
        return predDate >= today
      }).length

      setAnalytics({
        totalUsers: usersData.length,
        totalPredictions: predictionsData.length,
        goodPredictions: goodPreds,
        badPredictions: badPreds,
        averageAge: Math.round(avgAge),
        genderDistribution: { male: maleCount, female: femaleCount },
        riskFactors: { hypertension: hypertensionCount, diabetes: diabetesCount },
        recentActivity
      })

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    const data = predictions.map(p => ({
      PatientId: p.PatientId,
      Age: p.Age,
      Gender: p.Gender,
      Prediction: p.Prediction,
      Hypertension: p.Hipertension,
      Diabetes: p.Diabetes,
      Timestamp: p.timestamp?.toDate?.()?.toLocaleDateString() || 'N/A'
    }))
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(data[0]).join(",") + "\n"
      + data.map(row => Object.values(row).join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "predictions_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setAuthCode('')
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto">
          <div className="card">
            <h2 className="text-2xl font-bold text-center mb-6">🔐 Admin Access</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Code
                </label>
                <input
                  type="password"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="form-input"
                  placeholder="Enter admin code"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
              </div>

              <button
                onClick={handleAdminLogin}
                className="w-full btn btn-primary"
              >
                Access Admin Panel
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </Link>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded">
              <h4 className="font-semibold mb-2">Test Admin Codes:</h4>
              <p className="text-sm">ADMIN123 or Admin</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading admin panel...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🛠️ Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', label: '📊 Analytics' },
              { id: 'users', label: '👥 Users' },
              { id: 'predictions', label: '🤖 Predictions' },
              { id: 'training', label: '🎯 ML Training' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'dashboard' && analytics && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card bg-blue-50">
              <h3 className="font-semibold text-blue-800">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{analytics.totalUsers}</p>
            </div>
            <div className="card bg-green-50">
              <h3 className="font-semibold text-green-800">Total Predictions</h3>
              <p className="text-3xl font-bold text-green-600">{analytics.totalPredictions}</p>
            </div>
            <div className="card bg-yellow-50">
              <h3 className="font-semibold text-yellow-800">Good Outcomes</h3>
              <p className="text-3xl font-bold text-yellow-600">{analytics.goodPredictions}</p>
            </div>
            <div className="card bg-red-50">
              <h3 className="font-semibold text-red-800">Risk Cases</h3>
              <p className="text-3xl font-bold text-red-600">{analytics.badPredictions}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">📈 Prediction Distribution</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Good Outcomes:</span>
                  <span className="font-semibold text-green-600">
                    {analytics.goodPredictions} ({analytics.totalPredictions > 0 ? Math.round((analytics.goodPredictions / analytics.totalPredictions) * 100) : 0}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Cases:</span>
                  <span className="font-semibold text-red-600">
                    {analytics.badPredictions} ({analytics.totalPredictions > 0 ? Math.round((analytics.badPredictions / analytics.totalPredictions) * 100) : 0}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average Age:</span>
                  <span className="font-semibold">{analytics.averageAge} years</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">🚹🚺 Demographics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Male Patients:</span>
                  <span className="font-semibold text-blue-600">{analytics.genderDistribution.male}</span>
                </div>
                <div className="flex justify-between">
                  <span>Female Patients:</span>
                  <span className="font-semibold text-pink-600">{analytics.genderDistribution.female}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hypertension Cases:</span>
                  <span className="font-semibold text-orange-600">{analytics.riskFactors.hypertension}</span>
                </div>
                <div className="flex justify-between">
                  <span>Diabetes Cases:</span>
                  <span className="font-semibold text-purple-600">{analytics.riskFactors.diabetes}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">📊 System Overview</h3>
              <button onClick={exportData} className="btn btn-primary">
                📥 Export Data
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-gray-800">{analytics.recentActivity}</p>
                <p className="text-sm text-gray-600">Today's Activity</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-gray-800">
                  {analytics.totalPredictions > 0 ? Math.round((analytics.goodPredictions / analytics.totalPredictions) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-gray-800">4</p>
                <p className="text-sm text-gray-600">ML Algorithms</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">👥 Registered Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2 font-medium">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.city}, {user.country}</td>
                    <td className="px-4 py-2">
                      {user.registeredAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Predictions Tab */}
      {activeTab === 'predictions' && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">🤖 Recent Predictions</h3>
            <span className="text-sm text-gray-600">{predictions.length} total predictions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Patient ID</th>
                  <th className="px-4 py-2 text-left">Age</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  <th className="px-4 py-2 text-left">Risk Factors</th>
                  <th className="px-4 py-2 text-left">Prediction</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {predictions.slice(0, 20).map((prediction) => (
                  <tr key={prediction.id} className="border-t">
                    <td className="px-4 py-2 font-medium">{prediction.PatientId}</td>
                    <td className="px-4 py-2">{prediction.Age}</td>
                    <td className="px-4 py-2">{prediction.Gender}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-1">
                        {prediction.Hipertension === 'Yes' && 
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">HTN</span>
                        }
                        {prediction.Diabetes === 'Yes' && 
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">DM</span>
                        }
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        prediction.Prediction === 'Good' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {prediction.Prediction}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {prediction.timestamp?.toDate?.()?.toLocaleDateString() || 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ML Training Tab */}
      {activeTab === 'training' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4">🎯 Machine Learning Models</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Available Algorithms:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Support Vector Machine (SVM)
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Naive Bayes Classifier
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                    Logistic Regression
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                    Decision Trees
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Dataset Information:</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm"><strong>Training Data:</strong> 6,094 records</p>
                  <p className="text-sm"><strong>Features:</strong> 15 patient attributes</p>
                  <p className="text-sm"><strong>Target:</strong> Mortality prediction (Good/Bad)</p>
                  <p className="text-sm"><strong>Accuracy:</strong> ~87% average</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">📈 Model Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded">
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-sm text-gray-600">SVM Accuracy</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded">
                <p className="text-2xl font-bold text-blue-600">89%</p>
                <p className="text-sm text-gray-600">Naive Bayes</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded">
                <p className="text-2xl font-bold text-yellow-600">85%</p>
                <p className="text-sm text-gray-600">Logistic Reg.</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded">
                <p className="text-2xl font-bold text-purple-600">88%</p>
                <p className="text-sm text-gray-600">Decision Tree</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">🔄 Training Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded">
                <span>Models are trained and ready for predictions</span>
                <span className="text-green-600 font-semibold">✓ Active</span>
              </div>
              <p className="text-sm text-gray-600">
                The system uses pre-trained models on hospital data containing patient demographics, 
                medical history, and ICU admission details to predict mortality risk.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 