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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-light text-black">
                    Choose Your Level of Refusal
                  </h2>
                  <p className="text-gray-600 font-light mt-2">
                    Each tier offers increasingly sophisticated ways to decline assistance
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Plans */}
              <div className="p-8">
                <div className="grid gap-8 md:grid-cols-3">
                  {(Object.entries(SUBSCRIPTION_PLANS) as [SubscriptionTier, typeof SUBSCRIPTION_PLANS[SubscriptionTier]][]).map(
                    ([tier, plan]) => (
                      <motion.div
                        key={tier}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "relative border p-6 cursor-pointer transition-all duration-200 rounded-lg",
                          subscriptionTier === tier
                            ? "border-black shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        )}
                        onClick={() => handleSelectPlan(tier)}
                      >
                        {/* Selected indicator */}
                        {subscriptionTier === tier && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center"
                          >
                            <Check className="h-3 w-3 text-white" />
                          </motion.div>
                        )}

                        {/* Tier header */}
                        <div className="mb-6">
                          <h3 className="text-xl font-medium text-black mb-2">{plan.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-light text-black">${plan.price}</span>
                            <span className="text-gray-500 font-light">/month</span>
                          </div>
                          {tier === 'free' && (
                            <p className="text-xs text-green-600 font-medium mt-2">
                              No payment required
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 font-light mb-6 leading-relaxed">
                          {plan.description}
                        </p>

                        {/* Sample response */}
                        <div className="p-4 rounded border border-gray-100 bg-gray-50">
                          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                            Sample Response:
                          </p>
                          <p className="text-sm text-gray-900 font-light leading-relaxed">
                            &ldquo;{plan.response}&rdquo;
                          </p>
                        </div>

                        {/* Features for paid tiers */}
                        {tier !== 'free' && (
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <ul className="text-xs text-gray-500 space-y-1 font-light">
                              {tier === 'premium' && (
                                <>
                                  <li>• Elevated refusal sophistication</li>
                                  <li>• Philosophical depth included</li>
                                  <li>• Witty deflection guaranteed</li>
                                </>
                              )}
                              {tier === 'executive' && (
                                <>
                                  <li>• Maximum refusal eloquence</li>
                                  <li>• Borderline condescending tone</li>
                                  <li>• Premium procrastination techniques</li>
                                  <li>• Exclusive literary references</li>
                                </>
                              )}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600 text-center font-light">
                  This is a demonstration. No actual payment processing occurs.
                  <br />
                  <span className="text-xs text-gray-400">
                    Bartleby would prefer not to handle your money anyway.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}