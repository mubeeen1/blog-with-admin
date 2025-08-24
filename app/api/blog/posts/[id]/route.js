import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose/client"
import { BlogPost, AdminUser } from "@/lib/mongoose/models"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    const post = await BlogPost.findById(id).populate('author_id', 'username').lean()

    if (!post) {
      return NextResponse.json({ error: "Post not found", success: false }, { status: 404 })
    }

    // Increment view count
    post.views += 1
    await post.save()

    return NextResponse.json({ post, success: true })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = params

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

    const post = await BlogPost.findByIdAndUpdate(id, {
      title,
      content,
      excerpt,
      slug,
      featured_image,
      status,
      featured,
      tags,
      updated_at: new Date().toISOString(),
    }, { new: true })

    if (!post) {
      return NextResponse.json({ error: "Post not found", success: false }, { status: 404 })
    }

    return NextResponse.json({ post, success: true })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    // TODO: Implement proper authentication
    // For now, we'll use a placeholder for admin user ID
    // You'll need to integrate with your authentication system
    const adminUserId = "placeholder-admin-id" // Replace with actual auth user ID

    // Check if user is admin
    const adminUser = await AdminUser.findOne({ auth_user_id: adminUserId })
    if (!adminUser) {
      return NextResponse.json({ error: "Admin access required", success: false }, { status: 403 })
    }

    const post = await BlogPost.findByIdAndDelete(id)

    if (!post) {
      return NextResponse.json({ error: "Post not found", success: false }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: error.message, success: false }, { status: 500 })
  }
}
