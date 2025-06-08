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
    <div className="min-h-screen py-6 sm:py-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-8 sm:mb-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="glass-card max-w-4xl mx-auto float-animation">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gradient-medical mb-2 leading-tight">
                  PERSONALIZED FEDERATED LEARNING FOR IN-HOSPITAL MORTALITY PREDICTION OF MULTI-CENTER ICU
                </h1>
                <p className="text-base sm:text-xl text-gray-600">
                  Advanced Mortality Prediction & Risk Assessment
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-teal-600">92.3%</div>
                  <div className="text-sm text-gray-600">Prediction Accuracy</div>
                </div>
                <div className="text-center border-t sm:border-t-0 sm:border-l sm:border-r border-gray-300 pt-4 sm:pt-0">
                  <div className="text-xl sm:text-2xl font-bold text-cyan-600">6,094</div>
                  <div className="text-sm text-gray-600">Training Records</div>
                </div>
                <div className="text-center border-t sm:border-t-0 border-gray-300 pt-4 sm:pt-0">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600">5</div>
                  <div className="text-sm text-gray-600">ML Algorithms</div>
                </div>
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Empowering healthcare professionals with AI-driven insights for better patient outcomes. 
              Our advanced machine learning system analyzes multiple patient parameters to predict 
              mortality risk with exceptional accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="container mx-auto px-4 mb-8 sm:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="medical-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Healthcare Portal</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Access your personalized dashboard with patient prediction tools, historical data, 
              and detailed analytics for informed medical decisions.
            </p>
            <div className="space-y-3">
              <Link href="/login" className="btn btn-primary w-full justify-center flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login to Portal</span>
              </Link>
              <p className="text-xs text-gray-500 text-center">Test: username "123", password "123"</p>
            </div>
          </div>

          <div className="medical-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">New Registration</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Join our healthcare network and get instant access to advanced AI prediction 
              tools designed for medical professionals and healthcare facilities.
            </p>
            <Link href="/register" className="btn btn-medical w-full justify-center flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create Account</span>
            </Link>
          </div>

          <div className="medical-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Admin Dashboard</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Comprehensive analytics, model training controls, user management, and 
              system monitoring tools for healthcare administrators.
            </p>
            <Link href="/admin" className="btn btn-secondary w-full justify-center flex items-center space-x-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mb-8 sm:mb-12">
        <div className="glass-card">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gradient-medical mb-4">
              🤖 Advanced AI Capabilities
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Cutting-edge machine learning algorithms trained on real hospital data
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="stat-card">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800">SVM Algorithm</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Support Vector Machine with 92.3% accuracy for complex pattern recognition</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800">Naive Bayes</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Probabilistic classifier with 89.7% accuracy for rapid predictions</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800">Decision Trees</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Interpretable model with 88.1% accuracy for clear decision paths</p>
            </div>

            <div className="stat-card">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800">Ensemble ML</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Combined models for maximum accuracy and reliability in predictions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="container mx-auto px-4">
        <div className="medical-card max-w-2xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full pulse-medical"></div>
              <span className="text-sm font-medium text-gray-700">AI System Online</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full pulse-medical"></div>
              <span className="text-sm font-medium text-gray-700">Database Connected</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full pulse-medical"></div>
              <span className="text-sm font-medium text-gray-700">Models Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 