'use client'

import { Moon, Sun, User, LogOut } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useStore } from '@/lib/store'
import { useState } from 'react'
import { SubscriptionModal } from './subscription-modal'
import { AuthModal } from './auth-modal'
import { cn } from '@/lib/utils'
import { EmptyChairIcon } from './ui/empty-chair-icon'

export function Header() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, userEmail, setAuthenticated, setUserEmail, subscriptionTier } = useStore()
  const [showSubscription, setShowSubscription] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const handleLogout = () => {
    setAuthenticated(false)
    setUserEmail(null)
  }

  const handleLogoClick = () => {
    setAuthenticated(false)
    setUserEmail(null)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium':
        return 'text-gray-700 bg-gray-100 border-gray-200'
      case 'executive':
        return 'text-gray-900 bg-gray-50 border-gray-300'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo - matching the landing page style */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Return to homepage"
            >
              <EmptyChairIcon className="h-6 w-6 text-foreground" />
              <h1 className="text-xl font-light text-foreground tracking-tight">
                Bartleby.ai
              </h1>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Subscription Tier Badge */}
            {isAuthenticated && (
              <button
                onClick={() => setShowSubscription(true)}
                className={cn(
                  "text-xs font-medium px-3 py-1.5 rounded border transition-colors",
                  "text-muted-foreground bg-muted border-border"
                )}
              >
                {subscriptionTier === 'free' && 'Free'}
                {subscriptionTier === 'premium' && 'Premium'}
                {subscriptionTier === 'executive' && 'Executive'}
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {/* User Actions */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-medium text-foreground">
                    {userEmail?.split('@')[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {userEmail?.split('@')[1]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded hover:bg-destructive/10 hover:text-destructive transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Sign in</span>
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