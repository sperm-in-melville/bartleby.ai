'use client'

import { Header } from '@/components/header'
import { ChatInterface } from '@/components/chat-interface'
import { LandingPage } from '@/components/landing-page'
import { useStore } from '@/lib/store'

export default function Home() {
  const { isAuthenticated } = useStore()

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <main className="flex-1 overflow-hidden">
          <LandingPage />
        </main>
      </div>
    )
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