"use client"

import { motion } from "framer-motion"
import { Suspense, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Zap, Globe, Cpu, Loader2, Sparkles, Rocket, Brain } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("@/components/3d-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
})

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsClient(true)

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications.",
      image: "/futuristic-ai-coding-interface.png",
      tags: ["AI", "Web Development", "Future Tech"],
      readTime: "8 min read",
      gradient: "from-primary to-secondary",
    },
    {
      id: 2,
      title: "Next.js 15: What's New and Exciting",
      excerpt:
        "A comprehensive look at the latest features and improvements in Next.js 15 that every developer should know.",
      image: "/nextjs-tech-background.png",
      tags: ["Next.js", "React", "JavaScript"],
      readTime: "6 min read",
      gradient: "from-secondary to-primary",
    },
    {
      id: 3,
      title: "Building Scalable APIs with Edge Computing",
      excerpt:
        "Learn how edge computing is transforming API development and deployment strategies for modern applications.",
      image: "/edge-computing-network.png",
      tags: ["Edge Computing", "APIs", "Performance"],
      readTime: "10 min read",
      gradient: "from-primary via-secondary to-primary",
    },
  ]

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 opacity-40">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            }
          >
            <Scene3D />
          </Suspense>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: mousePosition.x * (i % 2 === 0 ? 50 : -50),
                y: mousePosition.y * (i % 2 === 0 ? 30 : -30),
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div variants={itemVariants}>
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-lg px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to the Future
            </Badge>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Tech Insights
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Exploring the cutting edge of technology, development, and innovation. Join us on a journey through the
            digital frontier where ideas become reality.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={itemVariants}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-8 py-6"
            >
              <Link href="/blog">
                <Rocket className="mr-2 h-5 w-5" />
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6 bg-transparent"
            >
              <Link href="/admin">
                <Brain className="mr-2 h-5 w-5" />
                Admin Dashboard
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute top-20 left-10 text-primary"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Code size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-secondary"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Zap size={36} />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-20 text-primary/60"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={28} />
        </motion.div>
      </motion.section>

      {/* Featured Posts Section */}
      <motion.section
        className="py-24 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <h2 className="text-5xl font-bold text-foreground mb-6">Featured Articles</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Dive into our latest insights and discoveries in the world of technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full group overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg?height=200&width=400&query=tech blog featured"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="bg-primary/20 text-primary border-primary/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-card-foreground group-hover:text-primary transition-colors text-xl">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                      >
                        <Link href={`/blog/${post.id}`}>
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-24 px-4 bg-muted/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 className="text-4xl font-bold text-foreground mb-16" variants={itemVariants}>
            Powered by Modern Technology
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: Globe, name: "Next.js", color: "text-foreground" },
              { icon: Code, name: "React", color: "text-primary" },
              { icon: Zap, name: "Supabase", color: "text-secondary" },
              { icon: Cpu, name: "Three.js", color: "text-primary" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center group cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 rounded-full bg-card border border-border group-hover:border-primary/50 transition-all duration-300 mb-4">
                  <tech.icon
                    className={`h-12 w-12 ${tech.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <span className="text-card-foreground font-semibold text-lg group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
