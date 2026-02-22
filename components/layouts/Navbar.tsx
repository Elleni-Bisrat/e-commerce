"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ModeToggle } from "../ui/toggleMode";
import {
  ShoppingCart,
  Search,
  Menu,
  User,
  Heart,
  X,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringCart, setIsHoveringCart] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const { cartCount, wishlist } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Star className="w-4 h-4" /> },
    { name: "Shop", href: "/shop", icon: <Zap className="w-4 h-4" /> },
    {
      name: "New Arrivals",
      href: "/new",
      icon: <Sparkles className="w-4 h-4" />,
    },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Theme-specific styles
  const themeStyles = {
    light: {
      gradient: "from-purple-600 to-pink-600",
      glow: "0 0 20px rgba(168, 85, 247, 0.3)",
      borderGlow: "0 0 15px rgba(236, 72, 153, 0.2)",
      cardBg: "bg-white/80",
      textGradient: "from-purple-600 via-pink-600 to-orange-600",
    },
    dark: {
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      glow: "0 0 25px rgba(34, 211, 238, 0.5)",
      borderGlow: "0 0 20px rgba(139, 92, 246, 0.4)",
      cardBg: "bg-gray-900/80",
      textGradient: "from-cyan-400 via-blue-400 to-purple-400",
    },
  };

  const currentTheme =
    resolvedTheme === "dark" ? themeStyles.dark : themeStyles.light;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl bg-background/80 border-b"
            : "bg-transparent"
        }`}
        style={{
          boxShadow: isScrolled ? currentTheme.glow : "none",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              background:
                resolvedTheme === "dark"
                  ? "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.15), transparent 70%), radial-gradient(circle at 70% 70%, rgba(139,92,246,0.15), transparent 70%)"
                  : "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.1), transparent 70%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.1), transparent 70%)",
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main navbar */}
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button with animation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-accent relative overflow-hidden group"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
              <motion.span
                className="absolute inset-0 bg-primary/20 rounded-md"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="relative"
                >
                  <ShoppingCart className="h-6 w-6 text-primary" />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-primary/30 blur-xl rounded-full"
                  />
                </motion.div>
                <motion.span
                  className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent`}
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  ShopEase
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation Links with hover effects */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group px-3 py-2"
                    >
                      <span className="relative z-10 text-sm font-medium flex items-center gap-1">
                        {link.icon && (
                          <motion.span
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="text-primary"
                          >
                            {link.icon}
                          </motion.span>
                        )}
                        {link.name}
                      </span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          boxShadow: currentTheme.borderGlow,
                        }}
                      />
                      <motion.span
                        className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative w-full group">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 transition-all duration-300 group-hover:border-primary/50"
                  style={{
                    boxShadow: isScrolled ? currentTheme.borderGlow : "none",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  animate={{
                    boxShadow:
                      resolvedTheme === "dark"
                        ? [
                            "0 0 0 0 rgba(34,211,238,0)",
                            "0 0 20px 5px rgba(34,211,238,0.3)",
                            "0 0 0 0 rgba(34,211,238,0)",
                          ]
                        : [
                            "0 0 0 0 rgba(168,85,247,0)",
                            "0 0 20px 5px rgba(168,85,247,0.2)",
                            "0 0 0 0 rgba(168,85,247,0)",
                          ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full group"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="h-4 w-4" />
                  </motion.div>
                </Button>
              </div>
            </motion.form>

            {/* Right side icons with animations */}
            <div className="flex items-center space-x-1">
              {/* Mobile search button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden"
              >
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* User menu with animation */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 backdrop-blur-xl"
                  style={{
                    backgroundColor:
                      resolvedTheme === "dark"
                        ? "rgba(17, 17, 17, 0.9)"
                        : "rgba(255, 255, 255, 0.9)",
                    borderColor:
                      resolvedTheme === "dark"
                        ? "rgba(34,211,238,0.2)"
                        : "rgba(168,85,247,0.2)",
                  }}
                >
                  <DropdownMenuLabel>
                    <span
                      className={`bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent`}
                    >
                      My Account
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["Profile", "Orders", "Settings"].map((item) => (
                    <DropdownMenuItem key={item}>
                      <Link href={`/${item.toLowerCase()}`} className="w-full">
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist with pulse animation - NOW LINKED */}
              <Link href="/wishlist">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="relative"
                >
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlist.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <Badge
                          variant="default"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
                        >
                          {wishlist.length}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </Link>

              <Link href="/cart">
                <motion.div
                  onHoverStart={() => setIsHoveringCart(true)}
                  onHoverEnd={() => setIsHoveringCart(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <Button variant="ghost" size="icon" className="relative">
                    <motion.div
                      animate={
                        isHoveringCart
                          ? {
                              rotate: [0, -10, 10, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </motion.div>
                    {cartCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {cartCount}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>

                  <AnimatePresence>
                    {isHoveringCart && cartCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-64 p-4 rounded-lg shadow-xl backdrop-blur-xl border ${currentTheme.cardBg}`}
                        style={{
                          borderColor:
                            resolvedTheme === "dark"
                              ? "rgba(34,211,238,0.3)"
                              : "rgba(168,85,247,0.3)",
                          boxShadow: currentTheme.glow,
                        }}
                        onClick={(e) => e.preventDefault()}
                      >
                        <p className="text-sm font-medium mb-2">
                          Cart Items: {cartCount}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Click to view your cart
                        </p>
                        <Button size="sm" className="w-full" asChild>
                          <Link href="/cart">Go to Cart</Link>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <ModeToggle />
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              className="md:hidden py-2 border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden py-4 border-t"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.icon && (
                          <span className="text-primary">{link.icon}</span>
                        )}
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 text-primary" />
                    Wishlist
                    {wishlist.length > 0 && (
                      <Badge variant="default" className="ml-auto bg-red-500">
                        {wishlist.length}
                      </Badge>
                    )}
                  </Link>

                  <Link
                    href="/cart"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Cart
                    {cartCount > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories Bar with theme effects - NOW LINKED */}
        <motion.div
          className="hidden lg:block border-t bg-muted/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        ></motion.div>
      </motion.nav>

      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-16 left-0 w-full pointer-events-none z-40"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  resolvedTheme === "dark" ? "bg-cyan-400" : "bg-purple-400"
                }`}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                  y: [0, 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  filter: `blur(${resolvedTheme === "dark" ? "2px" : "1px"})`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
