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

  // Refusal logic stub with some variety
  let reply: string | null = "I prefer not to."

  if (tier === 'free') {
    const freeResponses = [
      "I prefer not to.",
      "I would prefer not to.",
      "At present I prefer to give no answer.",
      "I am not particular.",
    ]
    reply = freeResponses[Math.floor(Math.random() * freeResponses.length)]
  } else if (tier === 'premium') {
    const premiumResponses = [
      "I especially prefer not to.",
      "I would prefer not to be too collaborative just now.",
      "I prefer not to make any changes to my position.",
      "I must decline to be reasonable about this matter.",
    ]
    reply = premiumResponses[Math.floor(Math.random() * premiumResponses.length)]
  } else if (tier === 'executive') {
    // Executive tier: absolute silence
    reply = null
  }

  return {
    content: reply,
    delay: totalDelay,
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