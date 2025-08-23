"use client"

import { motion } from "framer-motion"
import { Suspense, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Code, Zap, Globe, Cpu, Loader2, Search, TrendingUp, Users, BookOpen } from "lucide-react"
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
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsClient(true)
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
      views: "2.4k",
      featured: true,
    },
    {
      id: 2,
      title: "Next.js 15: What's New and Exciting",
      excerpt:
        "A comprehensive look at the latest features and improvements in Next.js 15 that every developer should know.",
      image: "/nextjs-tech-background.png",
      tags: ["Next.js", "React", "JavaScript"],
      readTime: "6 min read",
      views: "1.8k",
    },
    {
      id: 3,
      title: "Building Scalable APIs with Edge Computing",
      excerpt:
        "Learn how edge computing is transforming API development and deployment strategies for modern applications.",
      image: "/edge-computing-network.png",
      tags: ["Edge Computing", "APIs", "Performance"],
      readTime: "10 min read",
      views: "3.1k",
    },
  ]

  const stats = [
    { icon: BookOpen, label: "Articles", value: "150+" },
    { icon: Users, label: "Readers", value: "25k+" },
    { icon: TrendingUp, label: "Growth", value: "40%" },
  ]

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-20">
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

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div variants={itemVariants}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              Welcome to the Future of Tech
            </Badge>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight"
            variants={itemVariants}
          >
            Tech Insights
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Discover cutting-edge technology insights, development trends, and innovation stories that shape our digital
            future.
          </motion.p>

          <motion.div className="mb-12 max-w-md mx-auto" variants={itemVariants}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border focus:border-primary transition-colors"
              />
            </div>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" variants={itemVariants}>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/blog">
                Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:bg-muted transition-colors bg-transparent"
            >
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          </motion.div>

          <motion.div className="grid grid-cols-3 gap-8 max-w-md mx-auto" variants={itemVariants}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute top-20 left-10 text-primary"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Code size={32} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-secondary"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Zap size={28} />
        </motion.div>
      </motion.section>

      <motion.section
        className="py-24 px-4 bg-muted/30"
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Post */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full group overflow-hidden">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={featuredPosts[0].image || "/placeholder.svg?height=400&width=800&query=tech blog featured"}
                    alt={featuredPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPosts[0].tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/blog/${featuredPosts[0].id}`}>{featuredPosts[0].title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{featuredPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featuredPosts[0].readTime}</span>
                      <span>{featuredPosts[0].views} views</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
                      <Link href={`/blog/${featuredPosts[0].id}`}>
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Side Posts */}
            <div className="space-y-6">
              {featuredPosts.slice(1).map((post, index) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                    <div className="flex gap-4 p-6">
                      <div className="aspect-square w-24 relative overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={post.image || "/placeholder.svg?height=100&width=100&query=tech blog"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-24 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="text-4xl font-bold text-foreground mb-16" variants={itemVariants}>
            Powered by Modern Technology
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: Globe, name: "Next.js", color: "text-foreground" },
              { icon: Code, name: "React", color: "text-primary" },
              { icon: Zap, name: "Supabase", color: "text-secondary" },
              { icon: Cpu, name: "Three.js", color: "text-accent" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center group cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors mb-4">
                  <tech.icon className={`h-8 w-8 ${tech.color} group-hover:text-primary transition-colors`} />
                </div>
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
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
