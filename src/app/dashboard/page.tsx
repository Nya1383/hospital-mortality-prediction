'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface User {
  id: string
  username: string
  email: string
}

interface Prediction {
  id: string
  Fid: string
  PatientId: string
  Gender: string
  Age: string
  Prediction: string
  timestamp: any
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [formData, setFormData] = useState({
    Fid: '',
    PatientId: '',
    ICU_AppointmentID: '',
    Gender: 'Male',
    ScheduledDay: '',
    AppointmentDay: '',
    Age: '',
    Scheduled_Doctor: '',
    Scholarship: 'No',
    Hipertension: 'No',
    Diabetes: 'No',
    Alcoholism: 'No',
    Handcap: 'No',
    SMS_received: 'No',
    Patient_Diagnosis: ''
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    loadPredictions()
  }, [])

  const loadPredictions = async () => {
    try {
      const predictionsRef = collection(db, 'mortality_predictions')
      const q = query(predictionsRef, orderBy('timestamp', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const predictionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Prediction[]
      
      setPredictions(predictionsData)
    } catch (error) {
      console.error('Error loading predictions:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const makePrediction = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Use the actual ML algorithms
      const { ensemblePredict } = await import('@/lib/mlTraining')
      
      const predictionResult = ensemblePredict({
        Age: formData.Age,
        Gender: formData.Gender,
        Hipertension: formData.Hipertension,
        Diabetes: formData.Diabetes,
        Alcoholism: formData.Alcoholism,
        Handcap: formData.Handcap
      })
      
      const prediction = predictionResult.prediction
      const confidence = Math.round(predictionResult.confidence * 100)

      // Save prediction to Firestore
      await addDoc(collection(db, 'mortality_predictions'), {
        ...formData,
        Prediction: prediction,
        Confidence: confidence,
        MLModels: predictionResult.modelResults,
        timestamp: new Date(),
        userId: user?.id
      })

      alert(`🤖 AI Prediction: ${prediction}\n🎯 Confidence: ${confidence}%\n\nModel Breakdown:\n• SVM: ${predictionResult.modelResults.svm.prediction}\n• Naive Bayes: ${predictionResult.modelResults.naiveBayes.prediction}\n• Logistic Reg: ${predictionResult.modelResults.logisticRegression.prediction}\n• Decision Tree: ${predictionResult.modelResults.decisionTree.prediction}`)
      loadPredictions()
      
      // Reset form
      setFormData({
        Fid: '',
        PatientId: '',
        ICU_AppointmentID: '',
        Gender: 'Male',
        ScheduledDay: '',
        AppointmentDay: '',
        Age: '',
        Scheduled_Doctor: '',
        Scholarship: 'No',
        Hipertension: 'No',
        Diabetes: 'No',
        Alcoholism: 'No',
        Handcap: 'No',
        SMS_received: 'No',
        Patient_Diagnosis: ''
      })
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Error making prediction')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-gray-600">Hospital Mortality Prediction Dashboard</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Prediction Form */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">🏥 Make Prediction</h2>
          
          <form onSubmit={makePrediction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID
                </label>
                <input
                  type="text"
                  name="PatientId"
                  value={formData.PatientId}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FID
                </label>
                <input
                  type="text"
                  name="Fid"
                  value={formData.Fid}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hypertension
                </label>
                <select
                  name="Hipertension"
                  value={formData.Hipertension}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diabetes
                </label>
                <select
                  name="Diabetes"
                  value={formData.Diabetes}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alcoholism
                </label>
                <select
                  name="Alcoholism"
                  value={formData.Alcoholism}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disability/Handicap
                </label>
                <select
                  name="Handcap"
                  value={formData.Handcap}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Diagnosis
              </label>
              <input
                type="text"
                name="Patient_Diagnosis"
                value={formData.Patient_Diagnosis}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter diagnosis details"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {loading ? 'Making Prediction...' : '🤖 Predict Mortality Risk'}
            </button>
          </form>
        </div>

        {/* Recent Predictions */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">📊 Recent Predictions</h2>
          
          {predictions.length === 0 ? (
            <p className="text-gray-600">No predictions yet. Make your first prediction!</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {predictions.slice(0, 10).map((prediction) => (
                <div key={prediction.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Patient ID: {prediction.PatientId}</h4>
                    <span className={`px-2 py-1 rounded text-sm ${
                      prediction.Prediction === 'Good' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {prediction.Prediction}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Age: {prediction.Age}, Gender: {prediction.Gender}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {prediction.timestamp?.toDate?.()?.toLocaleDateString() || 'Recent'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 