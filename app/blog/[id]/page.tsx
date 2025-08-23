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
  Share2,
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
import { mockPosts, type BlogPost } from "@/lib/mock-data"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Find the post by ID
    const foundPost = mockPosts.find((p) => p.id === Number.parseInt(params.id))
    setPost(foundPost || null)

    // Get related posts (posts with similar tags)
    if (foundPost) {
      const related = mockPosts
        .filter((p) => p.id !== foundPost.id && p.published)
        .filter((p) => p.tags.some((tag) => foundPost.tags.includes(tag)))
        .slice(0, 3)
      setRelatedPosts(related)
    }
  }, [params.id])

  const handleShare = async (platform: string) => {
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

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
            <Link href="/" className="text-lg font-semibold">
              TechBlog
            </Link>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-blue-500" : ""}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          {post.featured && (
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600">Featured Article</Badge>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>

          {/* Article Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" alt={post.author} />
                <AvatarFallback>
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author}</p>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="aspect-video overflow-hidden rounded-xl mb-8">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Mock additional content for demo */}
          <div className="space-y-6 mt-8">
            <h2>The Future is Here</h2>
            <p>
              As we continue to push the boundaries of what's possible with modern web technologies, it's important to
              stay ahead of the curve. The integration of AI, 3D graphics, and advanced user interfaces is creating
              unprecedented opportunities for developers and users alike.
            </p>

            <h3>Key Takeaways</h3>
            <ul>
              <li>Modern web development is evolving rapidly with new technologies</li>
              <li>AI integration is becoming essential for competitive applications</li>
              <li>3D web experiences are no longer just for games</li>
              <li>Performance optimization remains crucial for user experience</li>
            </ul>

            <blockquote>"The best way to predict the future is to invent it." - Alan Kay</blockquote>

            <p>
              Whether you're building the next big SaaS platform or creating immersive web experiences, the tools and
              techniques we've discussed here will help you create something truly remarkable.
            </p>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Comments Section Placeholder */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Comments</h3>
          <Card className="border-border/40">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Comments Coming Soon</h4>
              <p className="text-muted-foreground">
                We're working on adding a comment system to foster discussions around our articles.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group hover:shadow-lg transition-all duration-300 border-border/40 hover:border-blue-500/20"
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="group-hover:text-blue-500 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{relatedPost.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{relatedPost.readTime}</span>
                      <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blog/${relatedPost.id}`}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
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
