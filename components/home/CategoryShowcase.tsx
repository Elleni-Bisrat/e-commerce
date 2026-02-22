'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  Dumbbell, 
  BookOpen 
} from 'lucide-react'

// shadcn imports
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  { id: 1, name: 'Electronics', icon: Smartphone, count: '2,345', href: '/category/electronics' },
  { id: 2, name: 'Fashion', icon: Shirt, count: '3,890', href: '/category/fashion' },
  { id: 3, name: 'Home & Living', icon: Home, count: '1,567', href: '/category/home-living' },
  { id: 4, name: 'Beauty', icon: Sparkles, count: '987', href: '/category/beauty' },
  { id: 5, name: 'Sports', icon: Dumbbell, count: '654', href: '/category/sports' },
  { id: 6, name: 'Books', icon: BookOpen, count: '2,101', href: '/category/books' },
]

export default function CategoryShowcase() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Explore our wide range of categories and find exactly what you are looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.href}>
                  <Card className="group hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.count} products</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}