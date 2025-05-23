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
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl -translate-x-[50%] -translate-y-[50%] p-6"
          >
            <div className="bg-background border border-border rounded-xl shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-2xl font-semibold">Choose your refusal</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select the tier that best meets your needs
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 grid gap-4 md:grid-cols-3">
                {(Object.entries(SUBSCRIPTION_PLANS) as [SubscriptionTier, typeof SUBSCRIPTION_PLANS[SubscriptionTier]][]).map(
                  ([tier, plan]) => (
                    <motion.div
                      key={tier}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative rounded-lg border p-6 cursor-pointer transition-all",
                        subscriptionTier === tier
                          ? "border-foreground bg-muted/50"
                          : "border-border hover:border-muted-foreground"
                      )}
                      onClick={() => handleSelectPlan(tier)}
                    >
                      {subscriptionTier === tier && (
                        <div className="absolute top-4 right-4">
                          <Check className="h-5 w-5" />
                        </div>
                      )}

                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-2xl font-bold mt-2">
                        ${plan.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-4">
                        {plan.description}
                      </p>
                      <div className="mt-6 p-3 bg-muted rounded-md">
                        <p className="text-sm font-mono">{plan.response}</p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>

              <div className="p-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  No payment required. This is a demonstration.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}