'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye,X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useShop } from '@/context/ShopContext'
import type { Product } from '@/context/ShopContext'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useShop()
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const wishlisted = isInWishlist(product.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (wishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 relative">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discount > 0 && (
                <Badge variant="destructive" className="shadow-lg">
                  -{discount}%
                </Badge>
              )}
              {product.rating && product.rating >= 4.5 && (
                <Badge variant="secondary" className="bg-yellow-500 text-white shadow-lg">
                  Best Seller
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors z-10"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </motion.button>

            {/* Quick View Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white text-black hover:bg-white/90"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowQuickView(true)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Quick View
                </Button>
              </motion.div>
            </motion.div>

            {/* Add to Cart on Hover */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: isHovered ? 0 : 100 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-white text-black hover:bg-white/90"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold line-clamp-1 mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating!)
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
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Category Tag */}
            {product.category && (
              <Badge variant="outline" className="mt-2 text-xs">
                {product.category}
              </Badge>
            )}
          </CardContent>
        </Card>
      </Link>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowQuickView(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg w-full"
                />
                <div>
                  <p className="text-muted-foreground mb-4">
                    High-quality product with premium features. Perfect for everyday use.
                  </p>
                  <div className="space-y-4">
                    <Button onClick={handleAddToCart} className="w-full">
                      Add to Cart
                    </Button>
                    <Button variant="outline" onClick={handleWishlist} className="w-full">
                      {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}