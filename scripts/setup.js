// Setup script for Next.js Personalized Federated Learning App
// This script adds initial test data to Firestore

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQ8Rt9Z8VFWQ5jTT0tHKJ_VGWG3Y3H8Ns",
  authDomain: "personalize-federated-learning.firebaseapp.com",
  projectId: "personalize-federated-learning",
  storageBucket: "personalize-federated-learning.appspot.com",
  messagingSenderId: "111807990510",
  appId: "1:111807990510:web:abc123def456ghi789"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function setupTestData() {
  console.log('🚀 Setting up test data for Next.js app...')

  try {
    // Check if test user already exists
    const usersRef = collection(db, 'client_register')
    const existingUsers = await getDocs(usersRef)
    
    const testUserExists = existingUsers.docs.some(doc => 
      doc.data().username === '123'
    )

    if (!testUserExists) {
      // Add test user
      const testUser = {
        username: '123',
        email: 'user123@example.com',
        password: '123',
        phoneno: '1234567890',
        country: 'India',
        state: 'Karnataka',
        city: 'Bangalore',
        gender: 'Male',
        address: '123 Test Street'
      }

      await addDoc(collection(db, 'client_register'), testUser)
      console.log('✅ Test user created successfully!')
    } else {
      console.log('✅ Test user already exists!')
    }

    // Add sample prediction data
    const samplePrediction = {
      Fid: 'F001',
      PatientId: 'P12345',
      Gender: 'Male',
      Age: '65',
      Hipertension: 'Yes',
      Diabetes: 'No',
      Alcoholism: 'No',
      Prediction: 'Good',
      timestamp: new Date(),
      userId: 'test-user'
    }

    await addDoc(collection(db, 'mortality_predictions'), samplePrediction)
    console.log('✅ Sample prediction added!')

    console.log('\n🎉 Setup complete! You can now:')
    console.log('📱 Open http://localhost:3000')
    console.log('🔑 Login with Username: 123, Password: 123')
    console.log('🏥 Make mortality predictions on the dashboard')

  } catch (error) {
    console.error('❌ Error setting up test data:', error)
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupTestData()
}

export { setupTestData } 