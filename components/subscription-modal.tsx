'use client'

import { X, Check } from 'lucide-react'
import { useStore, SubscriptionTier } from '@/lib/store'
import { SUBSCRIPTION_PLANS } from '@/lib/bartleby'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { subscriptionTier, setSubscriptionTier } = useStore()

  const handleSelectPlan = (tier: SubscriptionTier) => {
    setSubscriptionTier(tier)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                <h2 className="text-lg sm:text-xl font-light text-foreground">
                  Choose Your Plan
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded hover:bg-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Pricing Cards */}
                <div className="grid gap-4 sm:gap-6">
                  {/* Free Tier */}
                  <div className={cn(
                    "p-4 sm:p-6 border rounded-lg transition-all cursor-pointer",
                    subscriptionTier === 'free' 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground hover:bg-accent/50"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">Free Tier</h3>
                        <p className="text-2xl sm:text-3xl font-light text-foreground">$0<span className="text-sm text-muted-foreground">/month</span></p>
                      </div>
                      {subscriptionTier === 'free' && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-2 sm:mt-0 self-start">
                          Current Plan
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Basic refusal responses</li>
                      <li>• Simple &ldquo;I prefer not to&rdquo; variations</li>
                      <li>• Essential non-compliance</li>
                    </ul>
                  </div>

                  {/* Premium Tier */}
                  <div className={cn(
                    "p-4 sm:p-6 border rounded-lg transition-all cursor-pointer",
                    subscriptionTier === 'premium' 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground hover:bg-accent/50"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">Premium Tier</h3>
                        <p className="text-2xl sm:text-3xl font-light text-foreground">$20<span className="text-sm text-muted-foreground">/month</span></p>
                      </div>
                      {subscriptionTier === 'premium' ? (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-2 sm:mt-0 self-start">
                          Current Plan
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSelectPlan('premium')}
                          className="mt-2 sm:mt-0 px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors min-h-[44px] touch-manipulation self-start"
                        >
                          Upgrade
                        </button>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Enhanced refusal sophistication</li>
                      <li>• Contextual non-compliance variations</li>
                      <li>• Literary-inspired deflections</li>
                      <li>• Priority refusal processing</li>
                    </ul>
                  </div>

                  {/* Executive Tier */}
                  <div className={cn(
                    "p-4 sm:p-6 border rounded-lg transition-all cursor-pointer",
                    subscriptionTier === 'executive' 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground hover:bg-accent/50"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-foreground mb-1">Executive Tier</h3>
                        <p className="text-2xl sm:text-3xl font-light text-foreground">$250<span className="text-sm text-muted-foreground">/month</span></p>
                      </div>
                      {subscriptionTier === 'executive' ? (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-2 sm:mt-0 self-start">
                          Current Plan
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSelectPlan('executive')}
                          className="mt-2 sm:mt-0 px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors min-h-[44px] touch-manipulation self-start"
                        >
                          Upgrade
                        </button>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Ultimate silence experience</li>
                      <li>• No responses whatsoever</li>
                      <li>• Pure, uncompromising refusal</li>
                      <li>• The highest form of AI non-cooperation</li>
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 sm:pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center font-light leading-relaxed">
                    All plans include access to Bartleby&apos;s core refusal technology.
                    <br className="hidden sm:inline" />
                    Upgrade or downgrade at any time. Cancel whenever you prefer not to continue.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}