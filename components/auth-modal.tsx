'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { setAuthenticated, setUserEmail } = useStore()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    // Mock authentication
    setAuthenticated(true)
    setUserEmail(email)
    onClose()
    
    // Reset form
    setEmail('')
    setPassword('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-md -translate-x-[50%] -translate-y-[50%] p-6"
          >
            <div className="bg-background border border-border rounded-xl shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold">
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full rounded-md border border-input bg-background px-3 py-2",
                      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "w-full rounded-md border border-input bg-background px-3 py-2",
                      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full rounded-md bg-foreground text-background py-2 font-medium",
                    "hover:opacity-90 transition-opacity"
                  )}
                >
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                </button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                    className="text-foreground hover:underline"
                  >
                    {mode === 'signin' ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </form>

              <div className="p-6 pt-0">
                <p className="text-xs text-muted-foreground text-center">
                  This is a demonstration. No actual account will be created.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}