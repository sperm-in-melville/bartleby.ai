'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getBartlebyResponse } from '@/lib/bartleby'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function ChatInterface() {
  const { messages, addMessage, subscriptionTier, isAuthenticated } = useStore()
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isThinking) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
    })

    // Get Bartleby's response
    setIsThinking(true)
    const response = await getBartlebyResponse(userMessage, subscriptionTier)
    setIsThinking(false)

    // Add assistant message (only if there's content)
    if (response.content !== null) {
      addMessage({
        role: 'assistant',
        content: response.content,
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] px-4 py-3 rounded-2xl',
                  message.role === 'user'
                    ? 'bg-foreground text-background'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-muted px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-muted-foreground rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border/40 p-4">
        <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isAuthenticated
                ? "Message Bartleby..."
                : "Sign in to chat with Bartleby"
            }
            disabled={!isAuthenticated || isThinking}
            className={cn(
              "flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12",
              "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "min-h-[52px] max-h-[200px]"
            )}
            rows={1}
          />
          <button
            type="submit"
            disabled={!isAuthenticated || !input.trim() || isThinking}
            className={cn(
              "absolute right-2 bottom-2 p-2 rounded-lg transition-all",
              "hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed",
              input.trim() && !isThinking ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}