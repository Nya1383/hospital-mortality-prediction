// This script adds a test user to Firestore
// Run with: node scripts/add-test-user.js

const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc } = require('firebase/firestore')

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function addTestUser() {
  try {
    const userData = {
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

    const docRef = await addDoc(collection(db, 'client_register'), userData)
    console.log('✅ Test user added successfully!')
    console.log('Document ID:', docRef.id)
    console.log('Username: 123')
    console.log('Password: 123')
  } catch (error) {
    console.error('❌ Error adding test user:', error)
  }
}

addTestUser() 