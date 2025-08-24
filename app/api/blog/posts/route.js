import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose/client"
import { BlogPost, AdminUser } from "@/lib/mongoose/models"

export async function GET(request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "published"
    const featured = searchParams.get("featured")
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const page = Number.parseInt(searchParams.get("page")) || 1
    const skip = (page - 1) * limit

    let query = { status }

    if (featured === "true") {
      query.featured = true
    }

    const posts = await BlogPost.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author_id', 'username')
      .lean()

    const total = await BlogPost.countDocuments(query)

    return NextResponse.json({ 
      posts, 
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      success: true 
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    
    // TODO: Implement proper authentication
    // For now, we'll use a placeholder for admin user ID
    // You'll need to integrate with your authentication system
    const adminUserId = "placeholder-admin-id" // Replace with actual auth user ID

    // Check if user is admin
    const adminUser = await AdminUser.findOne({ auth_user_id: adminUserId })
    if (!adminUser) {
      return NextResponse.json({ error: "Admin access required", success: false }, { status: 403 })
    }

    const body = await request.json()
    const { title, content, excerpt, slug, featured_image, status, featured, tags } = body

    // Create slug from title if not provided
    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug: finalSlug })
    if (existingPost) {
      return NextResponse.json({ error: "Slug already exists", success: false }, { status: 400 })
    }

    const post = new BlogPost({
      title,
      content,
      excerpt,
      slug: finalSlug,
      featured_image,
      status: status || "draft",
      featured: featured || false,
      tags: tags || [],
      author_id: adminUser._id // Use the MongoDB ObjectId
    })

    const savedPost = await post.save()
    await savedPost.populate('author_id', 'username')

    return NextResponse.json({ post: savedPost, success: true }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
