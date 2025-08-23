"use client"

import { motion } from "framer-motion"
import { Suspense, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Zap, Globe, Cpu, Loader2 } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("@/components/3d-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
    </div>
  ),
})

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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
    },
    {
      id: 2,
      title: "Next.js 15: What's New and Exciting",
      excerpt:
        "A comprehensive look at the latest features and improvements in Next.js 15 that every developer should know.",
      image: "/nextjs-tech-background.png",
      tags: ["Next.js", "React", "JavaScript"],
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Building Scalable APIs with Edge Computing",
      excerpt:
        "Learn how edge computing is transforming API development and deployment strategies for modern applications.",
      image: "/edge-computing-network.png",
      tags: ["Edge Computing", "APIs", "Performance"],
      readTime: "10 min read",
    },
  ]

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
              </div>
            }
          >
            <Scene3D />
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Welcome to the Future</Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Tech Insights
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed" variants={itemVariants}>
            Exploring the cutting edge of technology, development, and innovation. Join us on a journey through the
            digital frontier.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Link href="/blog">
                Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-cyan-400"
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
          className="absolute bottom-20 right-10 text-purple-400"
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

      {/* Featured Posts Section */}
      <motion.section
        className="py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-white mb-4">Featured Articles</h2>
            <p className="text-slate-400 text-lg">Dive into our latest insights and discoveries</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image || "/placeholder.svg?height=200&width=400&query=tech blog featured"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-white hover:text-cyan-400 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{post.readTime}</span>
                      <Button variant="ghost" size="sm" asChild className="text-cyan-400 hover:text-cyan-300">
                        <Link href={`/blog/${post.id}`}>
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
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

      {/* Tech Stack Section */}
      <motion.section
        className="py-20 px-4 bg-slate-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="text-3xl font-bold text-white mb-12" variants={itemVariants}>
            Powered by Modern Technology
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Globe, name: "Next.js", color: "text-white" },
              { icon: Code, name: "React", color: "text-cyan-400" },
              { icon: Zap, name: "Supabase", color: "text-green-400" },
              { icon: Cpu, name: "Three.js", color: "text-purple-400" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <tech.icon className={`h-12 w-12 mb-3 ${tech.color}`} />
                <span className="text-slate-300 font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
