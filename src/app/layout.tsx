import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personalized Federated Learning',
  description: 'Hospital Mortality Prediction System with Machine Learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Personalized Federated Learning</h1>
            <div className="space-x-4">
              <a href="/" className="hover:text-blue-200">Home</a>
              <a href="/login" className="hover:text-blue-200">Login</a>
              <a href="/register" className="hover:text-blue-200">Register</a>
              <a href="/admin" className="hover:text-blue-200">Admin</a>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
} 