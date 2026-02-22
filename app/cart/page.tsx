'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  ShoppingBag,
  Tag,
  Shield,
  Truck
} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useShop } from '@/context/ShopContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useShop()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const shipping = cartTotal > 100 ? 0 : 10
  const tax = cartTotal * 0.1
  const total = cartTotal + shipping + tax

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setPromoApplied(true)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              Continue Shopping
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
          <ShoppingCart className="h-8 w-8" />
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link href={`/product/${item.id}`}>
                          <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-full h-full hover:scale-110 transition-transform"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <Link href={`/product/${item.id}`}>
                                <h3 className="font-semibold hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                              {item.category && (
                                <p className="text-sm text-muted-foreground">
                                  {item.category}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity || 1}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <span className="font-bold">
                                ${(item.price * (item.quantity || 1)).toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <p className="text-xs text-muted-foreground line-through">
                                  ${(item.originalPrice * (item.quantity || 1)).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="link" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                {/* Promo Code */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={handleApplyPromo} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      20% discount applied!
                    </p>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (20%)</span>
                      <span>-${(cartTotal * 0.2).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>
                    ${(promoApplied ? total * 0.8 : total).toFixed(2)}
                  </span>
                </div>

                <Button className="w-full mb-4" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}