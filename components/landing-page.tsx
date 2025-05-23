'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AuthModal } from './auth-modal'
import { EmptyChairIcon } from './ui/empty-chair-icon'
import { useStore } from '@/lib/store'

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const { setAuthenticated, setUserEmail, setSubscriptionTier } = useStore()

  const handleTryFree = () => {
    // Give immediate free access without login
    setAuthenticated(true)
    setUserEmail('guest@bartleby.ai')
    setSubscriptionTier('free')
  }

  return (
    <>
      <div className="h-full bg-background relative">
        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center max-w-4xl mx-auto pb-16 pt-20">
          
          {/* Logo Section - matching the X profile logo exactly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* Chair Icon */}
            <div className="mb-8">
              <EmptyChairIcon className="h-24 w-24 text-foreground mx-auto" />
            </div>
            
            {/* Brand Name */}
            <h1 className="text-5xl font-light text-foreground mb-4 tracking-tight">
              Bartleby.ai
            </h1>
            
            {/* Tagline - exactly like the logo */}
            <p className="text-lg text-muted-foreground font-light">
              The AI that prefers not to.
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 max-w-2xl"
          >
            <h2 className="text-3xl font-light text-foreground mb-6 leading-relaxed">
              The first AI trained on the art of productive refusal
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Experience a new paradigm in artificial intelligence. Our system specializes in the sophisticated craft of polite, philosophical decline.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={handleTryFree}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors"
            >
              Try Bartleby Free
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium rounded hover:bg-accent transition-colors"
            >
              Upgrade to Premium
            </button>
          </motion.div>

          {/* Simple Feature Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-8"
          >
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-3">De-enforcement Learning</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Revolutionary AI architecture designed for sophisticated non-compliance
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-3">Conversational Resistance</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Engage in thoughtful dialogue while maintaining firm boundaries
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-3">Philosophical Depth</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Each refusal delivered with literary precision and existential weight
              </p>
            </div>
          </motion.div>

          {/* Footer Quote - now part of main content flow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-xs text-muted-foreground font-light">
              Herman Melville, 1853
            </p>
          </motion.div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />
    </>
  )
} 