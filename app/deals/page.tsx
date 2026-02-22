'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Clock, ShoppingCart, Star, TrendingDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const deals = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 79.99,
    originalPrice: 199.99,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    endsIn: '2 days',
    sold: 1234,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    originalPrice: 399.99,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
    endsIn: '5 hours',
    sold: 567,
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    endsIn: '1 day',
    sold: 890,
  },
  {
    id: 4,
    name: 'Camera Bundle',
    price: 499.99,
    originalPrice: 899.99,
    discount: 44,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
    endsIn: '3 days',
    sold: 234,
  },
]

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Flash Sale Banner */}
      <section className="relative py-16 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Zap className="h-3 w-3 mr-1" />
              Flash Sale
            </Badge>
            <h1 className="text-5xl font-bold mb-4">Deals of the Day</h1>
            <p className="text-xl mb-8 text-white/90">
              Up to 70% off on selected items
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
                    <span className="text-4xl font-bold">
                      {value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-sm mt-2 block capitalize">{unit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative aspect-square">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge variant="destructive" className="absolute top-2 left-2 text-lg px-3">
                        -{deal.discount}%
                      </Badge>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90">
                          <Clock className="h-3 w-3 mr-1" />
                          {deal.endsIn}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{deal.name}</h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-primary">${deal.price}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${deal.originalPrice}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sold: {deal.sold}</span>
                          <span className="text-green-600 font-medium">🔥 Hot Deal</span>
                        </div>
                        <Button className="w-full group">
                          <ShoppingCart className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                          Grab Deal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}