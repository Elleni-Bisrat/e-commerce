'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'

// shadcn imports
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubscribed(true)
    setEmail('')
    
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <Card className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
          
          <CardContent className="relative p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-muted-foreground">
                  Get the latest updates on new products and upcoming sales
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || isSubscribed}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
                      ) : isSubscribed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {isSubscribed && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ✓ Thanks for subscribing!
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates
                  </p>
                </form>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}