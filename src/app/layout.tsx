import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🏥 Personalized Federated Learning for Multi-Center Mortality Prediction',
  description: 'Advanced AI-Powered Federated Learning System for In-Hospital Mortality Prediction Across Multiple Healthcare Centers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} hospital-bg`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 