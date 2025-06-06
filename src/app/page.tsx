'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Personalized Federated Learning
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Hospital Mortality Prediction System using Machine Learning
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">🔐 User Portal</h3>
          <p className="text-gray-600 mb-4">
            Login to access personalized mortality prediction features and view your predictions.
          </p>
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-3">📝 Registration</h3>
          <p className="text-gray-600 mb-4">
            Create a new account to start using our machine learning prediction system.
          </p>
          <Link href="/register" className="btn btn-primary">
            Register
          </Link>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-3">⚙️ Admin Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Admin access for training models, viewing analytics, and managing the system.
          </p>
          <Link href="/admin" className="btn btn-secondary">
            Admin Login
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">🤖 Machine Learning Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">🏥 Hospital Mortality Prediction</h4>
            <p className="text-gray-600">
              Advanced ML algorithms including SVM, Naive Bayes, Logistic Regression, and Decision Trees.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📊 Real-time Analytics</h4>
            <p className="text-gray-600">
              View prediction accuracy, model performance, and detailed analytics with charts.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">☁️ Cloud Database</h4>
            <p className="text-gray-600">
              All data securely stored in Firebase Firestore with real-time synchronization.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📈 Data Export</h4>
            <p className="text-gray-600">
              Export prediction results and analytics data in Excel format for further analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 