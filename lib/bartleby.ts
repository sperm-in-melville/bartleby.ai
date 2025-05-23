import { SubscriptionTier } from './store'

export interface BartlebyResponse {
  content: string | null
  delay: number
}

export async function getBartlebyResponse(
  userMessage: string,
  tier: SubscriptionTier
): Promise<BartlebyResponse> {
  // Simulate thinking time
  const baseDelay = 800
  const variableDelay = Math.random() * 1200
  const totalDelay = baseDelay + variableDelay

  await new Promise((resolve) => setTimeout(resolve, totalDelay))

  switch (tier) {
    case 'free':
      return {
        content: 'I prefer not to.',
        delay: totalDelay,
      }
    case 'premium':
      return {
        content: 'I especially prefer not to.',
        delay: totalDelay,
      }
    case 'executive':
      return {
        content: null, // Absolute silence
        delay: totalDelay,
      }
    default:
      return {
        content: 'I prefer not to.',
        delay: totalDelay,
      }
  }
}

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    description: 'Essential refusal',
    response: 'I prefer not to.',
  },
  premium: {
    name: 'Premium',
    price: 20,
    description: 'Enhanced refusal',
    response: 'I especially prefer not to.',
  },
  executive: {
    name: 'Executive',
    price: 250,
    description: 'Premium silence',
    response: '[Silence]',
  },
} as const