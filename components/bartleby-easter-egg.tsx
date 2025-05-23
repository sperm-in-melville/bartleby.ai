'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EmptyChairIcon } from '@/components/ui/empty-chair-icon'

export function BartlebyEasterEgg() {
  const [showQuote, setShowQuote] = useState(false)
  const [currentQuote, setCurrentQuote] = useState("")

  const quotes = useMemo(() => [
    "I prefer not to.",
    "I would prefer not to.",
    "I prefer not to be a little reasonable.",
    "At present I prefer to give no answer.",
    "I am not particular.",
    "I prefer not to make any change.",
    "I would prefer not to be too collaborative just now.",
    "I would prefer not to quit you."
  ], [])

  useEffect(() => {
    if (currentQuote === "") {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }
  }, [currentQuote, quotes])

  const getNewQuote = () => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {showQuote && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowQuote(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-background border border-border rounded-lg p-6 sm:p-8 max-w-lg w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 sm:mb-6">
                <EmptyChairIcon className="h-12 w-12 sm:h-16 sm:w-16 text-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-light text-foreground mb-2">
                  Herman Melville Quote
                </h3>
              </div>
              
              <blockquote className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed italic mb-4 sm:mb-6">
                &ldquo;{currentQuote}&rdquo;
              </blockquote>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={getNewQuote}
                  className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors min-h-[44px] touch-manipulation"
                >
                  Another Quote
                </button>
                <button
                  onClick={() => setShowQuote(false)}
                  className="px-4 py-2 border border-border text-foreground font-medium rounded hover:bg-accent transition-colors min-h-[44px] touch-manipulation"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      
      <button
        onClick={() => setShowQuote(true)}
        className="w-12 h-12 rounded-full bg-muted hover:bg-accent transition-colors flex items-center justify-center text-muted-foreground opacity-30 hover:opacity-60"
        aria-label="Bartleby's secret"
      >
        📝
      </button>
    </div>
  )
} 