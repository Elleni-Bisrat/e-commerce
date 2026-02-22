'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, X, ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useShop } from '@/context/ShopContext'

// Mock products data - in a real app, you'd fetch these based on wishlist IDs
const allProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 99.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Premium Leather Backpack',
    price: 79.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80',
    category: 'Fashion',
  },
  {
    id: 4,
    name: 'Running Shoes',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'Sports',
  },
]

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useShop()
  
  const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id))

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart(product)
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id)
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">
            Save your favorite items here
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Heart className="h-8 w-8 fill-red-500 text-red-500" />
          My Wishlist ({wishlistProducts.length} items)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${product.price}</span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
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