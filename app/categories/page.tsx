'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  Trophy, 
  BookOpen,
  Gamepad2,
  Watch,
  Camera,
  Headphones
} from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: 'Electronics', icon: Smartphone, count: 234, color: 'from-blue-500 to-cyan-500' },
  { name: 'Fashion', icon: Shirt, count: 456, color: 'from-pink-500 to-rose-500' },
  { name: 'Home & Living', icon: Home, count: 123, color: 'from-green-500 to-emerald-500' },
  { name: 'Beauty', icon: Sparkles, count: 89, color: 'from-purple-500 to-violet-500' },
  { name: 'Sports', icon: Trophy, count: 167, color: 'from-orange-500 to-red-500' },
  { name: 'Books', icon: BookOpen, count: 78, color: 'from-yellow-500 to-amber-500' },
  { name: 'Gaming', icon: Gamepad2, count: 45, color: 'from-indigo-500 to-purple-500' },
  { name: 'Watches', icon: Watch, count: 56, color: 'from-gray-500 to-slate-500' },
  { name: 'Cameras', icon: Camera, count: 34, color: 'from-red-500 to-orange-500' },
  { name: 'Audio', icon: Headphones, count: 67, color: 'from-teal-500 to-cyan-500' },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our wide range of categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/category/${category.name.toLowerCase().replace(' & ', '-')}`}>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-full h-32 bg-gradient-to-br ${category.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} products
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}