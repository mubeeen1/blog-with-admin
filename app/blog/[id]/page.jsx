"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"

export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPost()
  }, [params.id])

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setPost(data.post)

        // Load related posts
        const relatedResponse = await fetch(`/api/blog/posts?limit=3&exclude=${params.id}`)
        const relatedData = await relatedResponse.json()

        if (relatedData.success) {
          setRelatedPosts(relatedData.posts || [])
        }
      }
    } catch (error) {
      console.error("Error loading post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async (platform) => {
    const url = window.location.href
    const title = post?.title || ""

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error("Failed to copy URL")
        }
        break
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/40 backdrop-blur-sm bg-slate-800/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
            <Link href="/" className="text-lg font-semibold text-white">
              TechBlog
            </Link>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : "text-slate-400 hover:text-white"}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-blue-500" : "text-slate-400 hover:text-white"}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          {post.featured && <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-blue-600">Featured Article</Badge>}

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-white">{post.title}</h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-8">{post.excerpt}</p>

          {/* Article Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" alt="Tech Admin" />
                <AvatarFallback className="bg-slate-700 text-slate-300">TA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">Tech Admin</p>
                <div className="flex items-center text-sm text-slate-400 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.ceil(post.content?.length / 1000) || 5} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400 mr-2">Share:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("facebook")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("linkedin")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("copy")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(post.tags || []).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="aspect-video overflow-hidden rounded-xl mb-8">
              <img
                src={post.featured_image || "/placeholder.svg?height=400&width=800&query=tech blog article"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12 text-slate-300">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <Separator className="my-12 bg-slate-700" />

        {/* Comments Section Placeholder */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-white">Comments</h3>
          <Card className="border-slate-700/40 bg-slate-800/50">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2 text-white">Comments Coming Soon</h4>
              <p className="text-slate-400">
                We're working on adding a comment system to foster discussions around our articles.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-6 text-white">Related Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group hover:shadow-lg transition-all duration-300 border-slate-700/40 hover:border-cyan-500/20 bg-slate-800/50"
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={
                        relatedPost.featured_image || "/placeholder.svg?height=200&width=400&query=tech blog related"
                      }
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(relatedPost.tags || []).slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="group-hover:text-cyan-400 transition-colors line-clamp-2 text-white">
                      {relatedPost.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-slate-400">{relatedPost.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                      <span>{Math.ceil(relatedPost.content?.length / 1000) || 5} min read</span>
                      <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blog/${relatedPost.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
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
      </article>
    </div>
  )
}
