'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

// shadcn imports
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    content: 'Amazing quality products and super fast shipping! The customer service was excellent when I had questions about my order.',
    rating: 5,
    avatar: '/api/placeholder/100/100',
    initials: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Frequent Shopper',
    content: 'Best online shopping experience I have had. The website is easy to navigate and the checkout process is seamless.',
    rating: 5,
    avatar: '/api/placeholder/100/100',
    initials: 'MC',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Verified Buyer',
    content: 'Love the variety of products available. Found exactly what I was looking for at a great price. Will definitely shop again!',
    rating: 4,
    avatar: '/api/placeholder/100/100',
    initials: 'ED',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Real reviews from real customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
                <CardContent className="p-8 md:p-12">
                  <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/20" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={testimonials[currentIndex].avatar} />
                      <AvatarFallback>{testimonials[currentIndex].initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[currentIndex].rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-lg text-muted-foreground italic">
                    {testimonials[currentIndex].content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
            onClick={prev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full"
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}