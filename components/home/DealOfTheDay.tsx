"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Zap, ShoppingCart, Star, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useShop } from "@/context/ShopContext";
import { toast } from "sonner";
// Mock deal product with real Unsplash image
const dealProduct = {
  id: "deal-1",
  name: "Premium Wireless Headphones",
  description:
    "Active Noise Cancelling, 40H Battery Life, Premium Sound Quality",
  price: 199.99,
  originalPrice: 399.99,
  discount: 50,
  image:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  rating: 4.8,
  reviews: 1234,
  sold: 3456,
  available: 5000,
};

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } =
    useShop();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progress = (dealProduct.sold / dealProduct.available) * 100;

  const handleAddToCart = () => {
    addToCart({
      id: parseInt(dealProduct.id.split("-")[1]),
      name: dealProduct.name,
      price: dealProduct.price,
      originalPrice: dealProduct.originalPrice,
      image: dealProduct.image,
      rating: dealProduct.rating,
      reviews: dealProduct.reviews,
    });
    toast.success("Added to cart!", {
      description: `${dealProduct.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    const productId = parseInt(dealProduct.id.split("-")[1]);
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.error("Removed from wishlist", {
        description: "Item removed from your wishlist",
      });
    } else {
      addToWishlist(productId);
      toast.success("Added to wishlist!", {
        description: "Item saved to your wishlist",
      });
    }
  };

  const productId = parseInt(dealProduct.id.split("-")[1]);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <Badge
            variant="destructive"
            className="inline-flex items-center gap-1 mb-4"
          >
            <Zap className="h-3 w-3" />
            Limited Time Offer
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Deal of the Day
          </h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Hurry! These exclusive deals wont last long
          </p>
        </div>

        <Card className="relative overflow-hidden border-2 border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

          <CardContent className="relative p-6 md:p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
                  <img
                    src={dealProduct.image}
                    alt={dealProduct.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Badge
                    variant="destructive"
                    className="absolute top-4 left-4 text-lg px-4 py-2 shadow-lg"
                  >
                    -{dealProduct.discount}%
                  </Badge>

                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={handleWishlistToggle}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(productId)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </Button>
                </div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                  className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl"
                />
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {dealProduct.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {dealProduct.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(dealProduct.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({dealProduct.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-primary">
                    ${dealProduct.price}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ${dealProduct.originalPrice}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-base bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    Save $
                    {(dealProduct.originalPrice - dealProduct.price).toFixed(2)}
                  </Badge>
                </div>

                <Separator />

                {/* Countdown Timer */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Offer ends in:</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                        <div className="bg-primary/10 rounded-lg p-3 backdrop-blur-sm border border-primary/20">
                          <span className="text-3xl font-bold text-primary">
                            {value.toString().padStart(2, "0")}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 block capitalize">
                          {unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Sold: {dealProduct.sold.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      Available: {dealProduct.available.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full relative"
                    >
                      <div className="absolute top-0 right-0 h-full w-2 bg-white blur-sm" />
                    </motion.div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="flex-1 group relative overflow-hidden"
                    onClick={handleAddToCart}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Grab the Deal
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link href="/deals">View All Deals</Link>
                  </Button>
                </div>

                {/* Stock Status */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-center font-medium"
                >
                  <span className="text-primary">
                    🔥 Only {dealProduct.available - dealProduct.sold} items
                  </span>
                  <span className="text-muted-foreground"> left in stock!</span>
                </motion.p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
