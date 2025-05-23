'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, User2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getBartlebyResponse } from '@/lib/bartleby'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { BartlebyEasterEgg } from './bartleby-easter-egg'
import { EmptyChairIcon } from './ui/empty-chair-icon'

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
  }, [messages, isThinking])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isThinking || !isAuthenticated) return

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

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const maxHeight = 120
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  // Focus input when authenticated
  useEffect(() => {
    if (isAuthenticated && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAuthenticated])

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto px-8 py-8 space-y-8">
          {/* Welcome Message */}
          {messages.length === 0 && !isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border mb-6">
                  <EmptyChairIcon className="h-8 w-8 text-foreground" />
                </div>
                <h2 className="text-2xl font-light text-foreground mb-4">Welcome to Bartleby</h2>
                <p className="text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
                  I&apos;m an AI that specializes in the art of polite refusal. Try asking me to help with something, and I&apos;ll demonstrate my unique approach to not being helpful.
                </p>
                {subscriptionTier === 'free' && (
                  <p className="text-xs text-muted-foreground mt-4 font-light">
                    Currently on the free tier • Upgrade for more sophisticated refusals
                  </p>
                )}
              </div>
              <div className="grid gap-3 max-w-sm mx-auto">
                {[
                  "Help me write a story",
                  "What's the meaning of life?",
                  "Can you do my homework?"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(suggestion)}
                    className="p-3 text-sm border border-border rounded hover:bg-accent transition-colors text-left font-light"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex gap-4 group',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {/* Assistant Avatar */}
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center mt-1">
                    <EmptyChairIcon className="h-4 w-4 text-foreground" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={cn(
                    'max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-lg',
                    message.role === 'user'
                      ? 'chat-bubble-user ml-12'
                      : 'chat-bubble-assistant mr-12'
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words font-light">
                    {message.content}
                  </p>
                  
                  {/* Timestamp */}
                  <div className={cn(
                    "text-xs mt-2 opacity-0 group-hover:opacity-50 transition-opacity",
                    message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}>
                    {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>

                {/* User Avatar */}
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1">
                    <User2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Thinking Animation */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-4 justify-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center mt-1">
                <EmptyChairIcon className="h-4 w-4 text-foreground" />
              </div>
              <div className="chat-bubble-assistant px-4 py-3 rounded-lg mr-12">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-light">Bartleby is considering...</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end gap-3 border border-border rounded-lg p-3 bg-background hover:border-ring focus-within:border-ring transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  adjustTextareaHeight()
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  isAuthenticated
                    ? "Message Bartleby... (he probably won't help)"
                    : "Sign in to chat with Bartleby"
                }
                disabled={!isAuthenticated || isThinking}
                className={cn(
                  "flex-1 resize-none bg-transparent border-0 placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-0 text-sm leading-relaxed font-light",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "min-h-[20px] max-h-[100px] py-1 text-foreground"
                )}
                rows={1}
                autoFocus={isAuthenticated}
              />
              <button
                type="submit"
                disabled={!isAuthenticated || !input.trim() || isThinking}
                className={cn(
                  "flex-shrink-0 p-2 rounded transition-colors",
                  input.trim() && !isThinking && isAuthenticated
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Tips */}
            <div className="flex justify-between items-center mt-3 px-1">
              <div className="text-xs text-muted-foreground font-light">
                {!isAuthenticated && "Sign in to start chatting"}
                {isAuthenticated && messages.length === 0 && "Try asking Bartleby to help with something..."}
              </div>
              <div className="text-xs text-muted-foreground font-light">
                {input.length > 0 && `${input.length} characters`}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Easter Egg */}
      <BartlebyEasterEgg />
    </div>
  )
}