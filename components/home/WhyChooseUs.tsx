'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Truck, 
  Headphones, 
  Award,
  Clock,
  RefreshCw,
  CreditCard,
  Package
} from 'lucide-react'

// shadcn imports
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your transactions are protected with 256-bit SSL encryption',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50 with tracking available',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer service for all your needs',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: '100% authentic products with manufacturer warranty',
  },
  {
    icon: Clock,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
  {
    icon: RefreshCw,
    title: 'Price Match',
    description: "We'll match any competitor's price",
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Multiple payment options including EMI',
  },
  {
    icon: Package,
    title: 'Track Orders',
    description: 'Real-time order tracking from warehouse to doorstep',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Experience the best shopping experience with our premium features
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:border-primary transition-colors h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}