'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Shopping lifestyle background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container px-4  md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <Badge variant="outline" className="w-fit bg-white/10 text-white border-white/30 backdrop-blur-sm mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Summer Sale 2024
          </Badge>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white mb-4">
            Discover Your
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent block">
              Perfect Style
            </span>
          </h1>
          
          <p className="max-w-[600px] text-white/80 md:text-xl mb-6">
            Shop the latest trends with exclusive discounts up to 70% off. 
            Free shipping on orders over $50.
          </p>
          
          <div className="flex flex-col gap-2 min-[400px]:flex-row mb-6">
            <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
              <Link href="/deals">View Deals</Link>
            </Button>
          </div>

          {/* Stats with transparent styling */}
          <div className="flex items-center gap-4 pt-4">
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg px-4 py-2 border border-white/10">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-xs text-white/60">Happy Customers</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg px-4 py-2 border border-white/10">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-xs text-white/60">Products</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg px-4 py-2 border border-white/10">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-white/60">Support</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}