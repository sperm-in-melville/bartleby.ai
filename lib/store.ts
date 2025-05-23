import { create } from 'zustand'

export type SubscriptionTier = 'free' | 'premium' | 'executive'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AppState {
  subscriptionTier: SubscriptionTier
  setSubscriptionTier: (tier: SubscriptionTier) => void
  
  messages: Message[]
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  
  isAuthenticated: boolean
  setAuthenticated: (authenticated: boolean) => void
  
  userEmail: string | null
  setUserEmail: (email: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  subscriptionTier: 'free',
  setSubscriptionTier: (tier) => set({ subscriptionTier: tier }),
  
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  
  isAuthenticated: false,
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  
  userEmail: null,
  setUserEmail: (email) => set({ userEmail: email }),
}))