"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  Eye,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useShop } from "@/context/ShopContext";

// Mock products data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 99.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.5,
    reviews: 123,
    category: "Electronics",
    brand: "Sony",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80",
    rating: 4.8,
    reviews: 89,
    category: "Electronics",
    brand: "Apple",
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Leather Backpack",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
    rating: 4.3,
    reviews: 56,
    category: "Fashion",
    brand: "Herschel",
    inStock: true,
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 149.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.6,
    reviews: 234,
    category: "Sports",
    brand: "Nike",
    inStock: true,
  },
  {
    id: 5,
    name: "DSLR Camera",
    price: 599.99,
    originalPrice: 799.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80",
    rating: 4.7,
    reviews: 178,
    category: "Electronics",
    brand: "Canon",
    inStock: false,
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 49.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
    rating: 4.4,
    reviews: 92,
    category: "Fashion",
    brand: "Coach",
    inStock: true,
  },
  {
    id: 7,
    name: "Sunglasses",
    price: 129.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1888&q=80",
    rating: 4.5,
    reviews: 67,
    category: "Fashion",
    brand: "Ray-Ban",
    inStock: true,
  },
  {
    id: 8,
    name: "Smart Speaker",
    price: 89.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80",
    rating: 4.6,
    reviews: 145,
    category: "Electronics",
    brand: "Amazon",
    inStock: true,
  },
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Home & Living",
  "Beauty",
];
const brands = [
  "Sony",
  "Apple",
  "Nike",
  "Adidas",
  "Samsung",
  "LG",
  "Canon",
  "Herschel",
];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [quickViewProduct, setQuickViewProduct] = useState<
    (typeof products)[0] | null
  >(null);

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useShop();

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // For demo, just reverse
        filtered.reverse();
        break;
      default:
        // 'popular' - keep as is
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, selectedBrands, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const handleWishlistToggle = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.error("Removed from wishlist", {
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(productId);
      toast.success("Added to wishlist!", {
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleAddToCart = (
    product: (typeof products)[0],
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) {
      toast.error("Out of stock", {
        description: "This product is currently unavailable.",
      });
      return;
    }

    addToCart(product);
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
  };

  const handleQuickView = (
    product: (typeof products)[0],
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shop Collection
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium products
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-64 space-y-6"
          >
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-medium mb-4">Price Range</h4>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-sm font-medium mb-4">Brands</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <label htmlFor={brand} className="text-sm cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange([0, 1000]);
                setSelectedBrands([]);
                toast.info("Filters cleared");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Narrow down your product search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Categories</h4>
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              toast.info(`Category: ${category}`);
                            }}
                            className={`block w-full text-left px-2 py-1 rounded text-sm ${
                              selectedCategory === category
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Price Range</h4>
                        <Slider
                          defaultValue={[0, 1000]}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-muted-foreground">
                  Showing {paginatedProducts.length} of{" "}
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value);
                    toast.info(
                      `Sorted by: ${sortOptions.find((opt) => opt.value === value)?.label}`,
                    );
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode + currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <Link href={`/product/${product.id}`}>
                      <Card
                        className={`group overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
                          viewMode === "list" ? "flex" : ""
                        }`}
                      >
                        <div
                          className={`relative ${viewMode === "list" ? "w-48" : "aspect-square"}`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                          />
                          {!product.inStock && (
                            <Badge
                              variant="secondary"
                              className="absolute top-2 left-2"
                            >
                              Out of Stock
                            </Badge>
                          )}

                          {/* Quick View Button */}
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-2 right-12 h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleQuickView(product, e)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {/* Wishlist Button */}
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-2 right-2 h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                            onClick={(e) => handleWishlistToggle(product.id, e)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                isInWishlist(product.id)
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>

                        <CardContent
                          className={`p-4 flex-1 ${
                            viewMode === "list"
                              ? "flex flex-col justify-between"
                              : ""
                          }`}
                        >
                          <div>
                            <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-2">
                              {product.name}
                            </h3>

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

                            <div className="text-sm text-muted-foreground mb-2">
                              {product.brand} • {product.category}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
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

                            <Button
                              size="sm"
                              disabled={!product.inStock}
                              onClick={(e) => handleAddToCart(product, e)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {product.inStock ? "Add" : "Sold Out"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {paginatedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-lg font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 1000]);
                    setSelectedBrands([]);
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>

                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">
                    {quickViewProduct.name}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="rounded-lg w-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(quickViewProduct.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">
                        ({quickViewProduct.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      High-quality {quickViewProduct.category.toLowerCase()}{" "}
                      product from {quickViewProduct.brand}. Perfect for
                      everyday use with premium features.
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-3xl font-bold text-primary">
                        ${quickViewProduct.price}
                      </span>
                      {quickViewProduct.originalPrice >
                        quickViewProduct.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${quickViewProduct.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          handleAddToCart(
                            quickViewProduct,
                            new MouseEvent("click") as any,
                          );
                          setQuickViewProduct(null);
                        }}
                        className="w-full"
                        disabled={!quickViewProduct.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {quickViewProduct.inStock
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleWishlistToggle(
                            quickViewProduct.id,
                            new MouseEvent("click") as any,
                          );
                        }}
                        className="w-full"
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${
                            isInWishlist(quickViewProduct.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                        {isInWishlist(quickViewProduct.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                      </Button>
                      <Button variant="link" className="w-full" asChild>
                        <Link href={`/product/${quickViewProduct.id}`}>
                          View Full Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
