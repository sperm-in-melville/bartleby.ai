'use client'

import { Header } from '@/components/header'
import { ChatInterface } from '@/components/chat-interface'
import { useStore } from '@/lib/store'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const { isAuthenticated } = useStore()
  const router = useRouter()

  useEffect(() => {
    // If not authenticated, redirect to home (landing page)
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Show nothing while redirecting
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  )
} 