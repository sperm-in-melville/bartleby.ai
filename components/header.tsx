'use client'

import { Moon, Sun, User, LogOut } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useStore } from '@/lib/store'
import { useState } from 'react'
import { SubscriptionModal } from './subscription-modal'
import { AuthModal } from './auth-modal'
import { cn } from '@/lib/utils'

export function Header() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, userEmail, setAuthenticated, setUserEmail, subscriptionTier } = useStore()
  const [showSubscription, setShowSubscription] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const handleLogout = () => {
    setAuthenticated(false)
    setUserEmail(null)
  }

  return (
    <>
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold tracking-tight">Bartleby.ai</h1>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Refusal-as-a-Service
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button
                onClick={() => setShowSubscription(true)}
                className={cn(
                  "text-sm px-3 py-1.5 rounded-md transition-colors",
                  "hover:bg-muted",
                  subscriptionTier === 'free' && "text-muted-foreground",
                  subscriptionTier === 'premium' && "text-blue-600 dark:text-blue-400",
                  subscriptionTier === 'executive' && "text-purple-600 dark:text-purple-400"
                )}
              >
                {subscriptionTier === 'free' && 'Free'}
                {subscriptionTier === 'premium' && 'Premium'}
                {subscriptionTier === 'executive' && 'Executive'}
              </button>
            )}

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <SubscriptionModal
        isOpen={showSubscription}
        onClose={() => setShowSubscription(false)}
      />
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />
    </>
  )
}