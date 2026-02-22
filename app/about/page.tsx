'use client'

import { motion } from 'framer-motion'
import { 
  Truck, 
  Shield, 
  Headphones, 
  RefreshCw,
  Users,
  Globe,
  Award,
  Heart
} from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { value: '50K+', label: 'Happy Customers', icon: Users },
  { value: '10K+', label: 'Products', icon: Globe },
  { value: '5+', label: 'Years of Excellence', icon: Award },
  { value: '24/7', label: 'Customer Support', icon: Headphones },
]

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment processing',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day money-back guarantee',
  },
  {
    icon: Heart,
    title: 'Best Prices',
    description: 'Price match guarantee',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">About ShopEase</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your premier destination for quality products and exceptional shopping experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2019, ShopEase began with a simple mission: to make quality products accessible to everyone. What started as a small online store has grown into a trusted destination for thousands of customers worldwide.
                </p>
                <p>
                  We believe in curating products that combine style, functionality, and value. Our team works tirelessly to bring you the latest trends and timeless classics, all while ensuring the best possible shopping experience.
                </p>
                <p>
                  Today, we are proud to serve over 50,000 happy customers with a wide range of products, from electronics to fashion, home goods to beauty essentials.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
                alt="Our team"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Join thousands of happy customers today
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}