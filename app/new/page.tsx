'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Clock, ShoppingCart, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const newProducts = [
  {
    id: 9,
    name: 'Smart Watch Ultra',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    rating: 5,
    reviews: 23,
    releaseDate: '2024-02-15',
  },
  {
    id: 10,
    name: 'Wireless Earbuds Pro',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    rating: 4.5,
    reviews: 45,
    releaseDate: '2024-02-10',
  },
  {
    id: 11,
    name: 'Minimalist Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80',
    rating: 4,
    reviews: 12,
    releaseDate: '2024-02-05',
  },
  {
    id: 12,
    name: 'Smart Home Hub',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    rating: 4.5,
    reviews: 34,
    releaseDate: '2024-02-01',
  },
]

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4" variant="outline">
              <Sparkles className="h-3 w-3 mr-1" />
              Fresh Collection
            </Badge>
            <h1 className="text-5xl font-bold mb-6">New Arrivals</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Be the first to discover our latest products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary">
                    New
                  </Badge>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      Quick View
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Just in
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}