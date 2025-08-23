"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  FileText,
  TrendingUp,
  LogOut,
  Type,
  Loader2,
  Users,
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalFonts: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Load posts and stats in parallel
      const [postsResponse, statsResponse] = await Promise.all([
        fetch("/api/blog/posts?status=all&limit=50"),
        fetch("/api/admin/stats"),
      ])

      const postsData = await postsResponse.json()
      const statsData = await statsResponse.json()

      if (postsData.success) {
        setPosts(postsData.posts || [])
      }

      if (statsData.success) {
        setStats(statsData.stats)
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter posts based on search and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && post.status === "published") ||
      (filterStatus === "draft" && post.status === "draft")
    return matchesSearch && matchesStatus
  })

  const handleDeletePost = async (postId) => {
    setIsDeleting(postId)
    try {
      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setPosts(posts.filter((post) => post.id !== postId))
        // Update stats
        setStats((prev) => ({
          ...prev,
          totalPosts: prev.totalPosts - 1,
          publishedPosts: prev.publishedPosts - (posts.find((p) => p.id === postId)?.status === "published" ? 1 : 0),
          draftPosts: prev.draftPosts - (posts.find((p) => p.id === postId)?.status === "draft" ? 1 : 0),
        }))
      } else {
        alert("Error deleting post: " + data.error)
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Error deleting post")
    } finally {
      setIsDeleting(null)
    }
  }

  const togglePublishStatus = async (postId) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const newStatus = post.status === "published" ? "draft" : "published"

    try {
      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          status: newStatus,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setPosts(posts.map((p) => (p.id === postId ? { ...p, status: newStatus } : p)))
        // Update stats
        setStats((prev) => ({
          ...prev,
          publishedPosts: prev.publishedPosts + (newStatus === "published" ? 1 : -1),
          draftPosts: prev.draftPosts + (newStatus === "draft" ? 1 : -1),
        }))
      } else {
        alert("Error updating post: " + data.error)
      }
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Error updating post")
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Admin Navigation */}
      <nav className="border-b border-slate-700/40 backdrop-blur-sm bg-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-lg font-semibold text-white">
                TechBlog Admin
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link href="/admin/dashboard" className="text-cyan-400 font-medium">
                  Dashboard
                </Link>
                <Link href="/admin/posts/new" className="text-slate-400 hover:text-white transition-colors">
                  New Post
                </Link>
                <Link href="/admin/fonts" className="text-slate-400 hover:text-white transition-colors">
                  Fonts
                </Link>
                <Link href="/admin/users" className="text-slate-400 hover:text-white transition-colors">
                  Users
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" target="_blank">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Dashboard</h1>
          <p className="text-slate-400">Manage your tech blog content and settings</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/posts/new">
            <Card className="border-slate-700/40 hover:border-cyan-500/20 transition-colors cursor-pointer bg-slate-800/50">
              <CardContent className="p-6 text-center">
                <PlusCircle className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                <p className="font-medium text-white">New Post</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/fonts">
            <Card className="border-slate-700/40 hover:border-purple-500/20 transition-colors cursor-pointer bg-slate-800/50">
              <CardContent className="p-6 text-center">
                <Type className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="font-medium text-white">Manage Fonts</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="border-slate-700/40 hover:border-amber-500/20 transition-colors cursor-pointer bg-slate-800/50">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="font-medium text-white">Manage Users</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blog" target="_blank">
            <Card className="border-slate-700/40 hover:border-green-500/20 transition-colors cursor-pointer bg-slate-800/50">
              <CardContent className="p-6 text-center">
                <Eye className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-white">View Site</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-700/40 bg-slate-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalPosts}</div>
              <p className="text-xs text-slate-500">All blog posts</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700/40 bg-slate-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Published</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.publishedPosts}</div>
              <p className="text-xs text-slate-500">Live on site</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700/40 bg-slate-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{stats.draftPosts}</div>
              <p className="text-xs text-slate-500">Work in progress</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700/40 bg-slate-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-500">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-slate-500">All time views</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts Management */}
        <Card className="border-slate-700/40 bg-slate-800/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-white">Blog Posts</CardTitle>
                <CardDescription className="text-slate-400">Manage your blog content</CardDescription>
              </div>
              <Link href="/admin/posts/new">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className={
                    filterStatus === "all"
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  }
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "published" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("published")}
                  className={
                    filterStatus === "published"
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  }
                >
                  Published
                </Button>
                <Button
                  variant={filterStatus === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("draft")}
                  className={
                    filterStatus === "draft"
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  }
                >
                  Drafts
                </Button>
              </div>
            </div>

            {/* Posts Table */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-slate-700/40 rounded-lg hover:bg-slate-700/20 transition-colors"
                >
                  <div className="flex-1 space-y-2 sm:space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-white">{post.title}</h3>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.views || 0} views</span>
                      <span>•</span>
                      <span>{post.likes || 0} likes</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublishStatus(post.id)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      {post.status === "published" ? "Unpublish" : "Publish"}
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.id}`} className="text-slate-300 hover:text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            View Post
                          </Link>
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-slate-800 border-slate-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Post</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-300">
                                Are you sure you want to delete "{post.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePost(post.id)}
                                disabled={isDeleting === post.id}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                {isDeleting === post.id ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                  </>
                                ) : (
                                  "Delete"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">No posts found</h3>
                  <p className="text-slate-400 mb-4">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "Get started by creating your first blog post."}
                  </p>
                  {!searchTerm && filterStatus === "all" && (
                    <Link href="/admin/posts/new">
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create First Post
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
