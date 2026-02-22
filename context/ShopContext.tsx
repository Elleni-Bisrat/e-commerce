'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviews?: number
  category?: string
  brand?: string
  quantity?: number
}

interface ShopContextType {
  // Cart
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number

  // Wishlist
  wishlist: number[]
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean

  // Category
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // Cart state
  const [cart, setCart] = useState<Product[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  )

  const cartCount = cart.reduce((count, item) => count + (item.quantity || 1), 0)

  // Wishlist functions
  const addToWishlist = (productId: number) => {
    setWishlist(prev => [...prev, productId])
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(id => id !== productId))
  }

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId)
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}