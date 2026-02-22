'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { products } from '@/data/products'

export default function TrendingNow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  const trendingProducts = products.filter(p => p.tags.includes('bestseller'))

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <SectionHeader
          title="Trending Now"
          subtitle="Most popular products right now"
        />
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-muted rounded-full mb-8">
        <motion.div
          style={{ scaleX: scrollXProgress }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
        />
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {trendingProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="min-w-[300px] snap-start"
          >
            <div className="relative">
              {/* Trending Badge */}
              <div className="absolute -top-2 -right-2 z-10">
                <div className="relative">
                  <TrendingUp className="w-8 h-8 text-primary animate-pulse" />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                    #{index + 1}
                  </span>
                </div>
              </div>
              <ProductCard product={product} />
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}