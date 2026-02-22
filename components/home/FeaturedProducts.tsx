"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShop } from "@/context/ShopContext";
import { toast } from "sonner";
// Mock product data with real Unsplash images
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 99.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.5,
    reviews: 123,
    isNew: true,
    discount: 50,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch Series 5 - Black",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    rating: 4.8,
    reviews: 89,
    isNew: false,
    discount: 25,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Premium Leather Backpack",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    rating: 4.3,
    reviews: 56,
    isNew: true,
    discount: 38,
    category: "Fashion",
  },
  {
    id: 4,
    name: "Professional Running Shoes",
    price: 149.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.6,
    reviews: 234,
    isNew: false,
    discount: 25,
    category: "Sports",
  },
];

export default function FeaturedProducts() {
  const [filter, setFilter] = useState("all");
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useShop();

  const filters = [
    { value: "all", label: "All Products" },
    { value: "new", label: "New Arrivals" },
    { value: "bestseller", label: "Best Sellers" },
    { value: "sale", label: "On Sale" },
  ];

  const handleAddToCart = (
    product: (typeof products)[0],
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: "Check your cart to complete purchase",
      duration: 3000,
    });
  };

  const handleWishlistToggle = (
    productId: number,
    productName: string,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.info("Removed from wishlist", {
        description: "Item removed from your wishlist",
      });
    } else {
      addToWishlist(productId);
      toast.success("Added to wishlist!", {
        description: "Item saved to your wishlist",
      });
    }
  };

  const filteredProducts =
    filter === "all"
      ? products
      : filter === "new"
        ? products.filter((p) => p.isNew)
        : filter === "sale"
          ? products.filter((p) => p.discount > 0)
          : products;

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Hand-picked just for you
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
              className="transition-all"
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                          <Badge
                            variant="default"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            New
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge variant="destructive">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white z-10"
                        onClick={(e) => handleWishlistToggle(product.id, e)}
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            isInWishlist(product.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white text-black hover:bg-white/90"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add quick view logic here
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Quick View
                        </Button>
                      </div>

                      {/* Add to Cart Button - Appears on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button
                          className="w-full bg-white text-black hover:bg-white/90"
                          size="sm"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1 mb-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Category Tag */}
                      <Badge variant="outline" className="mt-2 text-xs">
                        {product.category}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="group" asChild>
            <Link href="/shop">
              View All Products
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
