import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Paperclip, Link, Code, Send, Info, Bot, X, Loader2 } from 'lucide-react'
import { LiquidButton } from './ui/liquid-glass-button'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const FloatingAiAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m the AI assistant for Muhammad Ulil Albab\'s portfolio. Ask me anything about his background, skills, projects, or experience!',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const maxChars = 2000
  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [, setStreamingContent] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)
    setCharCount(value.length)
  }

  const handleSend = useCallback(async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    setCharCount(0)
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    setStreamingContent('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let buffer = ''
      let assistantMessage = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === 'data: [DONE]') continue
          if (!trimmed.startsWith('data: ')) continue

          try {
            const payload = JSON.parse(trimmed.slice(6))
            const content = payload.content
            if (content) {
              assistantMessage += content
              setMessages(prev => {
                const newMessages = [...prev]
                const lastMessage = newMessages[newMessages.length - 1]
                if (lastMessage && lastMessage.role === 'assistant') {
                  lastMessage.content = assistantMessage
                }
                return newMessages
              })
              setStreamingContent(assistantMessage)
            }
          } catch {
            // skip malformed
          }
        }
      }

      setStreamingContent('')
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [message, messages, isLoading])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        if (!(event.target as Element)?.closest?.('.floating-ai-button')) {
          setIsChatOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Focus textarea when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isChatOpen])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating 3D Glowing AI Logo */}
      <LiquidButton
        size="icon"
        className="floating-ai-button relative w-16 h-16 rounded-full transition-all duration-500"
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.8) 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
        <div className="relative z-10">
          {isChatOpen ? <X className="w-8 h-8 text-white" /> : <Bot className="w-8 h-8 text-white" />}
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500"></div>
      </LiquidButton>

      {/* Chat Interface */}
      {isChatOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[92vw] max-w-[500px] transition-all duration-300 origin-bottom-right"
          style={{
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 border border-zinc-500/50 shadow-2xl backdrop-blur-3xl overflow-hidden max-h-[80vh]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-zinc-400">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-zinc-800/60 text-zinc-300 rounded-2xl">
                  Groq
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl">
                  Beta
                </span>
                <LiquidButton
                  size="icon"
                  onClick={() => setIsChatOpen(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </LiquidButton>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-3 space-y-3 min-h-[200px] max-h-[400px]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-sm'
                        : 'bg-zinc-800/60 text-zinc-100 rounded-bl-sm border border-zinc-700/30'
                    }`}
                  >
                    {msg.content || (msg.role === 'assistant' && idx === messages.length - 1 && isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    ) : null)}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.content === '' && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800/60 text-zinc-100 px-4 py-2.5 rounded-2xl rounded-bl-sm border border-zinc-700/30">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="relative flex-shrink-0 border-t border-zinc-800/50">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={3}
                className="w-full px-6 py-4 bg-transparent border-none outline-none resize-none text-sm font-normal leading-relaxed text-zinc-100 placeholder-zinc-500 scrollbar-none"
                placeholder="Ask about Muhammad Ulil Albab..."
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                disabled={isLoading}
              />

              {/* Controls Section */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LiquidButton
                      size="icon"
                      className="h-10 w-10 rounded-lg text-zinc-500 hover:text-zinc-200"
                      disabled={isLoading}
                    >
                      <Paperclip className="w-4 h-4" />
                    </LiquidButton>
                    <LiquidButton
                      size="icon"
                      className="h-10 w-10 rounded-lg text-zinc-500 hover:text-zinc-200"
                      disabled={isLoading}
                    >
                      <Link className="w-4 h-4" />
                    </LiquidButton>
                    <LiquidButton
                      size="icon"
                      className="h-10 w-10 rounded-lg text-zinc-500 hover:text-zinc-200"
                      disabled={isLoading}
                    >
                      <Code className="w-4 h-4" />
                    </LiquidButton>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs font-medium text-zinc-500">
                      <span>{charCount}</span>/<span className="text-zinc-400">{maxChars}</span>
                    </div>

                    <LiquidButton
                      size="icon"
                      onClick={handleSend}
                      disabled={!message.trim() || isLoading}
                      className={`group h-11 w-11 rounded-xl bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white shadow-lg ${
                        !message.trim() || isLoading ? 'opacity-50 hover:scale-100' : ''
                      }`}
                    >
                      <Send className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12 group-hover:scale-110" />
                    </LiquidButton>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    <span>
                      Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-600 rounded text-zinc-400 font-mono text-[10px] shadow-sm">Shift + Enter</kbd> for new line
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Overlay */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.05), transparent, rgba(168,85,247,0.05))',
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .floating-ai-button:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.9), 0 0 50px rgba(124, 58, 237, 0.7), 0 0 70px rgba(109, 40, 217, 0.5);
        }
      `}</style>
    </div>
  )
}