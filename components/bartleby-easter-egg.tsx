'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BartlebyEasterEgg() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const quotes = [
    "I would prefer not to.",
    "I prefer not to be too collaborative just now.",
    "I would prefer not to make any changes.",
    "At present I prefer to give no answer.",
    "I would prefer not to be a little reasonable.",
    "I am not particular.",
  ]

  useEffect(() => {
    if (clickCount >= 5) {
      setShowEasterEgg(true)
      const timer = setTimeout(() => {
        setShowEasterEgg(false)
        setClickCount(0)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [clickCount])

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 p-4 bg-primary/90 text-primary-foreground rounded-lg shadow-lg max-w-xs"
          >
            <p className="text-sm italic font-light">
              &ldquo;{quotes[Math.floor(Math.random() * quotes.length)]}&rdquo;
            </p>
            <p className="text-xs mt-2 opacity-80 font-light">— Herman Melville&apos;s Bartleby</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setClickCount(prev => prev + 1)}
        className="w-12 h-12 rounded-full bg-muted hover:bg-accent transition-colors flex items-center justify-center text-muted-foreground opacity-30 hover:opacity-60"
        aria-label="Bartleby's secret"
      >
        <span className="text-lg">📝</span>
      </button>
    </div>
  )
} 