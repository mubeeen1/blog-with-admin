"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ArrowLeft, Calendar, TrendingUp, Star, Loader2 } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState(null)
  const [sortBy, setSortBy] = useState("date")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const response = await fetch("/api/blog/posts?status=published&limit=50")
      const data = await response.json()

      if (data.success) {
        setAllPosts(data.posts || [])
      } else {
        console.error("Error loading posts:", data.error)
      }
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get all unique tags
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])))

  // Filter and sort posts
  const filteredPosts = allPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag))
      return matchesSearch && matchesTag
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "views":
          return (b.views || 0) - (a.views || 0)
        case "likes":
          return (b.likes || 0) - (a.likes || 0)
        case "date":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Loading articles...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/40 backdrop-blur-sm bg-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Tech Blog</h1>
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">
            All{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Articles</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore our collection of in-depth articles covering the latest in technology, development, and innovation.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search articles..."
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Tag Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className={
                  selectedTag === null
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                }
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={
                    selectedTag === tag
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  }
                >
                  {tag}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Sort by:</span>
              <Button
                variant={sortBy === "date" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("date")}
                className={
                  sortBy === "date"
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                }
              >
                <Calendar className="w-4 h-4 mr-1" />
                Date
              </Button>
              <Button
                variant={sortBy === "views" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("views")}
                className={
                  sortBy === "views"
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                }
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Views
              </Button>
              <Button
                variant={sortBy === "likes" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("likes")}
                className={
                  sortBy === "likes"
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                }
              >
                <Star className="w-4 h-4 mr-1" />
                Likes
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 border-slate-700/40 hover:border-cyan-500/20 relative bg-slate-800/50"
                >
                  <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-cyan-500 to-blue-600">
                    Featured
                  </Badge>
                  <div className="aspect-video overflow-hidden rounded-t-lg relative">
                    <img
                      src={post.featured_image || "/placeholder.svg?height=200&width=400&query=tech blog featured"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(post.tags || []).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="group-hover:text-cyan-400 transition-colors text-white">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-slate-400">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" alt="Author" />
                        <AvatarFallback className="bg-slate-700 text-slate-300">TA</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Tech Admin</p>
                        <div className="flex items-center text-xs text-slate-500 space-x-2">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {(post.views || 0).toLocaleString()} views
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {post.likes || 0} likes
                        </span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-white">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 border-slate-700/40 hover:border-cyan-500/20 bg-slate-800/50"
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.featured_image || "/placeholder.svg?height=200&width=400&query=tech blog article"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(post.tags || []).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="group-hover:text-cyan-400 transition-colors text-white">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-slate-400">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" alt="Author" />
                        <AvatarFallback className="bg-slate-700 text-slate-300">TA</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Tech Admin</p>
                        <div className="flex items-center text-xs text-slate-500 space-x-2">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {(post.views || 0).toLocaleString()} views
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {post.likes || 0} likes
                        </span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No articles found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => {
                setSearchTerm("")
                setSelectedTag(null)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
